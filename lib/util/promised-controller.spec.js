const promisedController = require('./promised-controller');

describe('Promised Controller', () => {
    let resMock;
    const fakeResp = 'FAKE';

    beforeEach(() => {
        resMock = {};
        resMock.json = jest.fn();
        resMock.status = jest.fn().mockReturnValue({ json: resMock.json });
    });

    it('should response 200', () => {
        const fakePromise = () => Promise.resolve({fakeResp});
        return promisedController(fakePromise)(null, resMock).then(() => {
            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.json).toHaveBeenCalledWith({fakeResp});
        });
    });

    it('should response 500', () => {
        const fakePromise = () => Promise.reject(fakeResp);
        return promisedController(fakePromise)(null, resMock).then(() => {
            expect(resMock.status).toHaveBeenCalledWith(500);
            expect(resMock.json).toHaveBeenCalledWith({error: fakeResp});
        });
    });
});