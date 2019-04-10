import styled from 'styled-components';

const ManageAssetValueDisplayer = styled.div`
  flex-direction: column;
  align-items: center;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  margin: 5px 0px;
  margin-bottom: 10px;

  ${({theme}) => theme.laptopL`
    flex-direction: row;
  `}
}`

export default ManageAssetValueDisplayer;
