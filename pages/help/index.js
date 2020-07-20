// we will remove these once the help page includes the faucet
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-prop-types */
import {
  Button,
  Collapse,
  Icon,
} from 'antd';
import {
  FAQ,
  Buttons,
} from 'constants/knowledgeBase';
import HelpPageWrapper from 'components/Help/helpPageWrapper';
import HelpPageButtons from 'components/Help/helpPageButtons';
import HelpPageQuestion from 'components/Help/helpPageQuestion';
import HelpPageAnswer from 'components/Help/helpPageAnswer';
import HelpPageButton from 'components/Help/helpPageButton';

const { Panel } = Collapse;
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor'

class HelpPage extends React.Component {
  state = {
    activeKey: 'Value of MyBit Go',
  }
  componentDidMount(){
    const anchor = window.location.hash !== '' && window.location.hash;
    anchor && this.setState({activeKey: 'Asset Managers'}, () => goToAnchor(anchor.substring(1)))
  }

  render = () => (
    <HelpPageWrapper>
      <HelpPageButtons>
        {Buttons.map(buttonInfo => (
          <HelpPageButton
            key={buttonInfo.url}
            href={buttonInfo.url}
            isTelegram={buttonInfo.isTelegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonInfo.icon && (
              <Icon component={buttonInfo.icon} />
            )}
            <Button
              type={buttonInfo.type}
            >
              {buttonInfo.text}
            </Button>
          </HelpPageButton>
        ))}
      </HelpPageButtons>
      <Collapse activeKey={this.state.activeKey} onChange={(activeKey) => {this.setState({activeKey})}} accordion>
        {FAQ.map(section => (
          <Panel header={section.title} key={section.title}>
            {section.content.map(content => {
              const questionToRender = <HelpPageQuestion>{content.question}</HelpPageQuestion>;
              const questionWrapper = content.anchor ?
                <ScrollableAnchor id={content.question}>{questionToRender}</ScrollableAnchor> :
                null;
              return (
              <div key={content.question}>
                {questionWrapper ? questionWrapper : questionToRender}
                <HelpPageAnswer>{content.answer}</HelpPageAnswer>
              </div>
            )}
          )}
          </Panel>
        ))}
      </Collapse>
    </HelpPageWrapper>
  )
}

export default HelpPage;
