import styled, { css } from 'styled-components';

const defaultStyle = css`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0px;
`
export const AssetFundingConfirmFooterMessage = styled.p`
  color: ${({theme}) => theme.colors.grayBase};
  ${defaultStyle};
`

export const AssetFundingConfirmFooterMessageUrl = styled.a`
  ${defaultStyle};
  text-decoration: underline;
  display: block;
  color: ${({theme}) => theme.colors.grayBase};
`
