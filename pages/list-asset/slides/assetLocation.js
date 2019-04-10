import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideInput,
  CarouselSlideSelect,
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
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
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
      <CarouselSlideInput
        isCentered
        placeholder="Address Line 1"
        name="assetAddress1"
        onChange={e => handleInputChange(e)}
      />
      <CarouselSlideInput
        isCentered
        placeholder="Address Line 2"
        name="assetAddress2"
        onChange={e => handleInputChange(e)}
      />
      <CarouselSlideInput
        isCentered
        placeholder="City/Town"
        name="assetCity"
        onChange={e => handleInputChange(e)}
      />
      <CarouselSlideSelect
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
      </CarouselSlideSelect>
      <CarouselSlideInput
        isCentered
        placeholder="Province/Region"
        name="assetProvince"
        onChange={e => handleInputChange(e)}
      />
      <CarouselSlideInput
        isCentered
        placeholder="Postal Code"
        name="assetPostalCode"
        onChange={e => handleInputChange(e)}
      />
    </CarouselSlide>
  )
};
