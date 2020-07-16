import React from "react";
import styled from "styled-components";
import Mybit from "static/footer/logo-dark.svg";

const AboutWrapper = styled.div`
  color: #575757;
  font-size: 16px;
  line-height: 24px;

  a {
    color: #575757;
  }

  a:hover {
    color: inherit;
  }

  a:focus {
    text-decoration: none;
  }
`;

const About = () => (
  <AboutWrapper>
    <Mybit />
    <div>
      MyBit is operated and maintained by a DAO
      <div>DAO address:</div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://mainnet.aragon.org/#/0xcD3d9b832BfF15E0a519610372c6AAC651872DdE/"
      >
        0xcD3d9b832BfF15E0a519610372c6AAC651872DdE
      </a>
    </div>
    <a
      href="https://github.com/MyBitFoundation/MyBit-Go.website/blob/develop/TOC.md"
      rel="noopener noreferrer"
      target="_blank"
    >
      Terms & Conditions
    </a>
  </AboutWrapper>
);

export default About;
