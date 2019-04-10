import regeneratorRuntime from "regenerator-runtime";
require('dotenv').config();
const AWS = require('aws-sdk');
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const SIZE_OF_ASSETID = 66;
export let filesByAssetId = {};
const s3bucket = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: bucketRegion,
  Bucket: bucketName,
});

export const handleFileUpload = (files, assetId) => {
  new Promise(async (resolve, reject) => {
    const responseData = [];
    files.map((item) => {
      const params = {
        Bucket: bucketName,
        Key: `${assetId}:${item.originalname}`,
        Body: item.buffer,
        ACL: 'public-read',
      };
      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject();
        } else {
          responseData.push(data);
          if (responseData.length === files.length) {
            ProcessFilesForAssets();
            console.log("Uploaded file(s) successfuly.")
            resolve(responseData);
          }
        }
      });
    });
  });
}

export const ProcessFilesForAssets = () => {
  const params = {
    Bucket: bucketName,
    MaxKeys: 1000, // TODO: make this dynamic
  };

  s3bucket.listObjectsV2(params, (err, data) => {
    if (err) {
      setTimeout(ProcessFilesForAssets, 1000 * 10);
    } else {
      const filesByAssetIdTmp = {};
      for(const file of data.Contents){
        const key = file.Key;

        const indexOfHex = key.indexOf('0x');
        const indexOfSeparator = key.indexOf(':');

        if(indexOfHex !== -1 && indexOfSeparator !== -1){
          const assetId = key.substring(0, indexOfSeparator);
          const fileName = key.substring(indexOfSeparator + 1);
          if(assetId.length === SIZE_OF_ASSETID){
            if(!filesByAssetIdTmp[assetId]){
              filesByAssetIdTmp[assetId] = [];
            }
            filesByAssetIdTmp[assetId].push(fileName);
          }
        }
      }
      filesByAssetId = filesByAssetIdTmp;
    }
  });
}
