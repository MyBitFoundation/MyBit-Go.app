import styled, { css } from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.grayBase};
}`

const ItemValue = styled.span`
  font-size: 16px;
  color: ${({theme}) => theme.colors.black};
  position: relative;
  top: 5px;
  ${props => props.funded && css`
    color: ${({theme}) => theme.colors.green};
  `}
}`

const Item = ({
  title,
  value,
  funded,
}) => (
  <ItemWrapper>
    <ItemTitle>{title}</ItemTitle>
    <ItemValue funded={funded}>{value}</ItemValue>
  </ItemWrapper>
)

export default Item;
