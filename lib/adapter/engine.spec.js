jest.mock('astronode-utils/lib/util');

const EngineAdapter = require('./engine');

const { promisedController } = require.requireMock('astronode-utils/lib/util');
const { NeedImplementation } = require('astronode-utils/lib/error');

describe('Engine Adapter', () => {
    let adapter;

    beforeEach(() => {
        adapter = new EngineAdapter();
    });

    afterEach(() => {
        jest.clearAllMocks();
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


    it('should throw an NeedImplementation to .extract method', () => {
        const throwFn = () => adapter.extract();
        expect(throwFn).toThrow(NeedImplementation);
    });

    it('should throw an NeedImplementation to .createRoute method', () => {
        const throwFn = () => adapter.createRoute();
        expect(throwFn).toThrow(NeedImplementation);
    });

    it('should interate routes correctly', () => {
        const fakePromise = 'FAKE_PROMISE';
        const fakeMiddle = 'FAKE_MIDL';
        const path = 'foo';
        const innerPath = 'bar';
        const endpoints = {
            'get': {
                call: 'testing',
                middlewares: fakeMiddle
            },
            'post': {
                call: 'barering',
                middlewares: []
            }
        };

        adapter.createRoute = jest.fn();

        adapter._interateRoutes(path, endpoints, innerPath);
        promisedController.mockImplementation(() => fakePromise);

        expect(promisedController).toHaveBeenCalledTimes(2);
        expect(adapter.createRoute).toHaveBeenCalledTimes(2);
    });

    it('should exec _setRoutes without problems', () => {
        const path = 'foo';
        const innerPath = 'bar';
        const enpoints = 'endpoints';
        const routes = {
            [innerPath]: enpoints
        };

        adapter._interateRoutes = jest.fn();
        adapter._setRoute(path, routes);

        expect(adapter._interateRoutes).toHaveBeenCalledWith(path, enpoints, innerPath);
    });
});