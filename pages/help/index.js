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
import StyledHelpPage from './styledHelpPage';
import StyledHelpPageButtons from './styledHelpPageButtons';
import StyledHelpPageQuestion from './styledHelpPageQuestion';
import StyledHelpPageAnswer from './styledHelpPageAnswer';
import StyledHelpPageButton from './styledHelpPageButton';

const { Panel } = Collapse;

const HelpPage = () => (
  <StyledHelpPage>
    <StyledHelpPageButtons>
      {Buttons.map(buttonInfo => (
        <StyledHelpPageButton
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
        </StyledHelpPageButton>
      ))}
    </StyledHelpPageButtons>
    <Collapse defaultActiveKey="About MyBit Go" onChange={() => {}} accordion>
      {FAQ.map(section => (
        <Panel header={section.title} key={section.title}>
          {section.content.map(content => (
            <div key={content.question}>
              <StyledHelpPageQuestion>{content.question}</StyledHelpPageQuestion>
              <StyledHelpPageAnswer>{content.answer}</StyledHelpPageAnswer>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  </StyledHelpPage>
);


export default HelpPage;
