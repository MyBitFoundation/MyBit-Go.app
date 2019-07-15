import {
  Row,
} from 'antd';
import NoResults from 'components/NoResults';
import Pagination from './pagination';

const assetsPerPage = 12;

class AssetDisplayer extends React.Component{
  state = {
    currentPage: 0,
  }

  componentWillReceiveProps = (nextProps) => {
    //resets pagination if the data changed and we don't have assets to show
    // due to the page we're on
    if((this.state.currentPage + 1) * assetsPerPage > nextProps.assets.length){
      this.setState({
        currentPage: 0,
      });
    }
  }

  render = () => {
    const {
      type,
      assets,
      handleAssetFavorited,
      assetToRender: AssetToRender,
    } = this.props;

    const {
      currentPage,
    } = this.state;

    // slice results for pagination
    const startIndex = currentPage * assetsPerPage;
    const endIndex = (currentPage + 1) * assetsPerPage;
    const assetsToDisplay = assets.slice(startIndex, endIndex);
    const shouldMakeImgClickable = type === 'default';

    return (
      <React.Fragment>
        <Row>
          {assetsToDisplay.map(asset => (
            <AssetToRender
              {...asset}
              handleAssetFavorited={handleAssetFavorited}
            />
          ))}
        </Row>
        {assets.length > 0 && (
          <Pagination
            onChange={newPage => this.setState({ currentPage: newPage - 1 })}
            total={assets.length}
            current={currentPage + 1}
            pageSize={assetsPerPage}
            defaultCurrent={1}
          />
        )}
        {assets.length === 0 && (
          <NoResults>
            No Assets to display
          </NoResults>
        )}
      </React.Fragment>
    )
  }
}

export default AssetDisplayer;
