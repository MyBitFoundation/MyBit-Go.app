import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import {
  InputNumber,
  Button,
  Select,
} from "antd";
import { withAirtableContext } from 'components/AirtableContext';
import getConfig from 'next/config';
import GoogleAutoComplete from 'ui/GoogleAutoComplete';
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
const { publicRuntimeConfig } = getConfig();

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
  color: ${({theme}) => theme.colors.blueMain};
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
    color: ${({theme}) => theme.colors.blackish};
    font-weight: 500;
  }
`

export const AvailableAssetsSlide = withAirtableContext(({
  handleSelectChange,
  formData,
  airtableContext,
  maxWidthDesktop,
  loadingAssets,
  handleDetectLocationClicked,
  countries,
  handleInputChange,
  handleCitySuggest,
  desktopMode,
  onClick,
  nextButtonDisabled,
}) => {
  const {
    category,
    asset,
    assetValue,
    userCity,
    userCountry,
    searchCity,
    countryCode,
  } = formData;

  const {
    assetsAirTable,
    categoriesAirTable,
    getCategoriesForAssets,
  } = airtableContext;

  let areAssetsAvailable = true;
  let categories = {};
  let assetsAvailable = [];
  if(userCountry && userCity && !loadingAssets){
    categories = getCategoriesForAssets(userCountry, userCity);
    assetsAvailable = (category && categories[category]) || [];
    areAssetsAvailable = Object.keys(categories).length > 0;
  }

  return (
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
      hasBoxShadow={desktopMode}
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
                  style={{marginTop: '60px'}}
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
              <DetectLocation onClick={handleDetectLocationClicked}>Detect Your Location</DetectLocation>
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
                <GoogleAutoComplete
                  apiKey={publicRuntimeConfig.GOOGLE_PLACES_API_KEY}
                  input={searchCity}
                  countryCode={countryCode}
                  onSelectSuggest={handleCitySuggest}
                >
                  <CarouselSlideInput
                    isCentered
                    placeholder="City"
                    name="userCity"
                    onChange={e => handleInputChange(e)}
                    value={userCity}
                    disabled={!userCountry}
                  />
                </GoogleAutoComplete>
              </div>
              <p style={{textAlign: 'center'}}>
                {(!userCountry || !userCity)
                  ? 'The list of assets available to you will be shown below'
                    : areAssetsAvailable
                  ? 'Below is the list of assets available to you.'
                    : ''
                }
              </p>
              {(areAssetsAvailable && userCountry && userCity) && (
                <React.Fragment>
                  <CarouselSlideSelect
                    isCentered
                    showSearch
                    placeholder="Asset Category"
                    optionFilterProp="children"
                    onChange={value => handleSelectChange(value, "category")}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Object.keys(categories).map(cat => (
                        <Select.Option key={cat} value={cat}>
                          {cat}
                        </Select.Option>
                      ))}
                  </CarouselSlideSelect>
                  <CarouselSlideSelect
                    isCentered
                    showSearch
                    placeholder="Available Assets"
                    onChange={value => handleSelectChange({name: value, assetsAirTable}, "asset")}
                    value={asset}
                  >
                    {assetsAvailable.map(asset => {
                      return (
                        <Select.Option key={asset.name} value={asset.name}>
                          {asset.name}
                        </Select.Option>
                      )}
                    )}
                  </CarouselSlideSelect>
                  <SelectedAssetValueLabel>Selected Asset value:</SelectedAssetValueLabel>
                  <CarouselSlideInputNumber
                    isCentered
                    disabled
                    placeholder="Funding Goal"
                    name="assetValue"
                    value={assetValue}
                    formatter={value =>
                     !value ? 'Funding Goal' : `${value} ${DEFAULT_TOKEN}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  />
                  {desktopMode && (
                    <CarouselNextButton
                      onClick={onClick}
                      disabled={nextButtonDisabled}
                    />
                  )}
                </React.Fragment>
              )}
              {!areAssetsAvailable && (
                <NoResults>
                  <ThinkingIcon />
                  <p>No Assets Available Yet</p>
                  <p>Looks like your region is not yet available</p>
                </NoResults>
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    </CarouselSlide>
  );
});
