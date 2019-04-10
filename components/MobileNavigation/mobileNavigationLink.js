import styled, { css } from 'styled-components';

const MobileNavigationLink = styled.div`
  margin-bottom: 20px;

  :focus{
    outline: none;
  }

  a {
    font-size: 16px;
    padding-left: 10px;
    color: ${props => props.selected ? '#1890FF' : 'rgba(0, 0, 0, 0.65)'};

    :focus{
      text-decoration: none;
    }
  }

  svg{
    width: 16px;
    height: 16px;
  }

  svg g,
  svg path{
    fill: ${props => props.selected ? '#1890ff' : '#565656'};
  }

  svg g,
  svg path{
    fill: ${props => props.selected ? '#1890ff' : '#565656'};
  }
}`

export default MobileNavigationLink;
