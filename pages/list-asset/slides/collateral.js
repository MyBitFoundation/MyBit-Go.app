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
import {
  convertTokenAmount,
} from 'utils/helpers';
import Myb from "static/list-asset/assetList_myb.png";
import { withMetamaskContext } from 'components/MetamaskChecker';
import TokenSelector from 'components/TokenSelector';
import NumericInput from 'ui/NumericInput';
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

  span{
    margin: 0% 2%;
  }

  ${({theme}) => theme.tablet`
    width: 90%;
  `}
`;

const Separator = styled.span`
  position: relative;
  top: 5px;
  left: 5px;
`

const MybitInput = styled.div`
  width: 46%;
  display: inline-block;
`
const TokenSelectorWrapper = styled.div`
  width: 46%;
  display: inline-block;

  button{
    background-color: transparent;
    border: none;
    height: auto;
    padding: 0px 5px;

    .anticon {
      margin: 0px 3px;
    }
  }

  .ant-input-group-addon{
    padding: 0px 0px;
  }
`

export const CollateralSlide = ({
  maxWidthDesktop,
  handleCollateralChange,
  collateralPercentage,
  collateralMyb,
  collateralDai,
  formData,
  handleSelectedTokenChange,
  selectedToken,
  balances,
  maxCollateralPercentage,
  collateralSelectedToken,
}) => {
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
          max={maxCollateralPercentage}
          defaultValue={collateralPercentage}
          value={collateralPercentage}
          onChange={value => handleCollateralChange({selectedAmount: value}, "percentage")}
        />
        <MybitInput>
          <NumericInput
            defaultValue={collateralMyb}
            value={collateralMyb}
            min={0}
            label="MYB"
            onChange={value => handleCollateralChange({selectedAmount: value}, "myb")}
            precision={2}
          />
        </MybitInput>
        <Separator>=</Separator>
        <TokenSelectorWrapper>
          <NumericInput
            defaultValue={collateralSelectedToken}
            value={collateralSelectedToken}
            min={0}
            precision={2}
            label={
              <TokenSelector
                balances={balances}
                amountToPay={collateralDai}
                onChange={handleSelectedTokenChange}
              />
            }
            onChange={value => handleCollateralChange({selectedAmount: value}, "selectedToken")}
          />

        </TokenSelectorWrapper>
      </InputsWrapper>
    </CarouselSlide>
  )}
