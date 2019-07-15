import { memo } from 'react';
import {
  Col,
} from 'antd';
import AssetDefault from './AssetDefault';
import AssetTemplate from './AssetTemplate';
import AssetPortfolioInvestment from './AssetPortfolioInvestment';
import AssetPortfolioManaged from './AssetPortfolioManaged';
import {
  PortfolioTypes,
} from 'constants/portfolioTypes';

const DEFAULT_ASSET_HEIGHT = '196px';
const DEFAULT_ASSET_MARGIN = '0px 10px 20px 10px';
const DEFAULT_ASSET_COL_SIZE = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 6,
};

const PORTFOLIO_ASSET_HEIGHT = '187px';
const PORTFOLIO_ASSET_MARGIN = '0px 15px 20px 15px';
const PORTFOLIO_ASSET_COL_SIZE = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
};

const MANAGED_ASSET_HEIGHT = '187px';
const MANAGED_ASSET_MARGIN = '0px 15px 20px 15px';
const MANAGED_ASSET_COL_SIZE = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
};

export const ManagedAsset = props => (
  <Asset
    colSize={MANAGED_ASSET_COL_SIZE}
    height={MANAGED_ASSET_HEIGHT}
    margin={MANAGED_ASSET_MARGIN}
    toRender={AssetPortfolioManaged}
    {...props}
  />
)

export const PortfolioAsset = props => (
  <Asset
    colSize={PORTFOLIO_ASSET_COL_SIZE}
    height={PORTFOLIO_ASSET_HEIGHT}
    margin={PORTFOLIO_ASSET_MARGIN}
    toRender={AssetPortfolioInvestment}
    {...props}
  />
)

export const DefaultAsset = props => (
  <Asset
    colSize={DEFAULT_ASSET_COL_SIZE}
    height={DEFAULT_ASSET_HEIGHT}
    margin={DEFAULT_ASSET_MARGIN}
    toRender={AssetDefault}
    {...props}
  />
)

const Asset = memo(props => {
  const {
    assetId,
    model,
    colSize,
    toRender: ToRender,
  } = props;
  const {
    imageSrc,
    name,
  } = model;

  return (
    <Col {...colSize} key={assetId}>
      <AssetTemplate
        backgroundImage={imageSrc}
        name={name}
        {...props}
      >
        <ToRender
          {...props}
        />
      </AssetTemplate>
    </Col>
  )
})
