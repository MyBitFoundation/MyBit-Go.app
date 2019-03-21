import styled from 'styled-components';

const AssetDetailsMananagerInfo = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
  display: flex;
  justify-content: space-between;

  @media(max-width: 500px) {
    flex-direction: column;
  }
}`

export default AssetDetailsMananagerInfo;
