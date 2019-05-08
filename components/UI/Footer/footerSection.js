import styled from 'styled-components';

const FooterSectionWrapper = styled.div`
  text-align: ${props => props.textAlign || 'center'};

  ${({theme}) => theme.tablet`
    text-align: ${props => props.textAlignMobile || props.textAlign || 'left'};
  `}
`

const FooterSectionTitle = styled.p`
  color: #575757;
  font-weight: bold;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const FooterSection = ({
  children,
  title,
  styling = {},
}) => (
  <FooterSectionWrapper
    {...styling}
  >
    {title && (
      <FooterSectionTitle>
        {title}
      </FooterSectionTitle>
    )}
    {children}
  </FooterSectionWrapper>
);

export default FooterSection;
