const { initBackup } = require("./src/init");
const { backupData } = require("./src/backupManager");
const { restoreData } = require("./src/restore/restoreManager");

module.exports = {
  initBackup,
  backupData,
  restoreData,
};
