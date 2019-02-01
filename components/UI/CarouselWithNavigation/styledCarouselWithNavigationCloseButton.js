import styled from 'styled-components';

const StyledCarouselWithNavigationCloseButton = styled.span`
  a {
    border-radius: 50%;
    display: block;
    width: 26px;
    height: 26px;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 26px;
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
  }
}`

export default StyledCarouselWithNavigationCloseButton;
