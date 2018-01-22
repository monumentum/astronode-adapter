const EngineAdapter = require('./engine');

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

    it('should "setServices" perfectly', () => {
        const fakeService = 'FAKE_SERVICE';

        adapter.setServices(fakeService);
        expect(adapter).toHaveProperty('_service', fakeService);
    });
});