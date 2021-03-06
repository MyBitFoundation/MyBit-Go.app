import Router from 'next/router';
import Media from 'react-media';
import BN from 'bignumber.js';
import { compose } from 'recompose';
import { Button, Tooltip, Carousel } from 'antd';
import getConfig from 'next/config';
import Cookie from 'js-cookie';
import { withMetamaskContextPageWrapper } from 'components/MetamaskContext';
import { withBlockchainContext } from 'components/BlockchainContext';
import { withKyberContext } from 'components/KyberContext';
import { withTermsOfServiceContext } from 'components/TermsOfServiceContext';
import { withAssetsContext } from 'components/AssetsContext';
import ListAssetMobile from './listAssetMobile';
import ListAssetDesktop from './listAssetDesktop';
import getTokenWithSufficientBalance from 'constants/getTokenWithSufficientBalance';
import {
  COUNTRIES,
  MAX_FILES_UPLOAD,
  MAX_FILE_SIZE,
  getPlatformToken,
  DEFAULT_TOKEN,
  getPlatformTokenContract,
  LISTING_FEE_IN_DEFAULT_TOKEN,
  MINIMUM_COLLATERAL_IN_DEFAULT_TOKEN,
} from 'constants/app';
import { COOKIES } from 'constants/cookies';
import {
  convertFromPlatformToken,
  convertFromDefaultToken,
  convertFromTokenToDefault,
  formatValueForToken,
} from 'utils/helpers';
import { processLocationData } from 'utils/locationData';
import getCountry from 'utils/countryCodes';
import { calculateSlippage } from 'constants/calculateSlippage';
import { FIAT_TO_CRYPTO_CONVERSION_FEE } from 'constants/platformFees';

const dev = process.env.NODE_ENV === 'development';
BN.config({ EXPONENTIAL_AT: 80 });

class ListAssetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fileList: [],
        coverPicture: null,
        managementFee: 0,
        collateralInPlatformToken: 0,
        partnerContractAddress: '',
        assetValue: '',
        escrow: 0,
        asset: '', // asset name
        cryptoPurchase: true,
      },
      isUserListingAsset: false,
      listedAssetId: undefined,
      step: 0,
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
          as: '/list-asset',
        });
      }
    } catch (err) {
      console.error(err);
    }
    this.ismounted = true;
  };

  componentWillUnmount = () => {
    this.ismounted = false;
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // debugger;
    if (prevState.data.collateralInPlatformToken !== this.state.data.collateralInPlatformToken
      || prevState.data.selectedToken !== this.state.data.selectedToken) {
      this.fetchSlippageRates();
    }
  }

  fetchSlippageRates = async () => {
    const { network, user: { balances } } = this.props.metamaskContext;
    this.setState({ loadingConversionInfo: true });
    const PLATFORM_TOKEN_CONTRACT = getPlatformTokenContract(network);

    const { paymentInDefaultToken } = this.calculateCollateral();

    const slippagePercentages = await calculateSlippage(balances, PLATFORM_TOKEN_CONTRACT, paymentInDefaultToken, false)
      .finally(() => this.setState({ loadingConversionInfo: false }));
    this.setState({ tokenSlippagePercentages: slippagePercentages });
  }

  setUserListingAsset = (isUserListingAsset, listedAssetId) => {
    if (!this.ismounted) {
      return;
    }
    this.setState({
      isUserListingAsset,
      listedAssetId,
    });
  };

  handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      if (name === 'userCity') {
        if (value === '' || new RegExp(/^[a-zA-Z ]+$/i).test(value)) { // check if value is only alphabetical letters.
          this.setState({
            data: { ...this.state.data, searchCity: value, userCity: value },
          });
        }
      } else if (name === 'assetValue') {
        if (value === '' || new RegExp(/^[0-9]+$/i).test(value)) {
          this.setState({
            data: { ...this.state.data, assetValue: value },
          });
        }
      } else if (name === 'collateralInPlatformToken') {
        this.setState({
          data: { ...this.state.data, collateralInPlatformToken: +value },
        });
      } else {
        this.setState({
          data: { ...this.state.data, [name]: value },
        });
      }
    }
  };

  handleSelectedTokenChange = (selectedToken) => {
    this.setState({ data: { ...this.state.data, selectedToken } });
  };

  calculateCollateral = () => {
    const {
      assetsContext, metamaskContext, supportedTokensInfo,
    } = this.props;
    const { assetManagers } = assetsContext;
    const { collateralInPlatformToken } = this.state.data;
    const { assetValue: fundingGoal = 0 } = this.state.data;
    // const cryptoPayout = true;
    const cryptoPurchase = true;

    let assetValue = BN(fundingGoal);
    // Add 8% fee if it applies and AM expenses
    const fiatToCryptoFee = !cryptoPurchase
      ? assetValue.times(FIAT_TO_CRYPTO_CONVERSION_FEE).toNumber()
      : 0;
    assetValue = assetValue
      .plus(fiatToCryptoFee)
      .toNumber();

    const { selectedToken } = this.state.data;
    const { user, network } = metamaskContext;
    const { balances } = user;
    const totalFundedAssets = assetManagers[user.address]
      ? assetManagers[user.address].totalFundedAssets
      : 0;
    const paymentTokenAddress = selectedToken
    && balances
    && balances[selectedToken]
    && balances[selectedToken].contractAddress;

    const paymentInDefaultToken = convertFromPlatformToken(DEFAULT_TOKEN, supportedTokensInfo, collateralInPlatformToken, network) + LISTING_FEE_IN_DEFAULT_TOKEN;

    const paymentInSelectedToken = convertFromDefaultToken(
      selectedToken || DEFAULT_TOKEN,
      supportedTokensInfo,
      LISTING_FEE_IN_DEFAULT_TOKEN,
    ) + convertFromPlatformToken(
      selectedToken || DEFAULT_TOKEN,
      supportedTokensInfo,
      collateralInPlatformToken,
      network,
    );

    const PLATFORM_TOKEN = getPlatformToken(network);
    const minimumCollateralInPlatformToken = convertFromDefaultToken(PLATFORM_TOKEN, supportedTokensInfo, MINIMUM_COLLATERAL_IN_DEFAULT_TOKEN);

    return {
      paymentInDefaultToken,
      paymentInSelectedToken,
      totalFundedAssets,
      paymentTokenAddress,
      minimumCollateralInPlatformToken,
    };
  }

  handleSelectChange = (value, name) => {
    this.setState(
      {
        data: { ...this.state.data, [name]: value },
      },
      () => {
        switch (name) {
          case 'userCountry':
            const countryData = getCountry(value);
            const countryCode = countryData
              ? countryData.iso2.toLowerCase()
              : '';

            this.setState({
              data: {
                ...this.state.data,
                countryCode,
                userCity: '',
              },
            });
            break;
          default:
            return null;
        }
      },
    );
  };

  handleCitySuggest = (suggest) => {
    const locationData = processLocationData(suggest.address_components, [
      'locality',
    ]);
    const { locality } = locationData;
    this.setState({
      data: {
        ...this.state.data,
        userCity: locality,
        searchCity: '',
      },
    });
  };

  handleCoverPicture = (fileInfo) => {
    if (fileInfo.file.status !== 'uploading') return;
    fileInfo.file.status = 'success';
    this.setState({
      data: { ...this.state.data, coverPicture: fileInfo.file },
    });
  }

  handleFileUpload = (filesObject) => {
    // so that we get no loading animation in the UI next to the file name
    filesObject.file.status = 'success';
    let files = filesObject.fileList;
    // apply file size restriction
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        files = files.filter(file => file !== files[i]);
        i--;
      }
    }

    // apply number of files restriction
    if (files.length > MAX_FILES_UPLOAD) {
      files = files.slice(0, MAX_FILES_UPLOAD);
    }

    this.setState({
      data: { ...this.state.data, fileList: files },
    });
  };

  goToNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  goToStep = (step) => {
    if (!this.state.listedAssetId) {
      this.setState({ step });
    }
  };

  setCheckedToS = () => this.setState(prevState => ({ checkedToS: !prevState.checkedToS }));

  render() {
    const {
      metamaskContext,
      blockchainContext,
      kyberLoading,
      ToSContext,
    } = this.props;

    const {
      handleListAsset,
      loadingAssets,
      getCategoriesForAssets,
    } = blockchainContext;

    const { user, loadingBalancesForNewUser } = metamaskContext;

    const { readToS, setReadToS } = ToSContext;

    const {
      data,
      isUserListingAsset,
      listedAssetId,
      step,
      checkedToS,
      tokenSlippagePercentages,
      autoLocationOffline,
      loadingConversionInfo,
    } = this.state;


    const {
      managementFee,
      collateralInPlatformToken,
      assetValue,
      fileList,
      selectedToken,
      asset,
      category,
      userCity,
      userCountry,
    } = this.state.data;

    const {
      paymentInDefaultToken,
      paymentInSelectedToken,
      paymentTokenAddress,
      minimumCollateralInPlatformToken,
    } = (this.props.kyberLoading && {}) || this.calculateCollateral();
    const formData = {
      ...data,
      paymentInDefaultToken,
      paymentInSelectedToken,
      paymentTokenAddress,
      minimumCollateralInPlatformToken,
    };

    const tokenWithSufficientBalance = paymentInSelectedToken > 0
      ? getTokenWithSufficientBalance(user.balances, paymentInDefaultToken)
      : undefined;

    const metamaskErrorsToRender = metamaskContext.metamaskErrors('');
    const propsToPass = {
      dev,
      step,
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
      autoLocationOffline,
      getCategoriesForAssets,
      tokenWithSufficientBalance: tokenWithSufficientBalance !== undefined,
      setCheckedToS: this.setCheckedToS,
      handleSelectChange: this.handleSelectChange,
      handleInputChange: this.handleInputChange,
      handleCitySuggest: this.handleCitySuggest,
      handleSelectedTokenChange: this.handleSelectedTokenChange,
      handleCoverPicture: this.handleCoverPicture,
      handleFileUpload: this.handleFileUpload,
      setUserListingAsset: this.setUserListingAsset,
      goToNextStep: this.goToNextStep,
      goToStep: this.goToStep,
      countries: COUNTRIES,
      formData,
      balances: user.balances,
      shouldShowToSCheckmark: this.readTermsOfService,
      airtableContext: this.props.airtableContext,
    };
    return (
      <div>
        <Media query="(min-width: 768px)">
          {matches => (matches ? (
            <ListAssetDesktop {...propsToPass} />
          ) : (
            <ListAssetMobile {...propsToPass} />
          ))
          }
        </Media>
      </div>
    );
  }
}

const enhance = compose(
  withKyberContext,
  withBlockchainContext,
  withMetamaskContextPageWrapper,
  withTermsOfServiceContext,
  withAssetsContext,
);

export default enhance(ListAssetPage);
