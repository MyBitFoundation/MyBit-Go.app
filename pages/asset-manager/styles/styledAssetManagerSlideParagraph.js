import styled, { css } from 'styled-components';

const StyledAssetManagerSlideParagraph = styled.p`
  padding: 5px 10px;
  line-height: normal;
  margin: 0px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);

  @media(max-width: 600px) {
    padding: 0px 15px 12px 15px;
    text-align: justify;
  }

  ${props => props.isLastSlide && css`
    @media(max-width: 500px) {
      padding: 0px 35px 12px 35px;
      text-align: justify;
    }
  `}

  ${props => props.hasMarginTop && css`
    margin-top: 25px;
  `}


  ${props => props.isLastWho && css`
    margin-bottom: 90px;
  `}

  ${props => props.isLastIncentivised && css`
    margin-bottom: 125px;
  `}
}`

export default StyledAssetManagerSlideParagraph;
