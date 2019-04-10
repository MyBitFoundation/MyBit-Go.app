import styled from 'styled-components';

const DocumentsManagerNav = styled.div`
  display: flex;
  padding: 0% 10%;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;

  > div:nth-child(1){
    display: none;
  };

  > div:nth-child(2){
    font-size: 20px;
  };

  ${({theme}) => theme.laptop`
    text-align: left;

    > div:nth-child(1){
      display: block;
    };
    > div:nth-child(2){
      display: none;
    };
  `}
}`

export default DocumentsManagerNav;
