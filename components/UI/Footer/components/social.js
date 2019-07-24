import React from 'react';
import styled from 'styled-components';
import Medium from 'static/footer/medium.svg';
import Reddit from 'static/footer/reddit.svg';
import Telegram from 'static/footer/telegram.svg';
import Twitter from 'static/footer/twitter.svg';
import Facebook from 'static/footer/facebook.svg';

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
