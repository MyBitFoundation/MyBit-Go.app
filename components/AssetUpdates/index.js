import React from 'react';
import styled from 'styled-components';
import { Comment, List } from 'antd';
import dayjs from 'dayjs';

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
      posts: [],
      author: 'Loading...',
      avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=',
    }
  }
  async componentWillMount() {
    const { getPosts, asset, getProfile, getAvatar } = this.props;
    const posts = asset && asset.assetId && asset.assetManager ? 
      await getPosts(asset.assetId, asset.assetManager) : []
    const author = await getProfile(asset.assetManager)
    const avatar = await getAvatar(asset.assetManager)
    this.setState({ posts, author, avatar })
  }
  render() {
    const { loadingThreeBox } = this.props;
    const { posts, author, avatar } = this.state;
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
            <List
              header={`${posts.length} updates`}
              itemLayout='horizontal'
              dataSource={posts}
              renderItem={post => (
                <li>
                  <Comment
                    author={author.name}
                    avatar={avatar}
                    content={post.message}
                    datetime={dayjs(post.timestamp).format('ddd, MMM D, H:mm:ss')}
                  />
                </li>
              )}
            >
            </List>
        }
      </AssetUpdatesWrapper>
    )
  }
}

export default AssetUpdates;