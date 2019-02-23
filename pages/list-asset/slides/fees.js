import styled from 'styled-components';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideInputNumber,
  StyledCarouselSlideSlider,
} from 'components/CarouselSlide/';

import {
  Slider
} from 'antd';

import Coins from "static/list-asset/assetList_coins.png";

const StyledImage = styled.img`
  position: relative;
  margin: 40px auto;
  width: 83px;
  height: 100px;
}`

const formatter = (value) => {
  return `${value}%`;
}

export const FeesSlide = ({
  maxWidthDesktop,
  handleSelectChange,
  managementFee,
}) => (
  <StyledCarouselSlide
    maxWidthDesktop={maxWidthDesktop}
  >
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Management fee
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Here you can calculate your fee for managing the asset. This fee should
      include any financial costs you expect to incur in order to keep the
      asset maintained and in full working order.
    </StyledCarouselSlideParagraph>
    <StyledImage
      src={Coins}
      alt="Earth"
    />
    <StyledCarouselSlideSlider
      isCentered
      tipFormatter={formatter}
      min={1}
      max={100}
      value={managementFee}
      onChange={value => handleSelectChange(value, "managementFee")}
      defaultValue={managementFee}
    />
    <StyledCarouselSlideInputNumber
      isCentered
      defaultValue={managementFee}
      min={1}
      max={100}
      value={managementFee}
      formatter={value => `${value}%`}
      parser={value => value.replace("%", "")}
      onChange={value => handleSelectChange(value, "managementFee")}
    />

  </StyledCarouselSlide>
);
