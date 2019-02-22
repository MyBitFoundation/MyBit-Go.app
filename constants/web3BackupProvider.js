import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const WEB3_BACKUP_PROVIDER = `https://ropsten.infura.io/v3/${publicRuntimeConfig.REACT_APP_INFURA_API_KEY}`;
