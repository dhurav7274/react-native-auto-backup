const AsyncStorage = require('@react-native-async-storage/async-storage');
const RNFS = require('react-native-fs');
const { getConfig } = require('../init');
const { encryptData } = require('../../utils/encrypt');

async function backupAsyncStorage() {
  const keys = await AsyncStorage.getAllKeys();
  const kv = await AsyncStorage.multiGet(keys);
  // multiGet returns [[key, value], ...]
  const dataObj = {};
  kv.forEach(([k, v]) => { dataObj[k] = v; });

  const json = JSON.stringify({
    meta: { createdAt: new Date().toISOString() },
    data: dataObj,
  });

  const config = getConfig();
  const finalData = config.encryptKey ? await encryptData(json, config.encryptKey) : json;

  const filePath = `${RNFS.DocumentDirectoryPath}/${config.appName || 'app'}-backup.json`;
  await RNFS.writeFile(filePath, finalData, 'utf8');
  return filePath;
}

module.exports = backupAsyncStorage;
