const isIPFS = require('is-ipfs');
import { IPFS_URL } from 'constants/ipfs';

const MAX_DOWNLOADS_PARALLEL = 10;

class IpfsDataManager {
  constructor(network, assetListings, assetModels, operators, updateListing, updateModel, updateOperator){
    this.updateListing = updateListing;
    this.updateModel = updateModel;
    this.updateOperator = updateOperator;
    this.network = network;
    this.assetModels = {};
    this.operators = {};
    this.resourcesToResolve = [];
    this.assetListings = {};
    this.index = 0;
    this.downloading = 0;
    this.buildResourcesToResolve(assetListings, assetModels, operators);
  }

  addResource = (id, value, updater) => {
    if(isIPFS.cid(value.ipfs)){
      this.resourcesToResolve.push({
        ipfs: value.ipfs,
        value,
        id,
        updater,
      })
    }
  }

  addToResources = (collection, updater) => {
    Object.entries(collection).reverse().forEach(([id, value]) => this.addResource(id, value, updater))
    this.downloadResources();
  }

  buildResourcesToResolve = (assetListings, assetModels, operators) => {
    this.addToResources(operators, this.updateOperator);
    this.addToResources(assetModels, this.updateModel);
    this.addToResources(assetListings, this.updateListing);
    this.downloadResources();
  }

  downloadResources = () => {
    const totalResources = this.resourcesToResolve.length;
    const resourcesToDownloadInParallel = MAX_DOWNLOADS_PARALLEL - this.downloading;
    let counter = 0;
    if(this.index === totalResources - 1 && this.downloading === 0){
      console.log("Going away...")
      return;
    }

    while(this.index < totalResources && counter < totalResources && counter < resourcesToDownloadInParallel){
      const resource = this.resourcesToResolve[this.index];
      this.downloadResource(resource, () => this.downloading--);
      this.index++;
      this.downloading++;
      counter++;
    }

    setTimeout(this.downloadResources, 1000)
  }

  downloadResource = async (params, cb) => {
    try{
      const {
        value,
        id,
        ipfs,
        updater
      } = params;

      const result = await fetch(`${IPFS_URL}${ipfs}`);
      const jsonResult = await result.json();
      updater(id, {
        ...value,
        ...jsonResult,
      });
    }catch(error) {
      console.log(error)
    }
    cb();
  }

  fetchNewResource = (id, value, updater) => {
    this.addResource(id, value, updater)
    if(this.downloading === 0){
      this.downloadResources();
    }
  }
}

export default IpfsDataManager;
