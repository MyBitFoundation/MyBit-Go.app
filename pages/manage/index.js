import ManageAssetModule from 'components/ManageAssetModule';

class ManageAssetPage extends React.Component {
  static async getInitialProps (ctx) {
    return {assetId: ctx.query.id};
  }

  render() {
    const {
      assetId,
    } = this.props;
    return (
      <ManageAssetModule
        assetId={assetId}
      >
        {({
          loading,
          error,
          daysSinceItWentLive,
          metamaskError,
        }) => {
          return (
            <div>
              <p>is loading: {loading.toString()}</p>
              {error && <p>error: {error.type}</p>}
              {metamaskError && <p>error: {metamaskError.error}</p>}
              <p>{daysSinceItWentLive}</p>
            </div>
          )
        }}
      </ManageAssetModule>
    );
  }
};

export default ManageAssetPage;
