import Router from "next/router";
import { compose } from 'recompose'
import {
  Button,
  Tooltip,
  Carousel,
} from "antd";
import Cookie from 'js-cookie';
import { withMetamaskContext } from 'components/MetamaskChecker';
import { withBlockchainContext } from 'components/Blockchain';
import { withCivic } from "ui/CivicContainer";
import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
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
  convertTokenAmount,
} from 'utils/helpers';

const MAX_WIDTH_DESKTOP = "500px";

const dev = process.env.NODE_ENV === 'development';

class ListAssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userCity: 'Zug',
        userCountry: 'Switzerland',
        category: 'Real Estate',
        asset: 'Co-Working Space',
        assetValue: 20000,
        assetAddress1: 'a',
        assetAddress2: 'a',
        assetCity: 'a',
        assetCountry: 'a',
        assetProvince: 'a',
        assetPostalCode: 'a',
        fileList: [],
        managementFee: 10,
        maxCollateralPercentage: 100,
        collateralPercentage: 0,
        collateralMyb: 0,
        collateralDai: 0,
        collateralSelectedToken: 0,
        partnerContractAddress: '0x4DC8346e7c5EFc0db20f7DC8Bb1BacAF182b077d',
        selectedToken: 'DAI',
      },
      countries: COUNTRIES,
      isUserListingAsset: false,
      listedAssetId: undefined,
    };
  }

  componentWillMount = () => {
    try {
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
    this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSelectedTokenChange = selectedToken => {
    const collateralDai = this.state.data.collateralDai;
    const balances = this.props.metamaskContext.user.balances;

    const convertedAmount = convertTokenAmount(selectedToken, 'DAI', balances, collateralDai)
    const collateralSelectedToken = parseFloat(convertedAmount.toFixed(2))

    this.setState({
      data: {
        ...this.state.data,
        selectedToken,
        collateralSelectedToken,
      },
    });
  }

  handleSelectChange = (value, name) => {
    if(name === 'asset'){
      const assetName = value.name;
      const asset = value.assetsAirTable.filter(assetTmp => assetTmp.name === assetName)[0];
      const {
        partnerContractAddress,
        amountToBeRaisedInUSDAirtable,
      } = asset;

      this.setState({
        data: {
          ...this.state.data,
          asset: assetName,
          assetValue: amountToBeRaisedInUSDAirtable,
          partnerContractAddress,
        }
      }, () => console.log(this.state.data.partnerContractAddress))
    } else {
      this.setState(
        {
          data: { ...this.state.data, [name]: value }
        },
        () => {
          switch(name) {
            case 'userCountry': {
              this.setState({
                data: { ...this.state.data, assetCountry: value, category: '', asset: '', assetValue: undefined, }
              });break;
            }
            default: return null;
          }
        }
      );
    }
  };

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
    let percentage, myb, dai, collateralSelectedToken, maxCollateralPercentage;

    const {
      assetValue,
      selectedToken,
    } = this.state.data;

    const {
      selectedAmount,
    } = value;

    const {
      metamaskContext,
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

      const maxInMyb = maxAmountAllowedInDai === 0 ? 0 : convertTokenAmount('MYB', 'DAI', balances, maxAmountAllowedInDai);
      const maxCollateralSelectedToken = maxAmountAllowedInDai === 0 ? 0 : parseFloat(convertTokenAmount(selectedToken, 'DAI', balances, maxAmountAllowedInDai).toFixed(2));
      switch (name) {
        case "percentage":
          percentage = selectedAmount;
          myb = parseFloat(convertTokenAmount('MYB', 'DAI', balances, maxAmountAllowedInDai * (selectedAmount / 100)).toFixed(2))
          dai = parseFloat((maxAmountAllowedInDai * (selectedAmount / 100)).toFixed(2))
          collateralSelectedToken = parseFloat(convertTokenAmount(selectedToken, 'DAI', balances, dai).toFixed(2))
          break;
        case "myb":
          myb = selectedAmount > maxInMyb ? parseFloat(maxInMyb.toFixed(2)) : selectedAmount
          percentage = parseInt((myb / maxInMyb) * 100)
          dai = (maxAmountAllowedInDai * percentage).toFixed(2)
          collateralSelectedToken = convertTokenAmount(selectedToken, 'DAI', balances, dai)
          break;
        case "selectedToken":
          collateralSelectedToken = selectedAmount > maxCollateralSelectedToken ? maxCollateralSelectedToken : parseFloat(Number(selectedAmount).toFixed(2))
          dai = parseFloat(convertTokenAmount('DAI', selectedToken, balances, collateralSelectedToken).toFixed(2))
          myb = parseFloat(convertTokenAmount('MYB', 'DAI', balances, dai).toFixed(2))
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

  render() {
    const {
      civic,
      metamaskContext,
      blockchainContext,
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
    } = this.state.data;

    const metamaskErrorsToRender = metamaskContext.metamaskErrors('');
    const loadingBalances = metamaskContext.loadingBalances;

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
          },
        }, {
          toRender: (
            <LocationSlide
              handleInputChange={this.handleInputChange}
              handleSelectChange={this.handleSelectChange}
              formData={data}
              countries={countries}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled: data.userCity !== "" && data.userCountry !== "" ? false : true,
          }
        }, {
          toRender: (
            <AvailableAssetsSlide
              handleInputChange={this.handleInputChange}
              handleSelectChange={this.handleSelectChange}
              formData={data}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled: data.category !== "" && data.asset !== "" ? false : true,
          }
        }, {
          toRender: (
            <AssetLocationSlide
              handleInputChange={this.handleInputChange}
              handleSelectChange={this.handleSelectChange}
              formData={data}
              countries={countries}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled:
              data.assetCountry !== "" &&
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
            !loadingBalances && (
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
              />
            )
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
  { slide: 1, tooltip: "Location" },
  { slide: 2, tooltip: "Select Asset" },
  { slide: 3, tooltip: "Asset Location" },
  { slide: 4, tooltip: "Supporting Documents" },
  { slide: 5, tooltip: "Management Fee" },
  { slide: 6, tooltip: "Asset Collateral" },
  { slide: 7, tooltip: "Confirm Asset" }
];

const enhance = compose(
  withBlockchainContext,
  withMetamaskContext,
  withCivic,
);

export default enhance(ListAssetPage);
