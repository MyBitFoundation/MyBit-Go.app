import React from 'react';
import styled from 'styled-components';

const AssetUpdatesWrapper = styled.div`
  padding: 10px 20px 10px 20px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
  margin-bottom: 20px;
}`

const AssetUpdatesTitle = styled.p`
  font-size: 20px;
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
  padding-top: 10px;
}`

class AssetUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  async componentWillMount() {
    const { getPosts, asset } = this.props;
    const posts = asset && asset.assetId && asset.assetManager ? 
      await getPosts(asset.assetId, asset.assetManager) : []
    this.setState({ posts })
  }
  render() {
    const { loadingThreeBox } = this.props;
    const { posts } = this.state;
    return (
      <AssetUpdatesWrapper>
        <AssetUpdatesTitle>Updates from Asset Manager</AssetUpdatesTitle>
        {
          loadingThreeBox ?
          <p>
            Loading updates from Asset Manager...
          </p> : posts.length === 0 ?
            <p>
              No updates from the asset manager.
            </p> :
            <p> We got some updates for ya</p>
        }
      </AssetUpdatesWrapper>
    )
  }
}

export default AssetUpdates;