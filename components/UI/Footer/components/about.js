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
    <p>MyBit is a Community Driven Project</p>
    <p>that is operated and maintained by a DAO.</p>
    <a
      href="https://snapshot.page/#/mybit/community"
      target="_blank"
    >
       https://snapshot.page/#/mybit/community
    </a>
  </AboutWrapper>
);

export default About;
