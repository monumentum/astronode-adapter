const DataMethods = require('./methods');
const { NeedImplementation } = require('astronode-utils/lib/error');

describe('Data Methods', () => {
    let methods;
    const allowedMethods = ['find', 'findOne', 'findById', 'create', 'update', 'delete'];

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