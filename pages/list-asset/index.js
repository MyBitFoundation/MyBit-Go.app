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
        managementFee: 0,
        collateralPercentage: 0,
        collateralMyb: 0,
        collateralDollar: 0,
        partnerContractAddress: '0x4DC8346e7c5EFc0db20f7DC8Bb1BacAF182b077d',
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
    let percentage, dollar, myb;
    const { assetValue } = this.state.data;
    const {
      selectedAmount,
      mybPrice,
    } = value;
    switch (name) {
      case "percentage":
        percentage = selectedAmount;
        dollar = (percentage / 100) * assetValue;
        myb = dollar / mybPrice;
        break;
      case "myb":
        myb = selectedAmount;
        dollar = mybPrice * myb;
        percentage = parseInt((dollar / assetValue) * 100);
        break;
      case "dollar":
        dollar = selectedAmount;
        myb = dollar / mybPrice;
        percentage = parseInt((dollar / assetValue) * 100);
        break;
      default: return null;
    }
    this.setState(
      {
        data: {
          ...this.state.data,
          collateralDollar: dollar,
          collateralMyb: myb,
          collateralPercentage: percentage
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
      collateralDollar,
      collateralMyb,
      collateralPercentage,
      assetValue,
      fileList,
    } = this.state.data;

    const metamaskErrorsToRender = metamaskContext.metamaskErrors('');

    console.log(metamaskErrorsToRender)

    console.log("render method: ", metamaskErrorsToRender.render)

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
          toRender: (
            <CollateralSlide
              handleCollateralChange={this.handleCollateralChange}
              collateralDollar={
                typeof collateralDollar === "string" ? 0 : collateralDollar
              }
              collateralPercentage={collateralPercentage}
              collateralMyb={
                typeof collateralMyb === "string" ? 0 : collateralMyb
              }
              constraints={{
                max_percentage: 100,
                min_myb: 0,
                max_myb: assetValue / MYB_PLACEHOLDER,
                min_dollars: 0,
                max_dollars: assetValue
              }}
              formData={data}
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled: collateralMyb !== 0 ? false : true,
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
