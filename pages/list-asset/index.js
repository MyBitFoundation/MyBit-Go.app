import Router from "next/router";
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
import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
  PLATFORM_TOKEN,
  DEFAULT_TOKEN,
} from 'constants/app';
import { COOKIES } from 'constants/cookies';
import {
  IntroSlide,
  LocationSlide,
  AvailableAssetsSlide,
  AssetLocationSlide,
  DocsSlide,
  FeesSlide,
  CollateralSlide,
  ConfirmSlide,
  SuccessSlide,
} from "./slides";
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

const MAX_WIDTH_DESKTOP = "500px";

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
      countries: COUNTRIES,
      isUserListingAsset: false,
      listedAssetId: undefined,
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
      }, () => console.log(this.state))
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
              }, () => console.log(this.state));break;
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

  handleKeyDown = e => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  }

  render() {
    const {
      civic,
      metamaskContext,
      blockchainContext,
      kyberLoading,
    } = this.props;

    const {
      MYB_PLACEHOLDER,
      data,
      countries,
      categories,
      isUserListingAsset,
      listedAssetId,
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
      <CarouselWithNavigation
        redirectOnClose="/explore"
        navigationTooltips={SliderNavigationTooltips}
        onFinish={() => {}}
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        nextButtonHasArrow
        disableMovingForward
        slides={[{
          toRender: (
            <IntroSlide maxWidthDesktop={MAX_WIDTH_DESKTOP}/>
          ),
          buttons: {
            hasNextButton: true,
            hasBackButton: false,
            nextButtonText: (!dev && !civic.token) && 'Continue with Civic',
            isCivicButton: !dev && !civic.token,
            nextButtonHandler: (!dev && !civic.token) && civic.signUp,
            onSuccessMoveToNextSlide: true,
          },
        }, {
          toRender: (
            <AvailableAssetsSlide
              handleSelectChange={this.handleSelectChange}
              formData={data}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              loadingAssets={blockchainContext.loading.assets}
              handleInputChange={this.handleInputChange}
              countries={countries}
              handleDetectLocationClicked={this.handleDetectLocationClicked}
              handleCitySuggest={this.handleCitySuggest}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled: !category || !asset || !assetValue,
          }
        }, {
          toRender: (
            <AssetLocationSlide
              handleInputChange={this.handleInputChange}
              handleSelectChange={this.handleSelectChange}
              formData={data}
              countries={countries}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              handleSelectSuggest={this.handleSelectSuggest}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled:
              data.userCountry !== "" &&
              data.assetAddress1 !== "" &&
              data.assetCity !== "" &&
              data.assetProvince !== "" &&
              data.assetPostalCode !== ""
                ? false
                : true,
          }
        }, {
          toRender: (
            <DocsSlide
              fileList={fileList}
              handleFileUpload={this.handleFileUpload}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
          }
        }, {
          toRender: (
            <FeesSlide
              handleSelectChange={this.handleSelectChange}
              managementFee={managementFee}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled: managementFee !== 0 ? false : true,
          }
        }, {
          toRender:
            <CollateralSlide
              collateralSelectedToken={collateralSelectedToken}
              collateralDai={collateralDai}
              selectedToken={selectedToken}
              handleSelectedTokenChange={this.handleSelectedTokenChange}
              handleCollateralChange={this.handleCollateralChange}
              collateralPercentage={collateralPercentage}
              collateralMyb={collateralMyb}
              formData={data}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              balances={metamaskContext.user.balances}
              maxCollateralPercentage={maxCollateralPercentage}
              kyberLoading={kyberLoading}
            />
          , buttons: {
            hasNextButton: true,
            hasBackButton: true,
          }
        }, {
          toRender: listedAssetId ? (
            <SuccessSlide
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              assetId={listedAssetId}
            />
           ) : (
            <ConfirmSlide
              formData={data}
              isUserListingAsset={isUserListingAsset}
              listedAssetId={listedAssetId}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              error={false || metamaskErrorsToRender.render}
            />
          ),
          error: false || metamaskErrorsToRender.render,
          hideButtons: listedAssetId ? true : false,
          buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonText: isUserListingAsset ? 'Confirming listing' : 'Confirm Listing',
            nextButtonLoading: isUserListingAsset,
            nextButtonHandler: () => {
              this.setUserListingAsset(true);
              blockchainContext.handleListAsset(data, this.setUserListingAsset);
            },
          }
        }]}
      />
    );
  }
}

const SliderNavigationTooltips = [
  { slide: 0, tooltip: "KYC" },
  { slide: 1, tooltip: "Select Asset" },
  { slide: 2, tooltip: "Asset Location" },
  { slide: 3, tooltip: "Supporting Documents" },
  { slide: 4, tooltip: "Management Fee" },
  { slide: 5, tooltip: "Asset Collateral" },
  { slide: 6, tooltip: "Confirm Asset" }
];

const enhance = compose(
  withBlockchainContext,
  withMetamaskContext,
  withCivicContext,
  withKyberContext,
);

export default enhance(ListAssetPage);
