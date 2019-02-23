import styled from 'styled-components';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
} from 'components/CarouselSlide/';

import {
  Slider,
  InputNumber,
} from 'antd';

import { withTokenPricesContext } from 'components/TokenPrices';

import Myb from "static/list-asset/assetList_myb.png";

const StyledImage = styled.img`
  position: relative;
  margin: 40px auto;
  width: 90px;
  heght: 65px;
}`

const formatter = (value) => {
  return `${value}%`;
}

const InputsWrapper = styled.div`
  margin: 0 auto;

  .ant-slider{
    margin-bottom: 20px;
  }

  .ant-input-number{
    width: 46%;
  }

  span{
    margin: 0% 2%;
  }

  ${({theme}) => theme.tablet`
    width: 80%;
  `}
`;

export const CollateralSlide = withTokenPricesContext(({
  maxWidthDesktop,
  handleCollateralChange,
  collateralPercentage,
  collateralMyb,
  collateralDollar,
  constraints,
  formData,
  pricesContext,
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
      Asset collateral
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      MYB is used as an insurance mechanism, much like a deposit to protect
      investors' funds and incentivise proper behaviour. In this version of Go you are
      not required to deposit MYB but you will still be able to withdraw the collateral.
    </StyledCarouselSlideParagraph>
    <StyledImage
      src={Myb}
      alt="MyBit"
    />
    <InputsWrapper>
      <Slider
        tipFormatter={formatter}
        min={0}
        max={constraints.max_percentage}
        defaultValue={collateralPercentage}
        value={collateralPercentage}
        onChange={value => handleCollateralChange({selectedAmount: value, mybPrice: pricesContext.prices.mybit.price}, "percentage")}
      />
      <InputNumber
        defaultValue={collateralMyb}
        value={collateralMyb}
        step={0.1}
        precision={2}
        min={constraints.min_myb}
        max={constraints.max_myb}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={value => value.replace(/\$\s?|(,*)/g, "")}
        onChange={value => handleCollateralChange({selectedAmount: value, mybPrice: pricesContext.prices.mybit.price}, "myb")}
      />
      <span>=</span>
      <InputNumber
        defaultValue={collateralDollar}
        value={collateralDollar}
        step={0.1}
        precision={2}
        min={constraints.min_dollars}
        max={constraints.max_dollars}
        formatter={value =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={value => value.replace(/\$\s?|(,*)/g, "")}
        onChange={value => handleCollateralChange({selectedAmount: value, mybPrice: pricesContext.prices.mybit.price}, "dollar")}
      />
    </InputsWrapper>
  </StyledCarouselSlide>
));
