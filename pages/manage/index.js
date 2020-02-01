import ManageAssetModule from 'components/ManageAssetModule';
import ManageAsset from 'components/ManageAsset';
import { withRouter } from 'next/router';
import isNil from "lodash/isNil";

const ManageAssetPage = ({
  assetId,
  router,
}) => {

  if (isNil(assetId) === true) {
    assetId = router.query.id;
  }

  return (
    <ManageAssetModule
      assetId={assetId}
    >
      {props => <ManageAsset {...props}/>}
    </ManageAssetModule>
  )
};

export default withRouter(ManageAssetPage);
