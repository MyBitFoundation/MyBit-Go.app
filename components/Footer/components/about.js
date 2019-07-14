import React from 'react';
import styled from 'styled-components';
import Mybit from 'static/footer/logo-dark.svg';

const AboutWrapper = styled.div`
  color: #575757;
  font-size: 16px;
  line-height: 24px;

  a {
    color: #575757;
  }

  a:hover{
    color: inherit;
  }

  a:focus{
    text-decoration: none;
  }
`

const About = () => (
  <AboutWrapper>
    <Mybit />
    <p>MyBit Foundation. Dammstrasse<br /> 16, 6300 Zug, Switzerland.<br />Registration No. CHE-177.186.963</p><p/>
    <a
      href="https://github.com/MyBitFoundation/MyBit-Go.website/blob/develop/TOC.md"
      target="_blank"
    >
      Terms & Conditions
    </a>
  </AboutWrapper>
);

export default About;
