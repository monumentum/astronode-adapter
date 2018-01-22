const { NeedImplementation } = require('../error');

class DataMethods {
    find(model) {
        return () => {
            throw new NeedImplementation('find');
        };
    }

    findById(model) {
        return () => {
            throw new NeedImplementation('findById');
        };
    }

    create(model) {
        return () => {
            throw new NeedImplementation('create');
        };
    }

    update(model) {
        return () => {
            throw new NeedImplementation('update');
        };
    }

    delete(model) {
        return () => {
            throw new NeedImplementation('delete');
        };
    }
}

module.exports = DataMethods;