import {
  Icon,
} from 'antd';
import MobileMenuApp from './mobileMenuApp';
import MobileMenuWrapper from './mobileMenuWrapper';
import MobileCloseButton from './mobileCloseButton';
import MobileMenuSection from './mobileMenuSection';
import MobileSections from './mobileMenuSections';

import Sections from './mobileMenuComponents';

class MobileMenu extends React.PureComponent {
  render () {
    const {
      isOpen,
      handleMobileMenuState,
      children,
      metamaskContext,
    } = this.props;

    return (
      <div>
        <MobileMenuWrapper
          isOpen={isOpen}
        >
          <MobileCloseButton onClick={() => handleMobileMenuState(false)}>
            <Icon type="close" />
          </MobileCloseButton>
          <MobileSections>
            {Sections.map((Section, index) =>
              <React.Fragment key={`Section--${index}`}>
                <Section
                  {...this.props}
                  handleMobileMenuState={handleMobileMenuState}
                />
                {index !== Sections.length -1 &&
                  <MobileMenuSection />
                }
              </React.Fragment>
            )}
          </MobileSections>
          </MobileMenuWrapper>
          <MobileMenuApp
            isOpen={isOpen}
          >
            {children}
          </MobileMenuApp>
      </div>
    );
  }
}

export default MobileMenu;
