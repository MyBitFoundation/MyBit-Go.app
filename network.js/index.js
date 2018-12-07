const ContractArtifacts = require("@mybit/contracts");
const Chain = require("@mybit/network-chain");
const Web3 = require("web3");
const TruffleContract = require("truffle-contract");
const Web3EventsListener = require("./eventListener");

const Promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );


function contract(artifact){
  var c = TruffleContract(artifact);
  c.setProvider(web3.currentProvider);
  c.currentProvider.sendAsync = function () {
    return c.currentProvider.send.apply(c.currentProvider, arguments);
  };
  return c;
}

module.exports = (function (){
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  //Setup contracts
  var apiContract = null;
  var mybitContract = null;
  var erc20BurnerContract = null;
  var databaseContract = null;
  var contractManagerContract = null;
  var singleOwnerContract = null;
  var pausibleContract = null;
  var accessHierarchyContract = null;
  var platformFundsContract = null;
  var operatorsContract = null;
  var assetManagerEscrowContract = null;
  var crowdsaleETHContract = null;
  var crowdsaleGeneratorETHContract = null;
  var crowdsaleERC20Contract = null
  var crowdsaleGeneratorERC20Contract = null;
  var assetGeneratorContract = null;
  var assetExchangeContract = null;
  var divTokenETHContract = null;
  var divTokenERCContract = null;
  var divTokenInterface = null;
  var erc20Interface = null;

  //Setup contracts only when it`s using
  const initApiContract = () => {
    apiContract = apiContract || contract(ContractArtifacts.API);
  };

  const initMybitContract = () => {
    mybitContract = mybitContract || contract(ContractArtifacts.BurnableToken);
  }

  const initErc20BurnerContract = () => {
    erc20BurnerContract = erc20BurnerContract || contract(ContractArtifacts.ERC20Burner)
  }

  const initDatabaseContract = () => {
    databaseContract = databaseContract || contract(ContractArtifacts.Database);
  }
 
  const initContractManagerContract = () => {
    contractManagerContract = contractManagerContract || contract(ContractArtifacts.ContractManager);
  }

  const initSingleOwnerContract = () => {
    singleOwnerContract = singleOwnerContract || contract(ContractArtifacts.SingleOwned);
  }
  
  const initPausibleContract = () => {
    pausibleContract = pausibleContract || contract(ContractArtifacts.Pausible);
  }

  const initAccessHierarchyContract = () => {
    accessHierarchyContract = accessHierarchyContract || contract(ContractArtifacts.AccessHierarchy);
  }

  const initPlatformFundsContract = () => {
    platformFundsContract = platformFundsContract || contract(ContractArtifacts.PlatformFunds);
  }

  const initOperatorsContract = () => {
    operatorsContract = operatorsContract || contract(ContractArtifacts.Operators);
  }

  const initAssetManagerEscrowContract = () => {
    assetManagerEscrowContract = assetManagerEscrowContract || contract(ContractArtifacts.AssetManagerEscrow);
  }

  const initCrowdsaleETHContract= () => {
    crowdsaleETHContract = crowdsaleETHContract || contract(ContractArtifacts.CrowdsaleETH);
  }
  
  const initCrowdsaleGeneratorETHContract = () => {
    crowdsaleGeneratorETHContract = crowdsaleGeneratorETHContract || contract(ContractArtifacts.CrowdsaleGeneratorETH);
  }

  const initCrowdsaleERC20Contract = () => {
    crowdsaleERC20Contract = crowdsaleERC20Contract || contract(ContractArtifacts.CrowdsaleERC20);
  }

  const initCrowdsaleGeneratorERC20Contract = () => {
    crowdsaleGeneratorERC20Contract = crowdsaleGeneratorERC20Contract || contract(ContractArtifacts.CrowdsaleGeneratorERC20);
  }

  const initAssetGeneratorContract = () => {
    assetGeneratorContract = assetGeneratorContract || contract(ContractArtifacts.AssetGenerator);
  }

  const initAssetExchangeContract = () => {
    assetExchangeContract = assetExchangeContract || contract(ContractArtifacts.AssetExchange);
  }

  const initDivTokenETHContract = () => {
    divTokenETHContract = divTokenETHContract || contract(ContractArtifacts.DividendToken);
  }

  const initDivTokenERCContract = () => {
    divTokenERCContract = divTokenERCContract || contract(ContractArtifacts.DividendTokenERC20);
  }

  const initDivTokenInterface = () => {
    divTokenInterface = divTokenInterface || contract(ContractArtifacts.DivToken);
  }

  const initErc20Interface = () => {
    erc20Interface = erc20Interface || contract(ContractArtifacts.ERC20);
  }

  return {
    api: async () => {
      initApiContract();
      return await apiContract.at(Chain.API());
    },

    assetExchange: async () => {
      initAssetExchangeContract();
      return await assetExchangeContract.at(Chain.AssetExchange());
    },

    assetGenerator: async () => {
      initAssetGeneratorContract()
      return await assetGeneratorContract.at(Chain.AssetGenerator());
    },

    assetGovernance: async () => {
      return await assetGovernanceContract.at(Chain.AssetGovernance());
    },

    assetManagerEscrow: async () => {
      initAssetManagerEscrowContract();
      return await assetManagerEscrowContract.at(Chain.BrokerEscrow());
    },

    contractManager: async () => {
      initContractManagerContract()
      return await contractManagerContract.at(Chain.ContractManager());
    },

    crowdsaleETH: async () => {
      initCrowdsaleETHContract();
      return await crowdsaleETHContract.at(Chain.CrowdsaleETH());
    },

    crowdsaleERC20: async () => {
      initCrowdsaleERC20Contract();
      return await crowdsaleERC20Contract.at(Chain.CrowdsaleERC20());
    },

    crowdsaleGeneratorETH: async () => {
      initCrowdsaleGeneratorETHContract();
      return await crowdsaleGeneratorETHContract.at(Chain.CrowdsaleGeneratorETH());
    },

    crowdsaleGeneratorERC20: async () => {
      initCrowdsaleGeneratorERC20Contract();
      return await crowdsaleGeneratorERC20Contract.at(Chain.CrowdsaleGeneratorERC20());
    },

    database: async () => {
      initDatabaseContract();
      return await databaseContract.at(Chain.Database());
    },

    events: async () => {
      return await eventsContract.at(Chain.Events());
    },

    dividendTokenETH: async (tokenAddress) => {
      initDivTokenETHContract()
      return await divTokenETHContract.at(tokenAddress);
    },

    dividendTokenERC20: async (tokenAddress) => {
      initDivTokenERCContract();
      return await divTokenERCContract.at(tokenAddress);
    },

    erc20: async (tokenAddress) => {
      initMybitContract();
      return await mybitContract.at(tokenAddress);
    },

    erc20Burner: async () => {
      initErc20BurnerContract();
      return await erc20BurnerContract.at(Chain.ERC20Burner());
    },

    operators: async () => {
      initOperatorsContract();
      return await operatorsContract.at(Chain.Operators());
    },

    platformFunds: async () => {
      initPlatformFundsContract();
      return await platformFundsContract.at(Chain.PlatformFunds());
    },

    //Approve the burning of MyBit on the MyBit Go Platform
    approveBurn: async (fromAddress) => {
      initMybitContract();
      initContractManagerContract();
      var count = 0;
      var amount = 1000000000000000000000000000000; //Some large amount 10^30
      tokenInstance = await mybitContract.at(Chain.MyBit());
      await tokenInstance.approve(Chain.ERC20Burner(), amount, {from: fromAddress});
      contractManagerInstance = await contractManagerContract.at(Chain.ContractManager());
      await contractManagerInstance.setContractStatePreferences(true, false, {from: fromAddress});
      return true;
    },

    addOperator: async (account, name, owner) => {
      initOperatorsContract();
      instance = await operatorsContract.at(Chain.Operators());
      block = await web3.eth.getBlock('latest');
      await instance.registerOperator(account, name, assetType, {from: owner, gas:300000});
      logs = await getOperatorEvent('Operator registered', owner, block.number);
      return logs[0].args.operatorID;
    },

    //Set whether the operator accepts Ether (operator only)
    acceptEther: async (id, operatorAddress) => {
      initOperatorsContract();
      instance = await operatorsContract.at(Chain.Operators());
      await instance.acceptEther(id, true, {from: operatorAddress});
      return true;
    },

    //Set whether the operator accepts an ERC20 (operator only)
    acceptERC20Token: async (id, tokenAddress, operatorAddress) => {
      initOperatorsContract();
      instance = await operatorsContract.at(Chain.Operators());
      await instance.acceptERC20Token(id, tokenAddress, true, {from: operatorAddress});
      return true;
    },

    //Create a new asset and begin a crowdsale to fund the asset. Tokens representing shares are paid out to investors
    createAsset: async (object) => {
      block = await web3.eth.getBlock('latest');
      if(object.fundingToken === undefined){
        initCrowdsaleGeneratorETHContract();
        instance = await crowdsaleGeneratorETHContract.at(Chain.CrowdsaleGeneratorETH());
        await instance.createAssetOrderETH(object.assetURI, object.assetManager, object.operatorID, object.fundingLength, object.startTime, object.amountToRaise, object.assetManagerPercent, {from: object.assetManager, gas:2300000});
      } else {
        initCrowdsaleGeneratorERC20Contract();
        instance = await crowdsaleGeneratorERC20Contract.at(Chain.CrowdsaleGeneratorERC20());
        await instance.createAssetOrderERC20(object.assetURI, object.assetManager, object.operatorID, object.fundingLength, object.startTime, object.amountToRaise, object.assetManagerPercent, object.fundingToken, {from: object.assetManager, gas:6700000});
      }
      logs = await getAssetEvent('Asset funding started', object.assetManager, block.number)
      return logs[logs.length-1].args;
    },

    //Create a dividend token (tradeable or non-tradeable) for an asset already operating
    tokenizeAsset: async (object) => {
      instance = await assetGeneratorContract.at(Chain.AssetGenerator());
      block = await web3.eth.getBlock('latest');
      if(object.tradeable == true){
        await instance.createTradeableAsset(object.assetURI, object.assetManager, object.tokenHolders, object.tokenAmounts, {from: object.assetManager, gas:2000000});
        logs = await getAssetEvent('Asset created', object.assetManager, block.number);
      } else {
        await instance.createAsset(object.assetURI, object.assetManager, object.tokenHolders, object.tokenAmounts, {from: object.assetManager, gas:2000000});
        logs = await getAssetEvent('Asset created', object.assetManager, block.number);
      }
      return logs[logs.length-1].args;
    },

    //Create a dividend token. Once deployed, the creator can mint as many tokens as they like.
    createDividendToken: async (object) => {
      if(object.fundingToken === undefined){
        initDivTokenETHContract();
        instance = await divTokenETHContract.new(object.uri, object.owner, {from: object.owner, gas:2700000});
        return instance;
      } else {
        initDivTokenERCContract();
        instance = await divTokenERCContract.new(object.uri, object.owner, object.fundingToken, {from: object.owner, gas:2700000});
        return instance;
      }
    },

    //Create a basic ERC20 token. The owner must pass the number of tokens they wish to create. All tokens are given to creator.
    createERC20Token: async (object) => {
      initMybitContract();
      instance = await mybitContract.new(object.uri, object.total, {from: object.owner, gas:2700000});
      return instance;
    },

    //Fund an asset undergoing a crowdsale. Pay Eth or ERC20's and get an asset dividen token in return.
    fundAsset: async (object) => {
      if(object.fundingToken === undefined){
        initCrowdsaleETHContract();
        instance = await crowdsaleETHContract.at(Chain.CrowdsaleETH());
        tx = await instance.buyAssetOrderETH(object.assetID, object.investor, {from: object.investor, value: object.amount, gas:2300000});
      } else {
        initCrowdsaleERC20Contract();
        instance = await crowdsaleERC20Contract.at(Chain.CrowdsaleERC20());
        tx = await instance.buyAssetOrderERC20(object.assetID, object.investor, object.amount, {from: object.investor, gas:2300000});
      }
      return tx.tx;
    },

    //Pay Eth or ERC20 tokens into a asset's dividend token. The money will be distributed amongst all token holders.
    issueDividends: async (assetID, account, amount) => {
      initApiContract();
      initDivTokenETHContract();
      initDivTokenERCContract();
      initDivTokenInterface();
      initErc20Interface();
      var apiInstance = await apiContract.at(Chain.API());
      var tokenAddress = await apiInstance.getAssetAddress(assetID);
      var interfaceInstance = await divTokenInterface.at(tokenAddress);
      var erc20Address = await interfaceInstance.getERC20();
      if(erc20Address == '0x0000000000000000000000000000000000000000'){
        var balance = await web3.eth.getBalance(account);
        if(balance >= amount){
          try{
            var tokenInstance = await divTokenETHContract.at(tokenAddress);
            await tokenInstance.issueDividends({from:account, value:amount, gas: 220000});
            return true;
          } catch(e){
            console.log(e);
            return false;
          }
        } else {
          console.log('Not enough funds!');
          return false;
        }
      } else {
        var erc20Instance = await erc20Contract.at(erc20Address);
        var balance = await erc20Instance.balanceOf(account);
        if(balance >= amount){
          try{
            var tokenInstance = await divTokenERCContract.at(tokenAddress);
            await tokenInstance.issueDividends(amount, {from:account, gas: 220000});
            return true;
          } catch(e){
            console.log(e);
            return false;
          }
        } else {
          console.log('Not enough funds!');
          return false;
        }
      }
    },

    //View the assets an investor has invested in. (This may not represent their current stake, just crowdsales they have contributed to)
    getAssetsByInvestor: async (address) => {
      initCrowdsaleETHContract();
      initCrowdsaleERC20Contract();
      var assets = [];
      var logs = await getTransactionEvent('Asset purchased', address, undefined, 0);
      logs.forEach(function (log, index) {
        var assetID = log.args.assetID;
        assets.push(assetID);
      });

      return assets;
    },

    //View assets created by an asset manager
    getAssetsByManager: async (address) => {
      initCrowdsaleGeneratorETHContract();
      initCrowdsaleGeneratorERC20Contract();
      var assets = [];
      var logs = await getAssetEvent('Asset funding started', address, 0);
      logs.forEach(function (log, index) {
        var assetID = log.args.assetID;
        assets.push(assetID);
      });

      return assets;
    },

    //View assets by operator
    getAssetsByOperator: async (address) => {
      initApiContract();
      initCrowdsaleGeneratorETHContract();
      initCrowdsaleGeneratorERC20Contract()
      var assets = [];
      var apiInstance = await apiContract.at(Chain.API());
      var logs = await getAssetEvent('Asset funding started', undefined, 0);
      for(var i=0; i<logs.length; i++){
        var assetID = logs[i].args.assetID;
        var operator = await apiInstance.getAssetOperator(assetID);
        if(address.toLowerCase() == operator.toLowerCase()){
          assets.push(assetID);
        }
      }

      return assets;
    },

    //View all assets
    getTotalAssets: async () => {
      initCrowdsaleGeneratorETHContract();
      initCrowdsaleGeneratorERC20Contract();
      var assets = [];
      var logs = await getAssetEvent('Asset funding started', undefined, 0);
      logs.forEach(function (log, index) {
        var assetID = log.args.assetID;
        assets.push(assetID);
      });

      return assets;
    },

    //View assets by the open crowdsales
    getOpenCrowdsales: async () => {
      initApiContract();
      initCrowdsaleGeneratorETHContract();
      initCrowdsaleGeneratorERC20Contract();
      var assets = [];
      var apiInstance = await apiContract.at(Chain.API());
      var logs = await getAssetEvent('Asset funding started', undefined, 0);
      for(var i=0; i<logs.length; i++){
        var assetID = logs[i].args.assetID;
        var finalized = await apiInstance.crowdsaleFinalized(assetID);
        if(!finalized){
          var deadline = Number(await apiInstance.getAssetFundingDeadline(assetID));
          var now = Math.round(new Date().getTime()/1000); //Current time in seconds;
          if(deadline > now){
            assets.push(assetID);
          }
        }
      }

      return assets;
    },

    //Get the time left on a crowdsale (closed sales return 0).
    getFundingTimeLeft: async (assetID) => {
      initApiContract();
      var instance = await apiContract.at(Chain.API());
      var deadline = Number(await instance.getAssetFundingDeadline(assetID));
      var now = Math.round(new Date().getTime()/1000); //Current time in seconds;
      var timeleft;
      if(deadline > now){
        timeleft = deadline - now;
      } else {
        timeleft = 0;
      }
      return timeleft
    },

    //Get the funding goal of a crowdsale
    getFundingGoal: async (assetID) => {
      initApiContract();
      initDivTokenInterface();
      var apiInstance = await apiContract.at(Chain.API());
      var finalized = await apiInstance.crowdsaleFinalized(assetID);
      var goal;

      //Funding goal gets deleted when crowdsale finalizes, so we must get the token supply
      if(finalized) {
        var tokenAddress = await apiInstance.getAssetAddress(assetID);
        var tokenInstance = await divTokenInterface.at(tokenAddress);
        goal = Number(await tokenInstance.totalSupply());
      } else {
        goal = Number(await apiInstance.getAssetFundingGoal(assetID));
      }
      return goal;
    },

    //Get funding progress
    getFundingProgress: async (assetID) => {
      initApiContract();
      initDivTokenInterface();
      var apiInstance = await apiContract.at(Chain.API());
      var tokenAddress = await apiInstance.getAssetAddress(assetID);
      var tokenInstance = await divTokenInterface.at(tokenAddress);
      var progress = Number(await tokenInstance.totalSupply());
      return progress;
    },

    //Get the operator of an asset
    getAssetOperator: async (assetID) => {
      initApiContract();
      var apiInstance = await apiContract.at(Chain.API());
      var operator = await apiInstance.getAssetOperator(assetID);
      return operator;
    },

    //Get the manager of an asset
    getAssetManager: async (assetID) => {
      initApiContract();
      var apiInstance = await apiContract.at(Chain.API());
      var manager = await apiInstance.getAssetManager(assetID);
      return manager;
    },

    //Get an asset's investors
    getAssetInvestors: async (assetID) => {
      initCrowdsaleETHContract();
      initCrowdsaleERC20Contract();
      var investors = [];
      var logs = await getTransactionEvent('Asset purchased', undefined, undefined, 0);
      logs.forEach(function (log, index) {
        if(log.args.id == assetID){
          var investor = log.args.from;
          investors.push(investor);
        }
      });

      return investors;
    },

    getWeb3EventsListener: (providerNet) => {
      const eventListener = new Web3EventsListener(providerNet)
      return eventListener
    }
  }
})();
