import { withRouter } from "next/router";
import {
  Button,
  Tooltip,
  Carousel,
} from "antd";

import { withMetamaskContext } from 'components/MetamaskChecker';
import { withBlockchainContext } from 'components/Blockchain';
import { withCivic } from "ui/CivicContainer";
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
} from 'constants';

import CarouselWithNavigation from 'ui/CarouselWithNavigation';

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
import metamaskErrors from 'utils/metamaskErrors';

const dev = process.env.NODE_ENV === 'development';

class ListAssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.setUserListingAsset = this.setUserListingAsset.bind(this);

    this.state = {
      currentSlide: 0,
      maximumAllowedSlide: 1,
      data: {
        userCity: '',
        userCountry: '',
        category: '',
        asset: '',
        assetAddress1: '',
        assetAddress2: '',
        assetCity: '',
        assetCountry: '',
        assetProvince: '',
        assetPostalCode: '',
        fileList: [],
        managementFee: 0,
        collateralPercentage: 0,
        collateralMyb: 0,
        collateralDollar: 0
      },
      countries: COUNTRIES,
      isUserListingAsset: false,
      listedAssetId: undefined,
    };
  }

  componentDidMount(){
    this.ismounted = true;
  }

  componentWillUnmount() {
     this.ismounted = false;
  }

  setUserListingAsset(isUserListingAsset, listedAssetId){
    if(!this.ismounted){
      return;
    }
    this.setState({
      isUserListingAsset,
      listedAssetId,
    })
  }

  getCurrentSlide = () => {
    setTimeout(() => {
      let activeSlide = parseInt(
        document
          .getElementsByClassName("slick-current")[0]
          .getAttribute("data-index")
      );
      this.setState({ currentSlide: activeSlide });
    }, 25);
  };

  handleInputChange = e => {
    this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSelectChange = (value, name) => {
    if(name === 'asset'){
      const assetName = value.name;
      const assetValue = value.assetsAirTable.filter(assetTmp => assetTmp.name === assetName)[0].amountToBeRaisedInUSDAirtable
      this.setState({
        data: {
          ...this.state.data,
          asset: assetName,
          assetValue,
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
              this.setState({
                data: { ...this.state.data, assetCountry: value, category: '', asset: '' }
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
      currentSlide,
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

    const {
      userHasMetamask,
      extensionUrl,
      userIsLoggedIn,
      network,
      privacyModeEnabled,
    } = metamaskContext;

    const metamaskErrorsToRender = metamaskErrors('', userHasMetamask, extensionUrl, userIsLoggedIn, network, privacyModeEnabled);

    return (
      <CarouselWithNavigation
        navigationTooltips={SliderNavigationTooltips}
        onFinish={() => {}}
        maxWidthDesktop="500px"
        nextButtonHasArrow
        slides={[{
          toRender: (
            <IntroSlide maxWidthDesktop="500px"/>
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
              maxWidthDesktop="500px"
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
              maxWidthDesktop="500px"
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
              maxWidthDesktop="500px"
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
              maxWidthDesktop="500px"
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
              maxWidthDesktop="500px"
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
              maxWidthDesktop="500px"
            />
          ), buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonDisabled: collateralMyb !== 0 ? false : true,
          }
        }, {
          toRender: listedAssetId ? (
            <SuccessSlide
              formData={data}
              maxWidthDesktop="500px"
              error={metamaskErrorsToRender}
              assetId={listedAssetId}
            />
           ) : (
            <ConfirmSlide
              formData={data}
              isUserListingAsset={isUserListingAsset}
              listedAssetId={listedAssetId}
              maxWidthDesktop="500px"
              error={metamaskErrorsToRender}
            />
          ),
          error: metamaskErrorsToRender,
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

export default withBlockchainContext(withMetamaskContext(withRouter(withCivic(ListAssetPage))));
