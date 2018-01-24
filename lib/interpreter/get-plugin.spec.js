const getPlugin = require('./get-plugin');
const { MissingParameter, NeedImplementation } = require('astronode-utils/lib/error');

const simpleFunction = x => {
    return x;
};

const closureFunction = x => y => {
    return parseInt(x) + y;
};

describe('Get Plugin', () => {
    const name = 'testing';
    const valueX = 1;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get correct plugin', () => {
        const bucket = { [name]: simpleFunction };
        const fn = getPlugin(name, bucket);

        expect(fn(valueX)).toBe(valueX);
    });

    it('should get correct plugin with nested method', () => {
        const method = 'find';
        const bucket = { [name]: { [method]: simpleFunction } };
        const fn = getPlugin(`${name}.${method}`, bucket);

        expect(fn(valueX)).toBe(valueX);
    });

    it('should throw an error if didnt found nested method', () => {
        const method = 'find';
        const bucket = { [name]: { } };
        const throwFn = () =>  getPlugin(`${name}.${method}`, bucket);

        expect(throwFn).toThrow(NeedImplementation);
    });

    it('should get correct closure plugin', () => {
        const valueY = 2;
        const bucket = { [name]: closureFunction };
        const fn = getPlugin(`${name}:${valueX}`, bucket);

        expect(fn(valueY)).toBe(closureFunction(valueX)(valueY));
    });

    it('should get plugin from global astronode plugins', () => {
        global.astronode = { plugins: { [name]: simpleFunction }};
        const fn = getPlugin(`!${name}`);

        expect(fn(valueX)).toBe(valueX);
    });

    it('should throw an error when bucket didnt exist', () => {
        const throwFn = () => getPlugin(name);
        expect(throwFn).toThrow(MissingParameter);
    });
});