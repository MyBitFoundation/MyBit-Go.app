import styled from 'styled-components';
import {
  Select,
} from "antd";

import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
  StyledCarouselSlideList,
  StyledCarouselSlideInput,
  StyledCarouselSlideSelect,
} from 'components/CarouselSlide/';

import Earth from "static/list-asset/assetList_earth.png";

const StyledImage = styled.img`
  position: relative;
  margin: 10px auto;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
}`

export const LocationSlide = ({
  handleInputChange,
  handleSelectChange,
  countries,
  maxWidthDesktop,
}) => {
  return (
    <StyledCarouselSlide>
      <StyledCarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
      What’s your location?
    </StyledCarouselSlideMainTitle>
      <StyledCarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Different assets will be available to fund depending on where you are.
      </StyledCarouselSlideParagraph>
      <StyledImage
        src={Earth}
        alt="Earth"
      />
      <div className="Slider__input-container">
        <StyledCarouselSlideSelect
          isCentered
          showSearch
          placeholder="Country"
          optionFilterProp="children"
          onChange={value => handleSelectChange(value, "userCountry")}
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
          placeholder="City"
          name="userCity"
          onChange={e => handleInputChange(e)}
        />
      </div>
    </StyledCarouselSlide>
  );
};
