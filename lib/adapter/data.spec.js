const DataAdapter = require('./data');
const { NeedImplementation } = require('astronode-utils/lib/error');

class TestMethods {
    find(model) {
        return model;
    }
}

describe('Data Methods', () => {
    let adapter;

    beforeEach(() => {
        adapter = new DataAdapter(TestMethods);
        expect(adapter).toHaveProperty('methods');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should proxy a method', () => {
        const key = 'test';
        const value = 'zoom';

        global.astronode = { models: { [key]: value } };
        expect(adapter.methods.find(key)).toBe(value);
    });

    it('should exec default methods implementation', () => {
        adapter = new DataAdapter();
        const throwFn = adapter.methods.find('');
        expect(throwFn).toThrow(NeedImplementation);
    });
});