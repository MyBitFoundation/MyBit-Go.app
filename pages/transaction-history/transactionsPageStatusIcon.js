import styled, { css } from 'styled-components';

const statusIcon = (color) => css`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
  transform: translate(0%, -50%);
  margin-right: 5px;
  background-color: ${color};
`

const TransactionsPageStatusIcon = styled.span`
  ${props => props.status === 'Confirmed' && css`
    ${statusIcon(props.theme.colors.green)}
  `}

  ${props => props.status === 'Pending' && css`
    ${statusIcon('rgba(0, 0, 0, 0.25)')}
  `}

  ${props => props.status === 'Error' && css`
    ${statusIcon(props.theme.colors.red)}
  `}
}`

export default TransactionsPageStatusIcon;
