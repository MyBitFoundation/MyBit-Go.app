import React from 'react';
import { Input, Button  } from 'antd';
import styled from 'styled-components';
import ManageAssetCustomRow from './manageAssetCustomRow';
import ManageAssetRectangleContainer from './manageAssetRectangleContainer';

const { TextArea } = Input;
const ButtonGroup = Button.Group;
const ManageStyledTextArea = styled(TextArea)`
    margin: 10px;
`

class ManageAssetUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.loadPosts = this.loadPosts.bind(this);
  }

  state =  {
    updateText: null,
    posts: [],
    loadingPosts: false,
  }

  async loadPosts () {
    this.setState({ loadingPosts: true })
    const { getPostsFromCurrentThread } = this.props;
    const posts = await getPostsFromCurrentThread()
    this.setState({ posts, loadingPosts: false });
  }

  render() {

  const {
    authorizeThreeBoxSpace,
    loadingThreeBoxThreadAPIAuthorization,
    loadingThreeBoxSpaceAuthorization,
    loadingThreeBoxThreadPostRequest,
    hasAuthorizedThreeBox,
    hasOpenedGoSpace,
    openThreeBoxSpace,
    postUpdateOnThread,
    syncingThreeBox,
  } = this.props;

  const { posts, loadingPosts } = this.state;

  return (
    <ManageAssetCustomRow>
        <ManageAssetRectangleContainer
          hasShadow
          isFullWidth
          hasPadding
          height="250px"
        >
          <b>Updates</b>
          <p>Use the following section to post updates 
              to investors of this asset.</p>
          <ManageStyledTextArea
            rows={3}
            disabled={!hasAuthorizedThreeBox || !hasOpenedGoSpace}
            placeholder={
              !hasAuthorizedThreeBox || !hasOpenedGoSpace ?
              `Please authorize 3Box Threads API to sync with your account. You might need` +
              `to repeat these steps multiple times.` :
              `Add your update here. The update will show up in the asset ` +
              `listing and can not be removed afterwards.`
            }
            onChange={(e) => this.setState({ updateText: e.target.value })}
            value={this.state.updateText}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}
          >
          <ButtonGroup size="medium">
            {
              !hasAuthorizedThreeBox ?
              <Button
                type="secondary"
                disabled={loadingThreeBoxThreadAPIAuthorization}
                loading={loadingThreeBoxThreadAPIAuthorization}
                onClick={() => { console.log('Authorizing Space'); authorizeThreeBoxSpace(); }}
              >
                { 
                  !loadingThreeBoxThreadAPIAuthorization ?
                  'Authorize Threads API' :
                  'Authorizing...'
                }
              </Button> :
              (!hasOpenedGoSpace && <Button
                type="secondary"
                disabled={loadingThreeBoxSpaceAuthorization}
                loading={loadingThreeBoxSpaceAuthorization}
                onClick={async () => { 
                  console.log('[ ManageAssetUpdates - onClick ] - calling openThreeBoxSpace'); 
                  const space = await openThreeBoxSpace();
                  this.loadPosts();
                }}
              >
                {
                  !loadingThreeBoxSpaceAuthorization ?
                  'Open Asset Thread' :
                  'Opening...'
                }
              </Button>)
            }
            
            <Button
              type="primary"
              disabled={!hasOpenedGoSpace || !hasAuthorizedThreeBox || syncingThreeBox}
              loading={loadingThreeBoxThreadPostRequest || syncingThreeBox}
              onClick={() => {
                  postUpdateOnThread(this.state.updateText, this.loadPosts)
                  this.setState({ updateText: '' })
                }
              }
            >
              {
                syncingThreeBox ?
                'Syncing w/3Box...':
                  !loadingThreeBoxThreadPostRequest ?
                  'Post Update' :
                  'Posting...'
              }
            </Button>
          </ButtonGroup>
          {
            hasOpenedGoSpace &&
              <Button
                type="primary"
                loading={loadingPosts || syncingThreeBox}
                disabled={loadingPosts || syncingThreeBox}
              >
                {
                  syncingThreeBox ?
                  'Waiting for sync...':
                    !loadingPosts ?
                    `See Updates (${posts.length})` :
                    'Loading posts...'
                }
              </Button>
          }
          </div>
        </ManageAssetRectangleContainer>
    </ManageAssetCustomRow>
  );
  }
}

export default ManageAssetUpdates;