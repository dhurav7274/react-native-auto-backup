import React from 'react';
import { Button } from 'react-native';
import { initBackup, backupData, restoreData } from 'react-native-auto-backup';

// during app start
initBackup({
  provider: 'google',
  providerConfig: { accessToken: '<GET_FROM_GOOGLE_SIGNIN>' },
  appName: 'MyCoolApp',
  encryptKey: 'my-secret-key',
});

export default function App() {
  return (
    <>
      <Button title="Backup now" onPress={() => backupData({ asyncStorage: true })} />
      <Button title="Restore" onPress={() => restoreData({ fileId: '<FILE_ID_FROM_DRIVE>' })} />
    </>
  );
}
