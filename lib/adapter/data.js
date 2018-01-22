const DataMethods = require('./methods');

const allowedMethods = ['find', 'findById', 'create', 'update', 'delete'];

class DataAdapter {
    constructor(Methods = DataMethods) {
        this.methods = {};
        const methods = new Methods();

        allowedMethods.forEach(method => {
            this.methods[method] = modelName => {
                const model = astronode.models[modelName];
                return methods[method](model);
            };
        });
    };
}

module.exports = DataAdapter;