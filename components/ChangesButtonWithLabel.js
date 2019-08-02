import styled, { css } from 'styled-components';
import { Button } from 'antd';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
  padding: 0% 10%;
  bottom: 30px;

  button{
    margin-left: 20px;
    width: 124px;
  }
`

const ChangesButtonWithLabel = ({
  onClick,
  loading,
  loadingText,
  changes,
}) => (
  <Wrapper>
    <div>Changes in asset information must be recorded on chain</div>
    <Button
      size="large"
      type="file"
      disabled={!changes}
      type={!changes ? 'default' : 'primary'}
      onClick={onClick}
      loading={loading}
    >
      {loading ? loadingText : !changes ? 'Saved' : 'Save Changes'}
    </Button>
  </Wrapper>
)

export default ChangesButtonWithLabel;
