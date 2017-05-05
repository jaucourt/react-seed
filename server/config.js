var yamlConfig = require('node-yaml-config');

module.exports = yamlConfig.load(__dirname + '/../config/config.yml');
