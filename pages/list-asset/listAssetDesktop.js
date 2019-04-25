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
import CustomTimeline from './customTimeline';

const MAX_WIDTH_DESKTOP = "450px";

const ListAssetDesktop = ({
  step,
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
  goToNextStep,
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

  if(step === 0){
    return (
      <IntroSlide
        maxWidthDesktop="600px"
        desktopMode
        onClick={goToNextStep}
        dev={dev}
        civic={civic}
      />
    )
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '100px',
    }}>
    <CustomTimeline
      step={step}
      formData={formData}
    />
    {step === 1 && (
      <AvailableAssetsSlide
        handleSelectChange={handleSelectChange}
        formData={formData}
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        loadingAssets={loadingAssets}
        handleInputChange={handleInputChange}
        countries={countries}
        handleDetectLocationClicked={handleDetectLocationClicked}
        handleCitySuggest={handleCitySuggest}
        desktopMode
        nextButtonDisabled={!category || !asset || !assetValue}
        onClick={goToNextStep}
      />
    )}
    {step === 2 && (
      <AssetLocationSlide
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        formData={formData}
        countries={countries}
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        handleSelectSuggest={handleSelectSuggest}
        desktopMode
        nextButtonDisabled={userCountry !== "" &&
          assetAddress1 !== "" &&
          assetCity !== "" &&
          assetProvince !== "" &&
          assetPostalCode !== ""
            ? false
            : true
        }
        onClick={goToNextStep}
      />
    )}
    {step === 3 && (
      <DocsSlide
        fileList={fileList}
        handleFileUpload={handleFileUpload}
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        onClick={goToNextStep}
        desktopMode
      />
    )}
    {step === 4 && (
      <FeesSlide
        handleSelectChange={handleSelectChange}
        managementFee={managementFee}
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        onClick={goToNextStep}
        desktopMode
        nextButtonDisabled={managementFee !== 0 ? false : true}
      />
    )}
    {step === 5 && (
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
        onClick={goToNextStep}
        desktopMode
        nextButtonDisabled={managementFee !== 0 ? false : true}
      />
    )}
    {step === 6 && listedAssetId && (
      <SuccessSlide
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        assetId={listedAssetId}
        desktopMode
      />
     )}
     {step === 6 && !listedAssetId && (
      <ConfirmSlide
        formData={formData}
        isUserListingAsset={isUserListingAsset}
        listedAssetId={listedAssetId}
        maxWidthDesktop={MAX_WIDTH_DESKTOP}
        error={false || metamaskErrorsToRender.render}
        desktopMode
      />
    )}
    </div>
  )
}

export default ListAssetDesktop;
