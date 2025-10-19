// NOTE: this file assumes consumer app handles Google Sign-In and supplies accessToken
const RNFetchBlob = require('rn-fetch-blob');

async function uploadToGoogleDrive({ accessToken, localFilePath, fileName }) {
  // metadata + file payload multi-part
  const metadata = { name: fileName, mimeType: 'application/json' };

  const resp = await RNFetchBlob.fetch(
    'POST',
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/related; boundary=foo_bar_baz',
    },
    [
      { name: 'metadata', data: JSON.stringify(metadata) },
      { name: 'file', filename: fileName, data: RNFetchBlob.wrap(localFilePath) },
    ]
  );

  const json = resp.json();
  return json; // contains file id etc.
}

async function downloadFromGoogleDrive({ accessToken, fileId, destPath }) {
  const resp = await RNFetchBlob.fetch(
    'GET',
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { Authorization: `Bearer ${accessToken}` }
  );
  await RNFetchBlob.fs.writeFile(destPath, resp.base64(), 'base64');
  return destPath;
}

module.exports = { uploadToGoogleDrive, downloadFromGoogleDrive };
