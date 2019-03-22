import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideTooltip,
} from 'components/CarouselSlide/';

import {
  Slider,
  InputNumber,
} from 'antd';

import Myb from "static/list-asset/assetList_myb.png";

const Image = styled.img`
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

export const CollateralSlide = ({
  maxWidthDesktop,
  handleCollateralChange,
  collateralPercentage,
  collateralMyb,
  collateralDollar,
  constraints,
  formData,
}) => (
  <CarouselSlide
    maxWidthDesktop={maxWidthDesktop}
  >
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      <React.Fragment>
        Asset collateral
        <CarouselSlideTooltip
          title="Assets with a high collateral are more likely to get funded."
        />
      </React.Fragment>
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      MYB is used as an insurance mechanism, much like a deposit to protect
      investors' funds and incentivise proper behaviour. In this version of Go you are
      not required to deposit MYB but you will still be able to withdraw the collateral.
    </CarouselSlideParagraph>
    <Image
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
        onChange={value => handleCollateralChange({selectedAmount: value}, "percentage")}
      />
      <InputNumber
        defaultValue={collateralPercentage}
        value={collateralPercentage}
        step={0.1}
        precision={2}
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
        onChange={value => handleCollateralChange({selectedAmount: value}, "percentage")}
      />
      <span>=</span>
      <InputNumber
        defaultValue={collateralMyb}
        value={collateralMyb}
        step={0.1}
        precision={2}
        min={constraints.min_myb}
        max={constraints.max_myb}
        formatter={value =>
          `MYB ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={value => value.replace(/MYB\s?|(,*)/g, "")}
        onChange={value => handleCollateralChange({selectedAmount: value}, "myb")}
      />
    </InputsWrapper>
  </CarouselSlide>
);
