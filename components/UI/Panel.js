import styled, { css } from 'styled-components';

const PanelWrapper = styled.div`
  position: relative;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
  padding: 20px;
  border-radius: 4px;

  ${props => props.maximizeForMobile && css`
    box-shadow: none;
    padding: 0px;
    border-radius: 0px;
    ${({theme}) => theme.tablet`
        box-shadow: 0 4px 12px 0 rgba(0,0,0,.1);
        padding: 20px;
        border-radius: 4px;
    `}
  `}
`

const Panel = ({
  children,
  maximizeForMobile,
  style,
}) => (
  <PanelWrapper style={style} maximizeForMobile={maximizeForMobile}>
    {children}
  </PanelWrapper>
)

export default Panel;
