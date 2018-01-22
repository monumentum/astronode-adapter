jest.mock('./get-plugin');

const getPlugin = require.requireMock('./get-plugin');
const interpreter = require('./');

describe('Index File', () => {
    const fakeName = 'SHAZAN BARAI';

    global.astronode = {
        middlewares: 'KAUA',
        controllers: 'ABANGA'
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should exec sending .middlewares as bucket', () => {
        interpreter.getMiddleware(fakeName);
        expect(getPlugin).toHaveBeenCalledWith(fakeName, astronode.middlewares);
    });

    it('should exec sending .controllers as bucket', () => {
        interpreter.getController(fakeName);
        expect(getPlugin).toHaveBeenCalledWith(fakeName, astronode.controllers);
    });
});