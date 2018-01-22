const { get, each, has } = require('lodash');
const { setupPlugin, promisedController } = require('../util');

const DEFAULT_ROUTES = {
    '/': {
        'get': 'find',
        'post': 'create',
    },
    '/:id': {
        'get': 'findById',
        'put': 'update',
        'delete': 'delete'
    }
};

const parseMiddleware = name => {
    const config = setupPlugin.getConfig(name);
    const middle = astronode.middlewares[config.name];

    return setupPlugin.invokeFunction(middle, config.chain);
}

class EngineAdapter {
    _interateDefaultRouter(path, config, endpoints, innerPath) {
        const services = this._service(config.defaultApi.model);

        each(endpoints, (serviceName, method) => {
            const pathMiddlewaresNames = get(config.middlewares, `${innerPath}.${method}`, []);
            const routeMiddlewareNames = get(config, 'middlewareAll', []);

            const allMiddlewares = routeMiddlewareNames.concat(pathMiddlewaresNames).map(parseMiddleware);

            const cbConfig = setupPlugin.getConfig(serviceName);
            let promise = get(astronode.controllers, cbConfig.name, services && services[cbConfig.name]);

            if (!promise) {
                throw new Error('@TODO NotAllowedService', serviceName);
            }

            if (cbConfig.chain) {
                promise = setupPlugin.invokeFunction(promise, cbConfig.chain);
            }

            this.createRoute(
                path + innerPath,
                method, allMiddlewares,
                promisedController(promise)
            );
        });
    }

    _setRoute(path, config) {
        if (config.routes) {
            each(config.routes, this._interateDefaultRouter.bind(this, path, config));
        }

        if (has(config, 'defaultApi.model')){
            each(DEFAULT_ROUTES, this._interateDefaultRouter.bind(this, path, config));
        }
    }

    createRoute(config, path) {
        throw new Error('@TODO: NeedImplementation', path);
    }

    start() {
        throw new Error('@TODO: NeedImplementation');
    }

    setRoutes(routes) {
        each(routes, (config, path) => this._setRoute(path, config));
    }

    setServices(service) {
        this._service = service;
    }

}

module.exports = EngineAdapter;