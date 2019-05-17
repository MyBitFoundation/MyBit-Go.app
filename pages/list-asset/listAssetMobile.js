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
  TermsOfServiceSlide,
} from "./slides";

const MAX_WIDTH_DESKTOP = "500px";

const ListAssetMobile = ({
  dev,
  civic,
  handleSelectChange,
  handleInputChange,
  handleCitySuggest,
  countries,
  handleDetectLocationClicked,
  loadingAssets,
  formData,
  handleFileUpload,
  handleSelectedTokenChange,
  handleCollateralChange,
  balances,
  kyberLoading,
  listedAssetId,
  isUserListingAsset,
  setUserListingAsset,
  handleListAsset,
  metamaskErrorsToRender,
  handleSelectSuggest,
  setReadTOS,
  readTOS,
}) => {
  const {
    category,
    asset,
    assetValue,
    userCountry,
    assetAddress1,
    assetCity,
    assetProvince,
    assetPostalCode,
    managementFee,
    collateralSelectedToken,
    collateralDai,
    selectedToken,
    collateralPercentage,
    collateralMyb,
    fileList,
    maxCollateralPercentage,
  } = formData;

  return (
    <CarouselWithNavigation
      redirectOnClose="/explore"
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
            handleSelectChange={handleSelectChange}
            formData={formData}
            maxWidthDesktop={MAX_WIDTH_DESKTOP}
            loadingAssets={loadingAssets}
            handleInputChange={handleInputChange}
            countries={countries}
            handleDetectLocationClicked={handleDetectLocationClicked}
            handleCitySuggest={handleCitySuggest}
          />
        ), buttons: {
          hasNextButton: true,
          hasBackButton: true,
          nextButtonDisabled: !category || !asset || !assetValue,
        }
      }, {
        toRender: (
          <AssetLocationSlide
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            formData={formData}
            countries={countries}
            maxWidthDesktop={MAX_WIDTH_DESKTOP}
            handleSelectSuggest={handleSelectSuggest}
          />
        ), buttons: {
          hasNextButton: true,
          hasBackButton: true,
          nextButtonDisabled:
            userCountry !== "" &&
            assetAddress1 !== "" &&
            assetCity !== "" &&
            assetProvince !== "" &&
            assetPostalCode !== ""
              ? false
              : true,
        }
      }, {
        toRender: (
          <DocsSlide
            fileList={fileList}
            handleFileUpload={handleFileUpload}
            maxWidthDesktop={MAX_WIDTH_DESKTOP}
          />
        ), buttons: {
          hasNextButton: true,
          hasBackButton: true,
        }
      }, {
        toRender: (
          <FeesSlide
            handleSelectChange={handleSelectChange}
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
            handleSelectedTokenChange={handleSelectedTokenChange}
            handleCollateralChange={handleCollateralChange}
            collateralPercentage={collateralPercentage}
            collateralMyb={collateralMyb}
            formData={formData}
            maxWidthDesktop={MAX_WIDTH_DESKTOP}
            balances={balances}
            maxCollateralPercentage={maxCollateralPercentage}
            kyberLoading={kyberLoading}
          />
        , buttons: {
          hasNextButton: true,
          hasBackButton: true,
        }
      },
        !readTOS ? {
          toRender: (
            <TermsOfServiceSlide
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              onClick={setReadTOS}
            />
          ),
          buttons: {
            hasNextButton: true,
            hasBackButton: true,
            nextButtonText: 'I agree',
            nextButtonHandler: () => {
              setReadTOS();
            },
          }
        } : {
          toRender: listedAssetId ? (
            <SuccessSlide
              maxWidthDesktop={MAX_WIDTH_DESKTOP}
              assetId={listedAssetId}
            />
           ) : (
            <ConfirmSlide
              formData={formData}
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
              setUserListingAsset(true);
              handleListAsset(formData, setUserListingAsset, civic.email);
            },
          }
        }
      ]}
    />
  )
}

export default ListAssetMobile;
