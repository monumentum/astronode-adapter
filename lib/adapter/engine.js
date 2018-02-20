const { each } = require('lodash');
const { promisedController } = require('astronode-utils/lib/util');
const { NeedImplementation } = require('astronode-utils/lib/error');

class EngineAdapter {
    _interateRoutes(path, endpoints, innerPath) {
        const totalPath = path + innerPath;

        each(endpoints, (serviceConfig, method) => this.createRoute(
            totalPath, method,
            serviceConfig.middlewares,
            promisedController(serviceConfig.call)
        ));
    }

    _setRoute(path, routes) {
        each(routes, (endpoints, innerPath) => this._interateRoutes(
            path, endpoints, innerPath
        ));
    }

    createRoute() {
        throw new NeedImplementation('createRoute');
    }

    start() {
        throw new NeedImplementation('start');
    }

    extract() {
        throw new NeedImplementation('extract');
    }

    setRoutes(routes) {
        each(routes, (config, path) => this._setRoute(path, config));
    }
}

module.exports = EngineAdapter;