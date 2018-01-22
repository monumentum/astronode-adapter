const DataMethods = require('./methods');
const { NeedImplementation } = require('../error');

describe('Data Methods', () => {
    let methods;
    const allowedMethods = ['find', 'findById', 'create', 'update', 'delete'];

    beforeEach(() => {
        methods = new DataMethods();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    allowedMethods.forEach(method => {
        it(`should throw an exception when exec method ${method}`, () => {
            const throwFn = methods[method]('');
            expect(throwFn).toThrow(NeedImplementation);
        });
    });
});