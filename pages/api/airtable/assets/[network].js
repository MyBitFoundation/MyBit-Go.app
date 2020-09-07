import { getAssets, postAssets } from 'server/controllers/assets';

export default (req, res) => {
  try {
    if (req.method === 'GET') { return getAssets(req, res); }
    if (req.method === 'POST') { return postAssets(req, res); }
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
  return res.sendStatus(404);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
