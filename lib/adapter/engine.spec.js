jest.mock('../interpreter');
jest.mock('../util');

const EngineAdapter = require('./engine');

const { getController, getMiddleware } = require.requireMock('../interpreter');
const { promisedController } = require.requireMock('../util');
const { NeedImplementation } = require('../error');

describe('Engine Adapter', () => {
    let adapter;

    beforeEach(() => {
        adapter = new EngineAdapter();
    });

    it('should "setRoutes" perfectly', () => {
        const fakePath = 'FAKE_PATH';
        const fakeConfig = 'FAKE_CONFIG';
        const fakeRoutes = { [fakePath]: fakeConfig };

        adapter._setRoute = jest.fn();
        adapter.setRoutes(fakeRoutes);

        expect(adapter._setRoute).toHaveBeenCalledWith(fakePath, fakeConfig);
    });

    it('should throw an NeedImplementation to .start method', () => {
        const throwFn = () => adapter.start();
        expect(throwFn).toThrow(NeedImplementation);
    });

    it('should throw an NeedImplementation to .createRoute method', () => {
        const throwFn = () => adapter.createRoute();
        expect(throwFn).toThrow(NeedImplementation);
    });

    it('should interate routes without errors', () => {
        const fakeCtrl = 'CONTROLLER';
        const fakeMiddle = 'MIDDLE';
        const fakeEntryMiddle = 'ENTRY_MIDDLE';
        const fakePath = '/fake';
        const fakeInnerPath = '/path';
        const totalFakePath = fakePath + fakeInnerPath;
        const fakeConfig = {};
        const fakeEndpoints = {
            'get': {
                'call': 'test.zom',
                'middlewares': [ fakeEntryMiddle ]
            },
            'post': 'my.test'
        };

        getController.mockReturnValue(fakeCtrl);
        getMiddleware.mockReturnValue(fakeMiddle);
        promisedController.mockReturnValue(fakeCtrl);

        adapter.createRoute = jest.fn();
        adapter._interateRoutes(fakePath, fakeConfig, fakeEndpoints, fakeInnerPath);

        const expectedCalls = [
            [totalFakePath, 'get', [fakeMiddle], fakeCtrl],
            [totalFakePath, 'post', [], fakeCtrl],
        ];

        expect(getMiddleware).toHaveBeenCalledTimes(1);
        expect(getController).toHaveBeenCalledTimes(2);
        expect(getController.mock.calls[1][0]).toEqual(fakeEndpoints["post"])
        expect(adapter.createRoute).toHaveBeenCalledTimes(2);
        expect(adapter.createRoute.mock.calls).toEqual(expectedCalls);
        expect(promisedController).toHaveBeenCalledWith(fakeCtrl);
    });

    describe('<scoped test> _setRoute', () => {
        let expectedRootMap;
        const fakeMiddle = 'mdlwr';
        const callMethod = 'testzom';
        const fakePath = '/start';

        const fakeConfig = {
            defaultApi: {
                model: 'test',
                middlewares: {
                    '/': {
                        'get': [fakeMiddle]
                    }
                }
            },
            routes: {
                '/test': {
                    'get': {
                        'call': callMethod,
                        'middlewares': []
                    },
                    'post': 'shazan'
                }
            }
        };

        const checkCall = exp => exp.forEach((val, index) => {
            let param = adapter._interateRoutes.mock.calls[0][index];
            expect(val).toEqual(param);
        });

        beforeEach(() => {
            global.astronode = { config: { data: 'testplugin' }};
            adapter._interateRoutes = jest.fn();

            expectedRootMap = {
                'get': {
                    'call': `!${astronode.config.data}.find:${fakeConfig.defaultApi.model}`,
                    'middlewares': [fakeMiddle]
                },
                'post': {
                    'call': `!${astronode.config.data}.create:${fakeConfig.defaultApi.model}`,
                    'middlewares': [],
                }
            };
        });

        it('should setRoute with full configs', () => {
            adapter._setRoute(fakePath, fakeConfig);
            checkCall([ fakePath, fakeConfig, expectedRootMap, '/']);
        });

        it('should setRoute without middleware in defaultAPI', () => {
            delete fakeConfig.defaultApi.middlewares;
            expectedRootMap.get.middlewares = [];

            adapter._setRoute(fakePath, fakeConfig);
            checkCall([ fakePath, fakeConfig, expectedRootMap, '/']);
        });

        it('should setRoute without defaultAPI', () => {
            const expectedRootMap = fakeConfig.routes['/test'];
            delete fakeConfig.defaultApi.model;

            adapter._setRoute(fakePath, fakeConfig);
            checkCall([ fakePath, fakeConfig, expectedRootMap, '/test']);
        });
    });
});