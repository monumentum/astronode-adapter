jest.mock('../interpreter');

const EngineAdapter = require('./engine');
const interpreter = require.requireMock('../interpreter');

const { NeedImplementation, MissingParameter } = require('../error');

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
                "call": "test.zom",
                "middlewares": [ fakeEntryMiddle ]
            },
            "post": 'my.test'
        };

        interpreter.getController.mockReturnValue(fakeCtrl);
        interpreter.getMiddleware.mockReturnValue(fakeMiddle);

        adapter.createRoute = jest.fn();
        adapter._interateRoutes(fakePath, fakeConfig, fakeEndpoints, fakeInnerPath);

        const expectedCalls = [
            [totalFakePath, 'get', [fakeMiddle], fakeCtrl],
            [totalFakePath, 'post', [], fakeCtrl],
        ]

        expect(interpreter.getMiddleware).toHaveBeenCalledTimes(1);
        expect(interpreter.getController).toHaveBeenCalledTimes(2);
        expect(adapter.createRoute).toHaveBeenCalledTimes(2);
        expect(adapter.createRoute.mock.calls).toEqual(expectedCalls);
    });

    describe('<scoped test> _setRoute', () => {
        const fakeMiddle = "mdlwr";
        const callMethod = "testzom";
        const fakePath = "/start";

        const fakeConfig = {
            defaultApi: {
                model: "test",
                middlewares: {
                    "/": {
                        "get": [fakeMiddle]
                    }
                }
            },
            routes: {
                "/test": {
                    "get": {
                        "call": callMethod,
                        "middlewares": []
                    },
                    "post": "shazan"
                }
            }
        };

        const checkCall = exp => exp.forEach((val, index) => {
            let param = adapter._interateRoutes.mock.calls[0][index];
            expect(val).toEqual(param);
        });

        beforeEach(() => {
            global.astronode = { data: 'testplugin' };
            adapter._interateRoutes = jest.fn();
        });

        it('should setRoute with full configs', () => {
            const expectedRootMap = {
                "get": {
                    "call": `!${astronode.data}.find:${fakeConfig.defaultApi.model}`,
                    "middlewares": [fakeMiddle]
                },
                "post": {
                    "call": `!${astronode.data}.create:${fakeConfig.defaultApi.model}`,
                    "middlewares": [],
                }
            };

            adapter._setRoute(fakePath, fakeConfig);
            checkCall([ fakePath, fakeConfig, expectedRootMap, "/"]);
        });

        it('should setRoute without middleware in defaultAPI', () => {
            const expectedRootMap = {"get": "find", "post": "create"};
            delete fakeConfig.defaultApi.middlewares;

            adapter._setRoute(fakePath, fakeConfig);
            checkCall([ fakePath, fakeConfig, expectedRootMap, "/"]);
        });

        it('should setRoute without defaultAPI', () => {
            const expectedRootMap = fakeConfig.routes['/test'];
            delete fakeConfig.defaultApi.model;

            adapter._setRoute(fakePath, fakeConfig);
            checkCall([ fakePath, fakeConfig, expectedRootMap, "/test"]);
        });
    });
});