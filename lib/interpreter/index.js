const getPlugin = require('./get-plugin');

exports.getMiddleware = name =>
    getPlugin(name, astronode.middlewares);

exports.getController = name =>
    getPlugin(name, astronode.controllers);