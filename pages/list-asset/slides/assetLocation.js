import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideInput,
  StyledCarouselSlideSelect,
} from 'components/CarouselSlide/';


export const AssetLocationSlide = ({
  maxWidthDesktop,
  handleInputChange,
  formData,
  countries,
}) => {
  const {
    assetCountry,
  } = formData;

  return (
    <StyledCarouselSlide
      maxWidthDesktop={maxWidthDesktop}
    >
      <StyledCarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Asset location?
      </StyledCarouselSlideMainTitle>
      <StyledCarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        This is where your asset is going to be once fully funded.
      </StyledCarouselSlideParagraph>
      <StyledCarouselSlideInput
        isCentered
        placeholder="Address Line 1"
        name="assetAddress1"
        onChange={e => handleInputChange(e)}
      />
      <StyledCarouselSlideInput
        isCentered
        placeholder="Address Line 2"
        name="assetAddress2"
        onChange={e => handleInputChange(e)}
      />
      <StyledCarouselSlideInput
        isCentered
        placeholder="City/Town"
        name="assetCity"
        onChange={e => handleInputChange(e)}
      />
      <StyledCarouselSlideSelect
        isCentered
        showSearch
        value={assetCountry}
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
      </StyledCarouselSlideSelect>
      <StyledCarouselSlideInput
        isCentered
        placeholder="Province/Region"
        name="assetProvince"
        onChange={e => handleInputChange(e)}
      />
      <StyledCarouselSlideInput
        isCentered
        placeholder="Postal Code"
        name="assetPostalCode"
        onChange={e => handleInputChange(e)}
      />
    </StyledCarouselSlide>
  )
};
