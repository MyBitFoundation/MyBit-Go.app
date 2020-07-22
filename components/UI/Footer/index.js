import styled, { css } from "styled-components";
import Column from "./components/column";
import About from "./components/about";
import * as NavigationData from "./navigationData";

const FooterWrapper = styled.div`
  padding-top: 25px;
  border-top: 1px solid #e8e8e8;

  ${props =>
    props.isFullScreenPage &&
    css`
      display: none;

      ${({ theme }) => theme.tablet`
      display: block;
    `}
    `}

  @media(min-width: 968px) {
    display: flex;
  }

  padding: 20px 20px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 50px;

  ${({ theme }) => theme.laptop`
    padding: 20px 40px;
  `}
`;

const Label = styled.p`
  color: #575757;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  width: 100%;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  /*Products section*/
  > div:nth-child(3) {
    display: none;
  }

  @media (min-width: 500px) {
    /*Products section*/
    > div:nth-child(3) {
      display: block;
    }
  }

  @media (min-width: 968px) {
    width: 50%;
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
`;

const AboutWrapper = styled.div`
  text-align: center;
  @media (min-width: 968px) {
    text-align: left;
    margin-right: 20px;
  }
`;

const Footer = ({ isFullScreenPage }) => (
  <div>
    <FooterWrapper isFullScreenPage={isFullScreenPage}>
      <AboutWrapper>
        <Column content={<About />} />
      </AboutWrapper>
      <NavWrapper>
        <Column
          title="Contribute"
          content={<NavigationData.MyBitContribute />}
        />
      </NavWrapper>
    </FooterWrapper>
  </div>
);

export default Footer;
