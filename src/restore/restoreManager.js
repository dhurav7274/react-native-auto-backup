const RNFS = require('react-native-fs');
const AsyncStorage = require('@react-native-async-storage/async-storage');
const { getConfig } = require('../init');
const { downloadFromGoogleDrive } = require('../cloud/googleDriveAdapter');
const { decryptData } = require('../../utils/encrypt');

async function restoreData({ fileId } = {}) {
  const config = getConfig();
  if (config.provider !== 'google') throw new Error('provider not supported in example');

  const destPath = `${RNFS.DocumentDirectoryPath}/${config.appName}-restore.json`;
  await downloadFromGoogleDrive({
    accessToken: config.providerConfig.accessToken,
    fileId,
    destPath,
  });

  let content = await RNFS.readFile(destPath, 'utf8');
  if (config.encryptKey) content = await decryptData(content, config.encryptKey);
  const parsed = JSON.parse(content);

  // Restore async storage
  const entries = Object.entries(parsed.data || {});
  await AsyncStorage.multiSet(entries);
  return true;
}

module.exports = { restoreData };
