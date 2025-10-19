// src/init.js
let CONFIG = {};

function initBackup(config = {}) {
  // config: { provider, providerConfig, appName, encryptKey, schedule }
  CONFIG = {
    provider: config.provider || 'google',
    providerConfig: config.providerConfig || {},
    appName: config.appName || 'rn-app',
    encryptKey: config.encryptKey || null,
    schedule: config.schedule || null,
    tempPath: config.tempPath || null,
  };
  return CONFIG;
}

function getConfig() {
  return CONFIG;
}

module.exports = { initBackup, getConfig };
