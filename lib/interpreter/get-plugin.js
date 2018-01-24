const nameParser = require('./name-parser');
const { MissingParameter, NeedImplementation } = require('astronode-utils/lib/error');

const { get } = require('lodash');

module.exports = (name, bucket) => {
    const config = nameParser(name);

    if (config.isPlugin) {
        bucket = astronode.plugins;
    }

    if (!bucket) {
        throw new MissingParameter('GetPlugin', 'bucket');
    }

    let plugin = get(bucket, config.name, null);

    if (!plugin) {
        throw new NeedImplementation(config.name);
    }

    if (config.chain) {
        config.chain.forEach(value => {
            plugin = plugin.apply(null, value);
        });
    }

    return plugin;
};