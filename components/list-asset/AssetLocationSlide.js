import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideInput,
  CarouselSlideSelect,
  CarouselNextButton,
} from 'components/CarouselSlide/';
import GoogleAutoComplete from 'ui/GoogleAutoComplete';
const { publicRuntimeConfig } = process.env;

const AssetLocationSlide = ({
  maxWidthDesktop,
  handleInputChange,
  formData,
  countries,
  handleSelectSuggest,
  desktopMode,
  onClick,
  nextButtonDisabled,
}) => {
  const {
    userCountry,
    searchAddress1,
    assetAddress1,
    assetAddress2,
    assetCity,
    assetProvince,
    assetPostalCode,
    countryCode,
  } = formData;
  return (
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
      hasBoxShadow={desktopMode}
      desktopMode={desktopMode}
    >
      <CarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Asset location?
      </CarouselSlideMainTitle>
      <CarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        This is where your asset is going to be once fully funded.
      </CarouselSlideParagraph>
      <GoogleAutoComplete
        apiKey={publicRuntimeConfig.GOOGLE_PLACES_API_KEY}
        input={searchAddress1}
        countryCode={countryCode}
        onSelectSuggest={handleSelectSuggest}
      >
        <CarouselSlideInput
          isCentered
          placeholder="Address Line 1"
          name="assetAddress1"
          onChange={e => handleInputChange(e)}
          value={assetAddress1}
        />
      </GoogleAutoComplete>
      <CarouselSlideInput
        isCentered
        placeholder="Address Line 2"
        name="assetAddress2"
        onChange={e => handleInputChange(e)}
        value={assetAddress2}
      />
      <CarouselSlideInput
        isCentered
        placeholder="City/Town"
        name="assetCity"
        onChange={e => handleInputChange(e)}
        value={assetCity}
      />
      <CarouselSlideSelect
        isCentered
        showSearch
        value={userCountry}
        disabled={true}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
          0
        }
      >
        {countries.map(country => (
          <Option key={country} value={country}>
            {country}
          </Option>
        ))}
      </CarouselSlideSelect>
      <CarouselSlideInput
        isCentered
        placeholder="Province/Region"
        name="assetProvince"
        onChange={e => handleInputChange(e)}
        value={assetProvince}
      />
      <CarouselSlideInput
        isCentered
        placeholder="Postal Code"
        name="assetPostalCode"
        onChange={e => handleInputChange(e)}
        value={assetPostalCode}
      />
      {desktopMode && (
        <CarouselNextButton
          onClick={onClick}
          disabled={false}
          desktopMode={desktopMode}
        />
      )}
    </CarouselSlide>
  )
};

export default AssetLocationSlide;
