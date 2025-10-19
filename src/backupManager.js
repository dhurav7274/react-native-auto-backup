const backupAsyncStorage = require('./backup/asyncStorageBackup');
const { getConfig } = require('./init');
const { uploadToGoogleDrive } = require('./cloud/googleDriveAdapter');

async function backupData(options = { asyncStorage: true }) {
  const config = getConfig();
  const localFiles = [];

  if (options.asyncStorage) {
    const f = await backupAsyncStorage();
    localFiles.push(f);
  }
  // TODO: add sqlite/realm handlers

  // Upload files based on provider
  if (config.provider === 'google') {
    // consumer must supply accessToken in providerConfig
    const accessToken = config.providerConfig.accessToken;
    if (!accessToken) throw new Error('Google access token required in providerConfig.accessToken');

    const uploads = [];
    for (const path of localFiles) {
      const fileName = `${config.appName}-backup-${Date.now()}.json`;
      uploads.push(uploadToGoogleDrive({ accessToken, localFilePath: path, fileName }));
    }
    return Promise.all(uploads);
  }

  // add dropbox, etc.
}

module.exports = { backupData };
