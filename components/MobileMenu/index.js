import StyledMobileMenu from './styledMobileMenu';
import {
  Icon,
} from 'antd';
import StyledMobileMenuApp from './styledMobileMenuApp';
import StyledMobileMenuWrapper from './styledMobileMenuWrapper';
import StyledMobileCloseButton from './styledMobileCloseButton';
import StyledMobileMenuSection from './styledMobileMenuSection';
import StyledMobileSections from './styledMobileSections';

import Sections from './mobileMenuComponents';

class MobileMenu extends React.PureComponent {
  render () {
    const {
      isOpen,
      handleMobileMenuState,
      children,
    } = this.props;

    return (
      <StyledMobileMenu
        isOpen={isOpen}
      >
        <StyledMobileMenuWrapper
          isOpen={isOpen}
        >
          <StyledMobileCloseButton onClick={() => handleMobileMenuState(false)}>
            <Icon type="close" />
          </StyledMobileCloseButton>
          <StyledMobileSections>
            {Sections.map((Section, index) =>
              <React.Fragment key={`Section--${index}`}>
                <Section
                  {...this.props}
                />
                {index !== Sections.length -1 &&
                  <StyledMobileMenuSection />
                }
              </React.Fragment>
            )}
          </StyledMobileSections>
          </StyledMobileMenuWrapper>
          <StyledMobileMenuApp
            isOpen={isOpen}
          >
            {children}
          </StyledMobileMenuApp>
      </StyledMobileMenu>
    );
  }
}

export default MobileMenu;
