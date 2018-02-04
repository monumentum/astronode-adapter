const DataAdapter = require('./data');
const { NeedImplementation } = require('astronode-utils/lib/error');

class TestMethods {
    find(model) {
        return model;
    }
}

describe('Data Methods', () => {
    let adapter;
    const key = 'test';
    const value = 'zoom';
    const fakeConfig = { models: { [key]: value } };

    beforeEach(() => {
        adapter = new DataAdapter(TestMethods);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should proxy a method', () => {
        adapter.autoinitialize(fakeConfig);
        expect(adapter.methods.find(key)).toBe(value);
    });

    it('should exec default methods implementation', () => {
        adapter = new DataAdapter();
        adapter.autoinitialize(fakeConfig);

        const throwFn = adapter.methods.find('');
        expect(throwFn).toThrow(NeedImplementation);
    });
});