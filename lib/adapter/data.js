const DataMethods = require('./methods');

const allowedMethods = ['find', 'findById', 'create', 'update', 'delete'];

class DataAdapter {
    constructor(Methods = DataMethods) {
        this.methods = {};
        this._Methods = Methods;
    }

    autoinitialize({ models }) {
        const methods = new this._Methods();

        allowedMethods.forEach(method => {
            this.methods[method] = modelName => {
                const model = models[modelName];
                return methods[method](model);
            };
        });
    }
}

module.exports = DataAdapter;