const { get, each, merge, mapValues, cloneDeep } = require('lodash');
const { getController, getMiddleware } = require('../interpreter');
const { promisedController } = require('../util');
const { NeedImplementation } = require('../error');

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

const getDefaultRoutes = defaultApi => {
    if (!defaultApi.model) return {};

    const clone = cloneDeep(DEFAULT_ROUTES);

    return mapValues(clone, (endpoints, path) => {
        return mapValues(endpoints, (serviceName, method) => ({
            call: `!${astronode.config.data}.${serviceName}:${defaultApi.model}`,
            middlewares: get(defaultApi, `middlewares.${path}.${method}`, [])
        }));
    });
};


class EngineAdapter {
    _interateRoutes(path, config, endpoints, innerPath) {
        const totalPath = path + innerPath;

        each(endpoints, (serviceConfig, method) => {
            if (typeof serviceConfig === 'string') {
                serviceConfig = { call: serviceConfig, middlewares: [] };
            }

            const promise = getController(serviceConfig.call);
            const middlewares = serviceConfig.middlewares.map(getMiddleware);

            this.createRoute(totalPath, method, middlewares, promisedController(promise));
        });
    }

    _setRoute(path, config) {
        const defaultRoutes = getDefaultRoutes(config.defaultApi);
        const routes = merge(defaultRoutes, get(config, 'routes', {}));
        each(routes, (endpoints, innerPath) => this._interateRoutes(
            path, config, endpoints, innerPath
        ));
    }

    createRoute() {
        throw new NeedImplementation('createRoute');
    }

    start() {
        throw new NeedImplementation('start');
    }

    setRoutes(routes) {
        each(routes, (config, path) => this._setRoute(path, config));
    }
}

module.exports = EngineAdapter;