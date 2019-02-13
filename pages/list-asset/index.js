import { withRouter } from "next/router";
import {
  Button,
  Tooltip,
  Carousel,
} from "antd";

import { withCivic } from "ui/CivicContainer";
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
} from 'constants';
import CarouselWithNavigation from 'ui/CarouselWithNavigation';
import {
  IntroSlide,
} from "./slides";

class ListAssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
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

  next() {
    this.carousel.next();
    this.getCurrentSlide();
  }

  previous() {
    this.carousel.prev();
    this.getCurrentSlide();
  }

  goToSlide(number) {
    this.carousel.goTo(number, false);
    this.getCurrentSlide();
  }

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
    } = this.props;

    console.log("Civic: ", IntroSlide)

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

    return (
      <CarouselWithNavigation
        navigationTooltips={SliderNavigationTooltips}
        onFinish={() => {}}
        maxWidthDesktop="500px"
        nextButtonHasArrow
        slides={[{
          toRender: (
            <IntroSlide />
          ),
          buttons: {
            hasNextButton: true,
            hasBackButton: false,
            nextButtonText: !civic.token ? 'Continue with Civic' : 'Next',
            isCivicButton: !civic.token,
            nextButtonHandler: !civic.token ? civic.signUp : this.next,
          },
        }]}
      />
    );
  }
}

const SliderNavigationTooltips = [
  { slide: 0, tooltip: "KYC" },
];

export default withRouter(withCivic(ListAssetPage));
