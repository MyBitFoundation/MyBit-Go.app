import ManageAssetModule from 'components/ManageAssetModule';
import ManageAsset from 'components/ManageAsset';
import { useRouter } from 'next/router';

const ManageAssetPage = () => {
  const { query: { id: assetId } } = useRouter();
  return (
    <ManageAssetModule
      assetId={assetId}
    >
      {props => <ManageAsset {...props} />}
    </ManageAssetModule>
  );
};

export default ManageAssetPage;
