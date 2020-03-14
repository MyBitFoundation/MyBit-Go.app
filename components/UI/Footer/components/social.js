import React from 'react';
import styled from 'styled-components';
import Medium from 'public/footer/medium.svg';
import Reddit from 'public/footer/reddit.svg';
import Telegram from 'public/footer/telegram.svg';
import Twitter from 'public/footer/twitter.svg';
import Facebook from 'public/footer/facebook.svg';

const IconWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  svg {
    margin-right: 15px;
  }
`

const Social = () => (
  <div>
    <IconWrapper>
      <a href="https://t.me/mybitio" target="_blank" rel="noopener noreferrer"><Telegram /></a>
      <a href="https://www.reddit.com/user/MyBit_DApp/" target="_blank" rel="noopener noreferrer"><Reddit /></a>
      <a href="https://medium.com/mybit-dapp" target="_blank" rel="noopener noreferrer"><Medium /></a>
      <a href="https://www.facebook.com/MyBitDApp/" target="_blank" rel="noopener noreferrer"><Facebook /></a>
      <a href="https://twitter.com/MyBit_DApp" target="_blank" rel="noopener noreferrer"><Twitter /></a>
    </IconWrapper>
  </div>
);

export default Social;
