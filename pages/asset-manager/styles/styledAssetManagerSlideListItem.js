import styled from 'styled-components';

const StyledAssetManagerSlideListItem = styled.li`
  line-height: normal;
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
  margin: 20px 0px;

  @media(max-width: 500px) {
    padding: 0px 15px 0px 30px;
    text-align: justify;
  }

  &::before {
    content: "•";
    font-size: 28px;
    position: absolute;
    top: -8px;
    left: 20px;
    color: #1890ff;

    @media(max-width: 500px) {
      left: 12px;
    }
  }
}`

export default StyledAssetManagerSlideListItem;
