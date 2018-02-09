const AuthAdapter = require('./auth');

describe('Auth Adapter', () => {
    let adapter;
    const field1 = 'foo';
    const field2 = 'bar';
    const fakeItem = '{}';
    const fieldsToCheck = [field1, field2];
    const modelGetter = jest.fn();
    const tokenActions = {
        create: jest.fn(),
        remove: jest.fn()
    };

    beforeEach(() => {
        const api = { modelGetter, fieldsToCheck };
        adapter = new AuthAdapter({ api, tokenActions });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should init auth adapter correctly', () => {
        const expectedCreation = 'foo';
        const values = { foo: 'foo', bar: 'bar' };
        const query = {
            [field1]: values.foo,
            [field2]: values.bar,
            test: 'not-allowed'
        };

        tokenActions.create.mockReturnValue(Promise.resolve(expectedCreation));
        modelGetter.mockReturnValue(Promise.resolve(fakeItem));

        return adapter.login(query).then(tokens => {
            expect(tokenActions.create).toHaveBeenCalledWith(fakeItem);
            expect(modelGetter).toHaveBeenCalledWith(values);
            expect(tokens).toBe(expectedCreation);
        });
    });

    it('should reject token if password incorrect', () => {
        modelGetter.mockReturnValue(Promise.resolve());

        return adapter.login({}).catch(err => {
            expect(err).toBeInstanceOf(Error);
        });
    });

    it('should logout', () => {
        const fakeId = '1';
        tokenActions.remove.mockReturnValue(fakeId);

        expect(adapter.logout(fakeId)).toBe(fakeId);
        expect(tokenActions.remove).toHaveBeenCalledWith(fakeId);
    });
});