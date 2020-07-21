import ManageAssetModule from 'components/ManageAssetModule';
import ManageAsset from 'components/ManageAsset';

const ManageAssetPage = ({
  assetId,
}) => (
    <ManageAssetModule
      assetId={assetId}
    >
      {props => <ManageAsset {...props} />}
    </ManageAssetModule>
  );

export const getInitialProps = ctx => ({ props: { assetId: ctx.query.id } });

export default ManageAssetPage;
