import styled, { css } from 'styled-components';
import {
  IntroSlide,
  LocationSlide,
  AvailableAssetsSlide,
  AssetLocationSlide,
  DocsSlide,
  FeesSlide,
  CollateralSlide,
  ConfirmSlideDesktop,
  SuccessSlide,
} from "./slides";
import CustomTimeline from './customTimeline';

const MAX_WIDTH_DESKTOP = "450px";

const ListAssetDesktopWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 0px auto;
  margin-top: 90px;
  max-width: 850px;

  & > ul{
   margin-left: 20px;
   width: 30%;
  }

  & > div{
    width: 60%;
  }

  ${({theme}) => theme.laptop`
    & > ul{
     margin-left: auto;
     margin-right: 50px;
     width: 40%;
    }
  `}
`

const PageTitle = styled.div`
  font-family: Gilroy;
  font-size: 32px;
  line-height: 40px;
  color: ${({theme}) => theme.colors.black};
  position: absolute;
  left: 10px;
  top: -70px;

  ${({theme}) => theme.laptop`
    left: -5px;
  `}
`

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
  goToStep,
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
    <ListAssetDesktopWrapper>
      <PageTitle>List an Asset</PageTitle>
      <CustomTimeline
        step={step}
        formData={formData}
        goToStep={goToStep}
        listedAssetId={listedAssetId}
        dev={dev}
        civic={civic}
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
        <ConfirmSlideDesktop
          formData={formData}
          isUserListingAsset={isUserListingAsset}
          listedAssetId={listedAssetId}
          maxWidthDesktop={MAX_WIDTH_DESKTOP}
          error={false || metamaskErrorsToRender.render}
          onClick={() => {
            setUserListingAsset(true);
            handleListAsset(formData, setUserListingAsset, civic.email);
          }}
        />
      )}
    </ListAssetDesktopWrapper>
  )
}

export default ListAssetDesktop;
