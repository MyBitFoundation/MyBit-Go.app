import regeneratorRuntime from "regenerator-runtime";
require('dotenv').config();
const civicSip = require('civic-sip-api');

const civicClient = civicSip.newClient({
  appId: process.env.REACT_APP_CIVIC_APP_ID,
  prvKey: process.env.CIVIC_PRIVATE_KEY,
  appSecret: process.env.CIVIC_APP_SECRET,
});

export const exchangeCode = async (jwt) => {
  return await civicClient.exchangeCode(jwt);
}
