const nameParser = require('./name-parser');
const { MissingParameter } = require('../error');

module.exports = (name, bucket) => {
    const config = nameParser(name);

    if (config.isPlugin) {
        bucket = astronode.plugins;
    }

    if (!bucket) {
        throw new MissingParameter('GetPlugin', 'bucket');
    }

    let plugin = bucket[config.name];

    if (config.chain) {
        config.chain.forEach(value => {
            plugin = plugin.apply(null, value);
        });
    }

    return plugin;
}