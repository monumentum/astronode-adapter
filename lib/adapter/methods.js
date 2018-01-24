const { NeedImplementation } = require('astronode-utils/lib/error');

class DataMethods {
    find() {
        return () => {
            throw new NeedImplementation('find');
        };
    }

    findById() {
        return () => {
            throw new NeedImplementation('findById');
        };
    }

    create() {
        return () => {
            throw new NeedImplementation('create');
        };
    }

    update() {
        return () => {
            throw new NeedImplementation('update');
        };
    }

    delete() {
        return () => {
            throw new NeedImplementation('delete');
        };
    }
}

module.exports = DataMethods;