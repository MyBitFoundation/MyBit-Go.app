import styled from 'styled-components';
import {
  InputNumber
} from "antd";
import { withAirtableContext } from 'components/Airtable';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
  StyledCarouselSlideList,
  StyledCarouselTooltip,
  StyledCarouselSlideInput,
  StyledCarouselSlideSelect,
  StyledCarouselSlideInputNumber,
} from 'components/CarouselSlide/';

import Earth from "static/list-asset/assetList_earth.png";

const StyledImage = styled.img`
  position: relative;
  margin: 10px auto;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
}`

export const AvailableAssetsSlide = withAirtableContext(({
  handleSelectChange,
  formData,
  history,
  airtableContext,
  maxWidthDesktop,
}) => {
  const { category, asset } = formData;
  const {
    assetsAirTable,
    categoriesAirTable,
    getCategoriesForAssets,
  } = airtableContext;

  let forbidNext = category !== "" && asset !== "" ? false : true;
  if(!assetsAirTable || !categoriesAirTable){
    return null;
  }
  const categories = getCategoriesForAssets(formData.userCountry, formData.userCity);
  const assetValue = !asset ? 0 : assetsAirTable.filter(assetTmp => assetTmp.name === asset)[0].amountToBeRaisedInUSDAirtable;
  return (
    <StyledCarouselSlide>
        {categories.length !== 0 ? (
        <div>
          <StyledCarouselSlideMainTitle
            isLong
            isSmallMobile
            isCentered
            maxWidthDesktop={maxWidthDesktop}
          >
            Assets available
          </StyledCarouselSlideMainTitle>
          <StyledCarouselSlideParagraph
            isCentered
            maxWidthDesktop={maxWidthDesktop}
          >
            Below is the list of assets available to you.
          </StyledCarouselSlideParagraph>
          <StyledCarouselSlideSelect
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
            {categories.map(cat => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
          </StyledCarouselSlideSelect>
          <StyledCarouselSlideSelect
            isCentered
            showSearch
            placeholder="Available Assets"
            optionFilterProp="children"
            onChange={value => handleSelectChange({name: value, assetsAirTable}, "asset")}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {assetsAirTable.filter(asset => asset.category === category).map(asset => {
              return (
                <Option key={asset.name} value={asset.name}>
                  {asset.name}
                </Option>
              )}
            )}
          </StyledCarouselSlideSelect>
          <StyledCarouselSlideParagraph
            hasMarginTop
            isCentered
            maxWidthDesktop={maxWidthDesktop}
          >
            Selected Asset value:
          </StyledCarouselSlideParagraph>
          <StyledCarouselSlideInputNumber
            isCentered
            disabled
            placeholder="Funding Goal"
            name="assetValue"
            value={assetValue}
            formatter={value =>
             `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={value => value.replace(/\$\s?|(,*)/g, "")}
            onChange={value => handleSelectChange(value, "assetValue")}
          />
        </div>
      ) : (
        <div>
          <h1 className="Slider__header">No assets</h1>
          <p className="Slider__note">
            No assets have been found in your country.
          </p>
          <div className="Slider__buttons">
            <Button
              type="secondary"
              className="Slider__buttons-centered"
              onClick={() => history.push("/explore")}
            >
              Go to Explore page
            </Button>
          </div>
        </div>
      )}
    </StyledCarouselSlide>
  );
});
