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
  async componentWillMount() {
    const { getPosts, asset } = this.props;
    console.log('[ AssetUpdates - componentWillMount ] asset', asset);
    const posts = asset && asset.assetId && asset.assetManager ? 
      await getPosts(asset.assetId, asset.assetManager) : []
    console.log('[ AssetUpdates - componentWillMount ] posts', posts);
  }
  render() {
    return (
      <AssetUpdatesWrapper>
        <AssetUpdatesTitle>Updates from Asset Manager</AssetUpdatesTitle>
        <p>
          No updates from the asset manager.
        </p>
      </AssetUpdatesWrapper>
    )
  }
}

export default AssetUpdates;