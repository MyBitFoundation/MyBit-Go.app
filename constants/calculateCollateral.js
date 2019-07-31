const calculateCollateralBasedOnHistory = numberOfAssets => {
  if(numberOfAssets <= 4){
    return 35;
  } else if(numberOfAssets <= 9){
    return 25;
  } else if(numberOfAssets <= 24){
    return 20;
  } else return 10;
}

const calculateCollateral = (
  numberOfAssets,
  cryptoPayout,
  cryptoPurchase,
) => {
  const collateral = calculateCollateralBasedOnHistory(numberOfAssets);
  const collateralCryptoPurchase = cryptoPurchase ? 0 : 100;
  const collateralCryptoPayouts = cryptoPayout ? 0 : collateral * 3;
  const collateralBasedOnHistory = cryptoPayout ? collateral : 0;
  return {
    collateralBasedOnHistory,
    collateralCryptoPurchase,
    collateralCryptoPayouts,
    collateralPercentage: collateralBasedOnHistory + collateralCryptoPurchase + collateralCryptoPayouts,
  }
}

export default calculateCollateral;
