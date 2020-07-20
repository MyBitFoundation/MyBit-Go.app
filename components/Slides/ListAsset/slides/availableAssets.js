import React from 'react';
import styled, { css } from 'styled-components';
import Router from 'next/router';
import {
  InputNumber,
  Button,
  Select,
} from "antd";
import getConfig from 'next/config';
import AlertMessage from 'ui/AlertMessage';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideColoredSpan,
  CarouselSlideList,
  CarouselSlideTooltip,
  CarouselSlideInput,
  CarouselSlideSelect,
  CarouselSlideInputNumber,
  CarouselNextButton,
} from 'components/CarouselSlide/';
import {
  DEFAULT_TOKEN,
} from 'constants/app';
import ThinkingIcon from 'static/ic_thinking.svg';
import Spin from 'static/spin.svg';
import LabelWithTooltip from 'ui/LabelWithTooltip';

const Image = styled.img`
  position: relative;
  margin: 10px auto;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
}`

const ButtonWrapper = styled(Button)`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`

const Loading = styled(Spin)`
  display: block;
  margin: 0 auto;
  height: 32px;
  width: 32px;
`

const DetectLocation = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blueMain};
  cursor: pointer;
  width: max-content;
  margin: 0 auto;
  margin-bottom: 1rem;
`

const SelectedAssetValueLabel = styled.p`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
`

const NoResults = styled.div`
  text-align: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 50px;

  p:nth-child(2){
    margin: 0px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.blackish};
    font-weight: 500;
  }
`
const AlertMessageWrapper = styled.div`
  .ant-alert{
    padding: 8px 10px 8px 37px;
  }

  .ant-alert-message p {
    margin: 0px 0px !important;
  }

  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
`

const AssetValueContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  ${props => props.cryptoPurchase === false && css`
    ${({ theme }) => theme.mobileL`
      margin-bottom: 20px;
      flex-direction: row;
    `}

    .ant-input-number{
      width: auto;
      margin: 0px;
      width: 155px;
    }
  `}
`

export const AvailableAssetsSlide = ({
  handleSelectChange,
  formData,
  airtableContext,
  maxWidthDesktop,
  loadingAssets,
  countries,
  handleInputChange,
  handleCitySuggest,
  desktopMode,
  onClick,
  nextButtonDisabled,
  error,
  autoLocationOffline,
  getCategoriesForAssets,
}) => {
  const {
    category,
    asset,
    assetValue,
    userCity,
    userCountry,
    searchCity,
    countryCode,
    cryptoPurchase,
  } = formData;

  let areAssetsAvailable = true;
  let categories = {};
  let assetsAvailable = [];
  if (userCountry && userCity) {
    categories = getCategoriesForAssets(userCountry, userCity);
  //   assetsAvailable = (category && categories[category]) || [];
  //   areAssetsAvailable = Object.keys(categories).length > 0;
  }
  console.log(categories)

  return (
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
      hasBoxShadow={desktopMode}
      desktopMode={desktopMode}
    >
      <React.Fragment>
        <div>
          <CarouselSlideMainTitle
            isLong
            isSmallMobile
            isCentered
            maxWidthDesktop={maxWidthDesktop}
          >
            <React.Fragment>
              Assets available
              <CarouselSlideTooltip
                title="More assets will become available in the future."
              />
            </React.Fragment>
          </CarouselSlideMainTitle>
          {loadingAssets && (
            <React.Fragment>
              <CarouselSlideParagraph
                isCentered
                maxWidthDesktop={maxWidthDesktop}
                style={{ marginTop: '60px' }}
              >
                Loading assets
                </CarouselSlideParagraph>
              <Loading />
            </React.Fragment>
          )}
          {!loadingAssets && (
            <React.Fragment>
              <CarouselSlideParagraph
                isCentered
                maxWidthDesktop={maxWidthDesktop}
              >
                Different assets will be available to fund depending on where you are.
              </CarouselSlideParagraph>
              <div className="Slider__input-container">
                <CarouselSlideSelect
                  isCentered
                  showSearch
                  placeholder="Country"
                  optionFilterProp="children"
                  onChange={value => handleSelectChange(value, "userCountry")}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  value={userCountry}
                >
                  {countries.map(country => (
                    <Option key={country} value={country}>
                      {country}
                    </Option>
                  ))}
                </CarouselSlideSelect>
                <CarouselSlideInput
                  isCentered
                  placeholder="City"
                  name="userCity"
                  onChange={e => handleInputChange(e)}
                  value={userCity}
                  disabled={!userCountry}
                />

                <CarouselSlideInput
                  isCentered
                  placeholder="Asset Name"
                  name="asset"
                  onChange={e => handleInputChange(e)}
                  value={asset}
                />

                <SelectedAssetValueLabel>Selected Asset value:</SelectedAssetValueLabel>
                <AssetValueContainer cryptoPurchase={cryptoPurchase}>
                  <CarouselSlideInputNumber
                    isCentered
                    placeholder="Funding Goal"
                    name="assetValue"
                    value={assetValue}
                    onChange={e => handleInputChange(e)}
                    style={cryptoPurchase === false ? { marginRight: '10px', marginBottom: '5px' } : {}}
                  />
                  {cryptoPurchase === false && (
                    <LabelWithTooltip
                      title={'8% fiat fee incl.'}
                      tooltipText="The asset incurs an additional 8% fee on top of the total investment to cover most exchanges
                          fees in order to transfer the money into its fiat equivalent."
                      isDark
                    />
                  )}
                </AssetValueContainer>
              </div>
              {error && (
                <AlertMessageWrapper>
                  <AlertMessage
                    type="error"
                    message={error}
                    showIcon
                    closable={false}
                  />
                </AlertMessageWrapper>
              )}
              {desktopMode && (
                <CarouselNextButton
                  onClick={onClick}
                  disabled={nextButtonDisabled}
                  desktopMode={desktopMode}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    </CarouselSlide>
  );
};
