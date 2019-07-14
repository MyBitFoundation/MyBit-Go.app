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
import HelpPageWrapper from './helpPageWrapper';
import HelpPageButtons from './helpPageButtons';
import HelpPageQuestion from './helpPageQuestion';
import HelpPageAnswer from './helpPageAnswer';
import HelpPageButton from './helpPageButton';

const { Panel } = Collapse;

const HelpPage = () => (
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
    <Collapse defaultActiveKey="Value of MyBit Go" onChange={() => {}} accordion>
      {FAQ.map(section => (
        <Panel header={section.title} key={section.title}>
          {section.content.map(content => (
            <div key={content.question}>
              <HelpPageQuestion>{content.question}</HelpPageQuestion>
              <HelpPageAnswer>{content.answer}</HelpPageAnswer>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  </HelpPageWrapper>
);

export default HelpPage;
