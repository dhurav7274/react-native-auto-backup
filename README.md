# 📦 react-native-auto-backup

A **React Native utility** for **automatic backup & restore** of app data — including **AsyncStorage**, **SQLite**, and **Realm** — directly to **Google Drive** or **Dropbox** ☁️  

📲 Works on both **Android** & **iOS**  
🔐 Supports **encryption**, **background backup**, and **manual restore**

---

## ⚙️ Features

- 🔄 Auto backup & restore of AsyncStorage / SQLite / Realm  
- ☁️ Cloud support — Google Drive & Dropbox  
- 🔐 Client-side encryption (AES-based)  
- 🕒 Background backup scheduler  
- 📁 Metadata storage (app version, device ID, date)  
- 💬 Conflict handling (merge / overwrite)  
- 🎨 Custom UI support for restore screen  

---

## ⚠️ Before Installation

Before installing this library, make sure your React Native environment is properly set up with **React** and **React Native** already installed.

This library depends on these **peer dependencies**:  
`react` and `react-native`

---

## 📦 Installation

```bash
# Core libraries (if not installed)
npm install react react-native

```bash
# Then install this library
npm install react-native-auto-backup

```bash
# or using yarn
yarn add react-native-auto-backup

 ```js
 #Use Case
import React from 'react';
import { Button } from 'react-native';
import { initBackup, backupData, restoreData } from 'react-native-auto-backup';

// Initialize backup during app start
initBackup({
  provider: 'google', // or 'dropbox'
  providerConfig: { accessToken: '<GET_FROM_GOOGLE_SIGNIN>' },
  appName: 'MyCoolApp',
  encryptKey: 'my-secret-key', // optional AES encryption
});

export default function App() {
  return (
    <>
      <Button
        title="Backup Now"
        onPress={() => backupData({ asyncStorage: true })}
      />
      <Button
        title="Restore"
        onPress={() => restoreData({ fileId: '<FILE_ID_FROM_DRIVE>' })}
      />
    </>
  );
}

 