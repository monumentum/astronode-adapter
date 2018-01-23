jest.mock('./get-plugin');

const getPlugin = require.requireMock('./get-plugin');
const interpreter = require('./');

describe('Index File', () => {
    const fakeName = 'SHAZAN BARAI';
    const fakePlugin = 'ÓU GAZ';

    getPlugin.mockReturnValue(fakePlugin);
    global.astronode = {
        middlewares: 'KAUA',
        controllers: 'ABANGA'
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should exec sending .middlewares as bucket', () => {
        const m = interpreter.getMiddleware(fakeName);
        expect(m).toBe(fakePlugin);
        expect(getPlugin).toHaveBeenCalledWith(fakeName, astronode.middlewares);
    });

    it('should exec sending .controllers as bucket', () => {
        const c = interpreter.getController(fakeName);
        expect(c).toBe(fakePlugin);
        expect(getPlugin).toHaveBeenCalledWith(fakeName, astronode.controllers);
    });
});