import {
  Col,
} from 'antd';
import AssetDefault from './AssetDefault';
import AssetTemplate from './AssetTemplate';
import AssetPortfolioInvestment from './AssetPortfolioInvestment';
import AssetPortfolioManaged from './AssetPortfolioManaged';

const Asset = (props) => {
  const {
    handleAssetFavorited,
    assetId,
    city,
    country,
    watchListed,
    type,
    withdrawInvestorProfit,
    withdrawing,
    onClickImg,
    defaultData,
  } = props;

  let AssetComponent = AssetDefault;
  let colSize = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 6,
  };
  let height = '196px';
  let margin = '0px 10px 20px 10px';

  if(type === "portfolioInvestment"){
    AssetComponent = AssetPortfolioInvestment;
     colSize = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8,
    };
    height = '187px';
    margin = '0px 15px 20px 15px';
  } else if(type === 'portfolioManaged'){
    AssetComponent = AssetPortfolioManaged;
     colSize = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8,
    };
    height = '187px';
    margin = '0px 15px 20px 15px';
  }

  const {
    name,
    imageSrc,
  } = defaultData;

  return(
    <Col {...colSize} key={`${assetId}-${type}`}>
      <AssetTemplate
        backgroundImage={imageSrc}
        handleAssetFavorited={handleAssetFavorited}
        assetId={assetId}
        name={name}
        city={city}
        country={country}
        watchListed={watchListed}
        height={height}
        margin={margin}
        onClickImg={onClickImg}
      >
        <AssetComponent
          {...props}
        />
      </AssetTemplate>
    </Col>
  )
}

export default Asset;
