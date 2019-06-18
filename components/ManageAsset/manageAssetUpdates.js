import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import ManageAssetCustomRow from './manageAssetCustomRow';
import ManageAssetRectangleContainer from './manageAssetRectangleContainer';

const { TextArea } = Input;
const ButtonGroup = Button.Group;
const ManageStyledTextArea = styled(TextArea)`
    margin: 10px;
`

const ManageAssetUpdates = ({
  authorizeThreeBoxSpace,
  hasAuthorizedThreeBox,
  hasOpenedGoSpace,
  openThreeBoxSpace,
}) => {

  console.log('[ ManageAssetUpdates - init ] - hasOpenedGoSpace', hasOpenedGoSpace)

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
            placeholder={
              `Add your update here. The update will show up in the asset ` +
              `listing and can not be removed afterwards.`
            }
          />
          <ButtonGroup size="medium">
            {
              !hasAuthorizedThreeBox ?
              <Button
                type="secondary"
                disabled={false}
                loading={false}
                onClick={() => { console.log('Authorizing Space'); authorizeThreeBoxSpace(); }}
              >
                Authorize Threads API
              </Button> :
              !hasOpenedGoSpace && <Button
                type="secondary"
                disabled={false}
                loading={false}
                onClick={() => { 
                  console.log('[ ManageAssetUpdates - onClick ] - calling openThreeBoxSpace'); 
                  openThreeBoxSpace(); 
                }}
              >
                Open Asset Thread
              </Button>
            }
            
            <Button
              type="primary"
              disabled={!hasOpenedGoSpace && !hasAuthorizedThreeBox}
              loading={false}
              onClick={() => {}}
            >
              Post Update
            </Button>
          </ButtonGroup>
        </ManageAssetRectangleContainer>
    </ManageAssetCustomRow>
)}

export default ManageAssetUpdates;