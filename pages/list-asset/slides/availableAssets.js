import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import {
  InputNumber,
  Button,
  Select,
} from "antd";
import { withAirtableContext } from 'components/AirtableContext';
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
} from 'components/CarouselSlide/';
import {
  DEFAULT_TOKEN,
} from 'constants/app';
import Earth from "static/list-asset/assetList_earth.png";
import Spin from 'static/spin.svg';
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

export const AvailableAssetsSlide = withAirtableContext(({
  handleSelectChange,
  formData,
  airtableContext,
  maxWidthDesktop,
  loadingAssets,
}) => {
  const {
    category,
    asset,
    assetValue
  } = formData;
  const {
    assetsAirTable,
    categoriesAirTable,
    getCategoriesForAssets,
  } = airtableContext;

  const categories = !loadingAssets ? (formData.userCountry && formData.userCity) && getCategoriesForAssets(formData.userCountry, formData.userCity) : {};
  const assetsAvailable = (category && categories[category]) || [];
  return (
    <CarouselSlide>
      <React.Fragment>
        {Object.keys(categories).length !== 0 || loadingAssets ? (
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
                Below is the list of assets available to you.
              </CarouselSlideParagraph>
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
              <CarouselSlideParagraph
                hasMarginTop
                isCentered
                maxWidthDesktop={maxWidthDesktop}
              >
                Selected Asset value:
              </CarouselSlideParagraph>
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
            </React.Fragment>
          )}
        </div>
      ) : (
        <div>
          <CarouselSlideMainTitle
            isLong
            isSmallMobile
            isCentered
            maxWidthDesktop={maxWidthDesktop}
          >
            No assets available
          </CarouselSlideMainTitle>
          <CarouselSlideParagraph
            isCentered
            maxWidthDesktop={maxWidthDesktop}
          >
            No assets have been found in your country.
          </CarouselSlideParagraph>
          <ButtonWrapper
            type="secondary"
            className="Slider__buttons-centered"
            onClick={() => Router.push("/explore")}
          >
            Go to Explore page
          </ButtonWrapper>
        </div>
      )}
      </React.Fragment>
    </CarouselSlide>
  );
});
