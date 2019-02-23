import styled from 'styled-components';

const StyledCarouselWithNavigationCloseButton = styled.span`
  a {
    z-index: 1;
    border-radius: 50%;
    display: block;
    width: 26px;
    height: 26px;
    position: fixed;
    right: 20px;
    top: 15px;
    font-size: 37px;
    background: transparent;
    color: #595959;
    line-height: 26px;
    text-align: center;
    transform: rotate(45deg);
    opacity: .4;
    transition: all .3s cubic-bezier(.645,.045,.355,1);

    &:hover {
      opacity: 1;
      transition: all .3s cubic-bezier(.645,.045,.355,1);
    }

    &:focus {
      text-decoration: none;
    }

    @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
      right: 5px;
      top: 5px;
      font-size: 26px;
      position: absolute;
    }
  }
}`

export default StyledCarouselWithNavigationCloseButton;
