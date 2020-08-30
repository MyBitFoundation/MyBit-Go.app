import * as AirtableService from '../service/airtableService';
import { uploadFiles } from '../service/cloudinaryService';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const COVERPICTURE_SIZE_LIMIT = 2 * 1024 * 1024;

export const getAssets = (req, res) => {
  const { query: { network } } = req;
  req.pipe(AirtableService.pipeAssetListings(network)).pipe(res);
};

export const postAssets = async (req, res) => {
  const network = req.params.network;
  const assetDetails = JSON.parse(req.body.details);
  const { assetId } = assetDetails;

  if (req.files.find(file => (file.fieldname === 'file' && file.size > FILE_SIZE_LIMIT)
  || (file.fieldname === 'coverPicture' && file.size > COVERPICTURE_SIZE_LIMIT))) { throw new Error('One or more files exceed the size limit!'); }

  if (req.files.length > 6) { // 5 asset files & 1 cover picture file
    throw new Error('Too many asset files!');
  }

  const coverPicture = req.files.find(file => file.fieldname === 'coverPicture');
  const files = req.files.filter(file => file.fieldname === 'file');

  const [uploadedCoverPicture, ...uploadedFiles] = await uploadFiles(
    [coverPicture, ...files],
  );
  await AirtableService.addNewAsset(assetDetails, network);
  await AirtableService.updateAssetFiles({ assetId, files: uploadedFiles }, network);
  await AirtableService.updateCoverPicture(
    { assetId, file: uploadedCoverPicture }, network,
  );
  res.sendStatus(200);
};
