import FooterLayoutWrapper from './footerLayoutWrapper';
import FooterLayoutSection from './footerLayoutSection';

const FooterLayout = ({
  items,
}) => {
  const toRender = [];
  for(const item of items){
    if(item.hasBreak){
      toRender.push((
        <div />
      ))
    }
    if(Array.isArray(item)){
      const sectionsSideBySideOnMobile = (
        <FooterLayoutSection>
          {item}
        </FooterLayoutSection>
      )
      toRender.push(sectionsSideBySideOnMobile);
    } else {
      toRender.push(item);
    }
  }
  return (
    <FooterLayoutWrapper>
      {toRender}
    </FooterLayoutWrapper>
  )
};

export default FooterLayout;
