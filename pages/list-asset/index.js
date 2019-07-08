import Router from "next/router";
import Media from 'react-media';
import BN from 'bignumber.js';
import { compose } from 'recompose'
import {
  Button,
  Tooltip,
  Carousel,
} from "antd";
import getConfig from 'next/config';
import Cookie from 'js-cookie';
import Geocode from "react-geocode";
import { withMetamaskContext } from 'components/MetamaskContext';
import { withBlockchainContext } from 'components/BlockchainContext';
import { withKyberContext } from 'components/KyberContext';
import { withTermsOfServiceContext } from 'components/TermsOfServiceContext';
import { withAirtableContext } from 'components/AirtableContext';
import { withCivicContext } from "ui/CivicContext";
import ListAssetMobile from './listAssetMobile';
import ListAssetDesktop from './listAssetDesktop';
import getTokenWithSufficientBalance from 'constants/getTokenWithSufficientBalance';
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
  PLATFORM_TOKEN,
  DEFAULT_TOKEN,
  getPlatformTokenContract,
} from 'constants/app';
import { COOKIES } from 'constants/cookies';
import calculateCollateral from 'constants/calculateCollateral';
import {
  convertFromPlatformToken,
  convertFromDefaultToken,
  convertFromTokenToDefault,
  formatValueForToken,
} from 'utils/helpers';
import {
  processLocationData,
} from 'utils/locationData';
import getCountry from 'utils/countryCodes';
import { calculateSlippage } from 'constants/calculateSlippage';
import {
  FIAT_TO_CRYPTO_CONVERSION_FEE,
} from 'constants/platformFees';
const dev = process.env.NODE_ENV === 'development';
const { publicRuntimeConfig } = getConfig();
BN.config({ EXPONENTIAL_AT: 80 });

class ListAssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fileList: [],
        managementFee: 0,
        collateralPercentage: 0,
        collateralInPlatformToken: 0,
        collateralInDefaultToken: 0,
        collateralInSelectedToken: 0,
        partnerContractAddress: '',
        hasAdditionalCosts: false,
        additionalCosts: 0,
      },
      isUserListingAsset: false,
      listedAssetId: undefined,
      step: props.civic.token ? 1 : 0,
      checkedToS: false,
    };
    this.readTermsOfService = props.ToSContext.readToS;
  }

  componentWillMount = () => {
    try {
      document.addEventListener('keydown', this.handleKeyDown);
      if (!Cookie.get(COOKIES.LIST_ASSET_VISIT)) {
        Cookie.set(COOKIES.LIST_ASSET_VISIT, 'true');
        Router.push('/asset-manager', {
          href: '/list-asset',
          as: '/list-asset'
        });
      }
    } catch (err) {
      console.log(err);
    }
    this.ismounted = true;
  }

  componentWillUnmount = () => {
     this.ismounted = false;
     document.removeEventListener('keydown', this.handleKeyDown);
  }

  setUserListingAsset = (isUserListingAsset, listedAssetId) => {
    if(!this.ismounted){
      return;
    }
    this.setState({
      isUserListingAsset,
      listedAssetId,
    })
  }

  handleInputChange = e => {
    const {
      name,
      value,
    } = e.target;

    if(name === 'assetAddress1'){
      this.setState({
        data: { ...this.state.data, assetAddress1: value, searchAddress1: value, }
      });
    } else if(name === 'userCity'){
      this.setState({
        data: { ...this.state.data, searchCity: value, userCity: value, }
      });
    }
    else {
      this.setState({
        data: { ...this.state.data, [name]: value }
      });
    }
  };

  handleSelectedTokenChange = selectedToken => {
    this.setState({data: {...this.state.data, selectedToken}}, () => this.recalculateCollateral(this.state.data.asset))
  }

  recalculateCollateral = assetName => {
    const {
      blockchainContext,
      airtableContext,
      metamaskContext,
      supportedTokensInfo,
    } = this.props;
    assetName = assetName || this.state.data.asset;
    const { assetsAirTable } = airtableContext;
    const asset = assetsAirTable.filter(assetTmp => assetTmp.name === assetName)[0];
    const { additionalCosts = 0 } = this.state.data;
    const {
      operatorId,
      fundingGoal,
      cryptoPayout,
      cryptoPurchase,
    } = asset;

    const {
      assets,
      assetManagers,
    } = blockchainContext;

    let assetValue = BN(fundingGoal);

    // Add 8% fee if it applies and AM expenses
    const fiatToCryptoFee = !cryptoPurchase ? assetValue.times(FIAT_TO_CRYPTO_CONVERSION_FEE).toNumber() : 0;
    assetValue = assetValue.plus(fiatToCryptoFee).plus(additionalCosts).toNumber();

    const { selectedToken } = this.state.data;
    const { user, network } = metamaskContext;
    const { balances } = user;
    const numberOfAssetsByAssetManager = assetManagers[user.address] ? assetManagers[user.address].totalAssets : 0;
    const paymentTokenAddress = selectedToken && balances && balances[selectedToken] && balances[selectedToken].contractAddress;

    const {
      collateralBasedOnHistory,
      collateralCryptoPurchase,
      collateralCryptoPayouts,
      collateralPercentage,
    } = calculateCollateral(numberOfAssetsByAssetManager, cryptoPayout, cryptoPurchase);

    const collateralInDefaultToken = assetValue * (collateralPercentage / 100);
    const collateralInPlatformToken = convertFromDefaultToken(PLATFORM_TOKEN, supportedTokensInfo, collateralInDefaultToken)
    const collateralInSelectedToken = convertFromDefaultToken(selectedToken || DEFAULT_TOKEN, supportedTokensInfo, collateralInDefaultToken)

    this.setState({
      data: {
        ...this.state.data,
        asset: assetName,
        assetValue,
        operatorId,
        collateralInPlatformToken,
        collateralBasedOnHistory,
        collateralCryptoPurchase,
        collateralCryptoPayouts,
        collateralPercentage,
        numberOfAssetsByAssetManager,
        collateralInDefaultToken,
        collateralInSelectedToken,
        paymentTokenAddress,
        cryptoPurchase,
      },
      loadingConversionInfo: true,
    })

    const PLATFORM_TOKEN_CONTRACT = getPlatformTokenContract(network);
    const tokenSlippagePercentages = calculateSlippage(balances, PLATFORM_TOKEN_CONTRACT, collateralInPlatformToken)
      .then(tokenSlippagePercentages => {
        console.log("tokenSlippagePercentages: ", tokenSlippagePercentages)
        this.setState({tokenSlippagePercentages, loadingConversionInfo: false})
      })
  }

  handleSelectChange = (value, name) => {
    if(name === 'asset'){
      const assetName = value.name;
      this.recalculateCollateral(assetName);
    } else {
      this.setState(
        {
          data: { ...this.state.data, [name]: value }
        },
        () => {
          switch(name) {
            case 'userCountry': {
              const countryData = getCountry(value);
              const countryCode = countryData ? countryData.iso2.toLowerCase() : '';

              this.setState({
                data: { ...this.state.data, assetCountry: value, category: '', asset: undefined, assetValue: undefined, countryCode, userCity: undefined}
              });break;
            }
            case 'category': {
              this.setState({
                data: { ...this.state.data, category: value, asset: undefined, assetValue: undefined, }
              });break;
            }
            case 'additionalCosts': {
              this.recalculateCollateral();
            }
            default: return null;
          }
        }
      );
    }
  };

  handleDetectLocationClicked = () => {
    Geocode.setApiKey(publicRuntimeConfig.GOOGLE_PLACES_API_KEY);

    navigator.geolocation.getCurrentPosition(location => {
      const {
        latitude,
        longitude,
      } = location.coords;
      Geocode.fromLatLng(latitude, longitude).then(
        response => {
          const locationData = processLocationData(response.results, ['country', 'locality']);
          const {
            locality,
            country,
          } = locationData;
          const countryData = getCountry(country);
          const countryCode = countryData ? countryData.iso2.toLowerCase() : '';

          this.setState({
            data: { ...this.state.data, userCity: locality, userCountry: country, countryCode, }
          })
        },
        error => {
          console.error(error);
        }
      );
    })
  }

  handleSelectSuggest = suggest => {
    const locationData = processLocationData(suggest.address_components, ['locality', 'route', 'postal_code', 'administrative_area_level_1', "street_number"]);
    const {
      locality,
      route,
      postal_code,
      administrative_area_level_1,
      street_number,
    } = locationData;
    this.setState({
      data: {
        ...this.state.data,
        assetAddress1: route,
        assetAddress2: street_number,
        assetCity: administrative_area_level_1,
        assetProvince: locality,
        assetPostalCode: postal_code,
        searchAddress1: '',
      }
    })
  }

  handleCitySuggest = suggest => {
    const locationData = processLocationData(suggest.address_components, ['locality']);
    const {
      locality,
    } = locationData;
    this.setState({
      data: {
        ...this.state.data,
        userCity: locality,
        searchCity: '',
      }
    })
  }

  handleFileUpload = filesObject => {
    // so that we get no loading animation in the UI next to the file name
    filesObject.file.status = 'success';
    let files = filesObject.fileList;
    // apply file size restriction
    for(let i = 0; i < files.length; i++){
      if(files[i].size > MAX_FILE_SIZE){
        files = files.filter(file => file !== files[i]);
        i--;
      }
    }

    // apply number of files restriction
    if(files.length > MAX_FILES_UPLOAD){
      files = files.slice(0, MAX_FILES_UPLOAD);
    }

    this.setState({
      data: { ...this.state.data, fileList: files }
    });
  };

  goToNextStep = () => {
    this.setState({step: this.state.step + 1});
  }

  goToStep = step => {
    if(!this.state.listedAssetId){
      this.setState({step});
    }
  }

  setCheckedToS = () => this.setState(prevState => ({checkedToS: !prevState.checkedToS}));

  render() {
    const {
      civic,
      metamaskContext,
      blockchainContext,
      kyberLoading,
      ToSContext,
    } = this.props;

    const {
      handleListAsset,
      loadingAssets,
    } = blockchainContext;

    const {
      user,
      loadingBalancesForNewUser,
    } = metamaskContext;

    const {
      readToS,
      setReadToS,
    } = ToSContext;

    const {
      data,
      isUserListingAsset,
      listedAssetId,
      step,
      checkedToS,
      tokenSlippagePercentages,
     } = this.state;

    const {
      managementFee,
      collateralInPlatformToken,
      collateralPercentage,
      assetValue,
      fileList,
      selectedToken,
      collateralInSelectedToken,
      collateralInDefaultToken,
      asset,
      category,
      userCity,
      userCountry,
      loadingConversionInfo,
    } = this.state.data;

    const tokenWithSufficientBalance = collateralInDefaultToken > 0 ? getTokenWithSufficientBalance(user.balances, collateralInDefaultToken) : undefined;
    const metamaskErrorsToRender = metamaskContext.metamaskErrors('');
    const propsToPass = {
      dev,
      step,
      civic,
      loadingAssets,
      kyberLoading,
      listedAssetId,
      isUserListingAsset,
      handleListAsset,
      metamaskErrorsToRender,
      readToS,
      setReadToS,
      checkedToS,
      collateralInPlatformToken,
      loadingBalancesForNewUser,
      loadingConversionInfo,
      tokenSlippagePercentages,
      tokenWithSufficientBalance: tokenWithSufficientBalance !== undefined,
      setCheckedToS: this.setCheckedToS,
      handleSelectChange: this.handleSelectChange,
      handleInputChange: this.handleInputChange,
      handleCitySuggest: this.handleCitySuggest,
      handleSelectedTokenChange: this.handleSelectedTokenChange,
      handleFileUpload: this.handleFileUpload,
      setUserListingAsset: this.setUserListingAsset,
      handleDetectLocationClicked: this.handleDetectLocationClicked,
      handleSelectSuggest: this.handleSelectSuggest,
      goToNextStep: this.goToNextStep,
      goToStep: this.goToStep,
      countries: COUNTRIES,
      formData: data,
      balances: user.balances,
      shouldShowToSCheckmark: this.readTermsOfService,
      airtableContext: this.props.airtableContext,
    }
    return (
      <div>
        <Media query="(min-width: 768px)">
          {matches =>
            matches ? (
              <ListAssetDesktop {...propsToPass}/>
            ) : (
              <ListAssetMobile {...propsToPass} />
            )
          }
        </Media>
      </div>
    )
  }
}

const enhance = compose(
  withKyberContext,
  withBlockchainContext,
  withMetamaskContext,
  withCivicContext,
  withTermsOfServiceContext,
  withAirtableContext,
);

export default enhance(ListAssetPage);
