import styled from 'styled-components';

const FooterListWrapper = styled.ul`
  text-decoration: none;
  margin: 0px;
  padding: 0px;

  li{
    line-height: 24px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
    list-style-type: none;
    padding: 0px;
    margin-bottom: 10px;
  }
`;

const FooterList = ({
  items,
}) => (
  <FooterListWrapper>
    {items.map(item => (
      <li>
        {item.name}
      </li>
    ))}
  </FooterListWrapper>
)

export default FooterList;
