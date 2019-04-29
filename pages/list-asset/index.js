import Router from "next/router";
import Media from 'react-media';
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
import { withCivicContext } from "ui/CivicContext";
import ListAssetMobile from './listAssetMobile';
import ListAssetDesktop from './listAssetDesktop';
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
  PLATFORM_TOKEN,
  DEFAULT_TOKEN,
} from 'constants/app';
import { COOKIES } from 'constants/cookies';

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

const dev = process.env.NODE_ENV === 'development';
const { publicRuntimeConfig } = getConfig();

class ListAssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchCity: '',
        searchAddress1: '',
        assetAddress1: '',
        assetAddress2: '',
        assetCity: '',
        assetCountry: '',
        assetProvince: '',
        assetPostalCode: '',
        fileList: [],
        managementFee: 0,
        maxCollateralPercentage: 100,
        collateralPercentage: 0,
        collateralMyb: 0,
        collateralDai: 0,
        collateralSelectedToken: 0,
        partnerContractAddress: '',
        selectedToken: '',
        operatorId: '',
        countryCode: '',
      },
      isUserListingAsset: false,
      listedAssetId: undefined,
      step: props.civic.token ? 1 : 0,
    };
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
    const collateralDai = this.state.data.collateralDai;
    const balances = this.props.metamaskContext.user.balances;

    const paymentTokenAddress = selectedToken && balances && balances[selectedToken] && balances[selectedToken].contractAddress;
    const collateralSelectedToken = balances ? convertFromDefaultToken(selectedToken, balances, collateralDai) : 0;

    this.setState({
      data: {
        ...this.state.data,
        selectedToken,
        collateralSelectedToken,
        paymentTokenAddress,
      },
    });
  }

  handleSelectChange = (value, name) => {
    if(name === 'asset'){
      const assetName = value.name;
      const asset = value.assetsAirTable.filter(assetTmp => assetTmp.name === assetName)[0];
      const {
        operatorId,
        fundingGoal,
      } = asset;

      this.setState({
        data: {
          ...this.state.data,
          asset: assetName,
          assetValue: fundingGoal,
          operatorId,
        }
      })
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

  handleCollateralChange = (value, name) => {
    let percentage, myb, dai, collateralSelectedToken, maxCollateralPercentage, convertedAmount;
    const {
      assetValue,
      selectedToken,
    } = this.state.data;

    const {
      selectedAmount,
    } = value;

    const {
      metamaskContext,
      supportedTokensInfo: supportedTokens,
    } = this.props;

    const balances = metamaskContext.user.balances;

    const totalTokens = Object.keys(balances).length;
    if(totalTokens > 0){
      const selectedTokenInfo = balances[selectedToken];
      const maxAmountAllowedInDai = !selectedTokenInfo ? 0
        : selectedTokenInfo.balanceInDai > assetValue
          ? assetValue
            : selectedTokenInfo.balanceInDai;

      maxCollateralPercentage = maxAmountAllowedInDai === 0 ? 0 : parseInt((maxAmountAllowedInDai / assetValue) * 100);
      const maxInMyb = maxAmountAllowedInDai === 0 ? 0 : convertFromDefaultToken(PLATFORM_TOKEN, supportedTokens, maxAmountAllowedInDai);
      const maxCollateralSelectedToken = maxAmountAllowedInDai === 0 ? 0 : convertFromDefaultToken(selectedToken, supportedTokens, maxAmountAllowedInDai);
      switch (name) {
        case "percentage":
          percentage = selectedAmount;
          myb = convertFromDefaultToken(PLATFORM_TOKEN, supportedTokens, assetValue * (selectedAmount / 100))
          dai = assetValue * (selectedAmount / 100)
          collateralSelectedToken = formatValueForToken(convertFromDefaultToken(selectedToken, supportedTokens, dai), selectedToken)
          break;
        case "myb":
          myb = selectedAmount > maxInMyb ? maxInMyb : selectedAmount
          percentage = parseInt((myb / maxInMyb) * 100)
          dai = (maxAmountAllowedInDai * (percentage / 100))
          collateralSelectedToken = convertFromPlatformToken(selectedToken, supportedTokens, myb)
          break;
        case "selectedToken":
          collateralSelectedToken = selectedAmount > maxCollateralSelectedToken ? maxCollateralSelectedToken : Number(selectedAmount)
          dai = convertFromTokenToDefault(selectedToken, supportedTokens, collateralSelectedToken)
          myb = selectedToken === PLATFORM_TOKEN ? collateralSelectedToken : convertFromDefaultToken(PLATFORM_TOKEN, supportedTokens, dai)
          percentage = parseInt((dai/maxAmountAllowedInDai) * 100)
          break;
        default: return null;
      }
    }

    this.setState(
      {
        data: {
          ...this.state.data,
          collateralMyb: myb,
          collateralDai: dai,
          collateralPercentage: percentage,
          maxCollateralPercentage,
          collateralSelectedToken,
        }
      });
  };

  goToNextStep = () => {
    this.setState({step: this.state.step + 1});
  }

  goToStep = step => {
    this.setState({step});
  }

  render() {
    const {
      civic,
      metamaskContext,
      blockchainContext,
      kyberLoading,
    } = this.props;

    const {
      handleListAsset,
      loadingAssets,
    } = blockchainContext;

    const {
      user,
    } = metamaskContext;

    const {
      data,
      isUserListingAsset,
      listedAssetId,
      step,
     } = this.state;

    const {
      managementFee,
      collateralMyb,
      collateralPercentage,
      assetValue,
      fileList,
      selectedToken,
      collateralDai,
      maxCollateralPercentage,
      collateralSelectedToken,
      asset,
      category,
      userCity,
      userCountry,
    } = this.state.data;

    const metamaskErrorsToRender = metamaskContext.metamaskErrors('');

    return (
      <div>
        <Media query="(min-width: 768px)">
          {matches =>
            matches ? (
              <ListAssetDesktop
                dev={dev}
                step={step}
                civic={civic}
                handleSelectChange={this.handleSelectChange}
                handleInputChange={this.handleInputChange}
                handleCitySuggest={this.handleCitySuggest}
                handleSelectedTokenChange={this.handleSelectedTokenChange}
                handleCollateralChange={this.handleCollateralChange}
                handleFileUpload={this.handleFileUpload}
                setUserListingAsset={this.setUserListingAsset}
                handleDetectLocationClicked={this.handleDetectLocationClicked}
                handleSelectSuggest={this.handleSelectSuggest}
                goToNextStep={this.goToNextStep}
                goToStep={this.goToStep}
                countries={COUNTRIES}
                loadingAssets={loadingAssets}
                formData={data}
                balances={user.balances}
                kyberLoading={kyberLoading}
                listedAssetId={listedAssetId}
                isUserListingAsset={isUserListingAsset}
                handleListAsset={handleListAsset}
                metamaskErrorsToRender={metamaskErrorsToRender}
              />
            ) : (
              <ListAssetMobile
                dev={dev}
                civic={civic}
                handleSelectChange={this.handleSelectChange}
                handleInputChange={this.handleInputChange}
                handleCitySuggest={this.handleCitySuggest}
                handleSelectedTokenChange={this.handleSelectedTokenChange}
                handleCollateralChange={this.handleCollateralChange}
                handleFileUpload={this.handleFileUpload}
                setUserListingAsset={this.setUserListingAsset}
                handleDetectLocationClicked={this.handleDetectLocationClicked}
                handleSelectSuggest={this.handleSelectSuggest}
                countries={COUNTRIES}
                loadingAssets={loadingAssets}
                formData={data}
                balances={user.balances}
                kyberLoading={kyberLoading}
                listedAssetId={listedAssetId}
                isUserListingAsset={isUserListingAsset}
                handleListAsset={handleListAsset}
                metamaskErrorsToRender={metamaskErrorsToRender}
              />
            )
          }
        </Media>
      </div>
    )
  }
}

const enhance = compose(
  withBlockchainContext,
  withMetamaskContext,
  withCivicContext,
  withKyberContext,
);

export default enhance(ListAssetPage);
