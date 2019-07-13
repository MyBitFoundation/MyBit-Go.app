import styled, { css } from 'styled-components';
import Column from './column';
import Social from './social';
import About from './about';
import * as NavigationData from './navigationData';

const FooterWrapper = styled.div`
  padding-top: 25px;
  border-top: 1px solid #e8e8e8;

  ${props => props.isFullScreenPage && css`
    display: none;

    ${({theme}) => theme.tablet`
      display: block;
    `}
  `}

  @media(min-width: 968px){
    display: flex;
  }

  padding: 20px 20px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 50px;

  ${({theme}) => theme.laptop`
    padding: 20px 40px;
  `}
`

const Label = styled.p`
  color: #575757;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  width: 100%;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  /*Products section*/
  > div:nth-child(3){
    display: none;
  }

  @media(min-width: 500px){
    /*Products section*/
    > div:nth-child(3){
      display: block;
    }
  }

  @media(min-width: 968px){
    width: 50%;
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
`

const MediaWrapper = styled.div`
  margin: 30px auto;
  max-width: max-content;
  text-align: center;
  @media(min-width: 968px){
    display: flex;
    justify-content: center;
    text-align: left;
    margin: 0 auto;
  }
`

const AboutWrapper = styled.div`
  text-align: center;
  @media(min-width: 968px){
    text-align: right;
  }
`

const Footer = ({ isFullScreenPage }) => (
  <div>
    <FooterWrapper isFullScreenPage={isFullScreenPage}>
      <NavWrapper>
        <Column
          title="MyBit Go"
          content={<NavigationData.MyBitGo />}
        />
        <Column
          title="About MyBit"
          content={<NavigationData.AboutMyBit />}
        />
        <Column
          title="Products"
          content={<NavigationData.Products />}
        />
      </NavWrapper>
      <MediaWrapper>
        <Column
          title="Follow Us"
          content={<Social />}
        />
      </MediaWrapper>
      <AboutWrapper>
        <Column
          content={<About />}
        />
      </AboutWrapper>
    </FooterWrapper>
    <Label>Copyright © MyBit 2019. All Rights Reserved.</Label>
  </div>
);

export default Footer;
