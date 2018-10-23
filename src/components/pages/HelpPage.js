// we will remove these once the help page includes the faucet
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import 'antd/lib/collapse/style';
import 'antd/lib/button/style';
import '../../styles/HelpPage.css';
import { FAQ, Buttons } from '../../constants/knowledgeBase';

const { Panel } = Collapse;

const HelpPage = () => (
  <div className="HelpPage">
    <div className="HelpPage-buttons">
      {Buttons.map(buttonInfo => (
        <a
          key={buttonInfo.url}
          href={buttonInfo.url}
          className={buttonInfo.className}
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
        </a>
      ))}
    </div>
    <Collapse defaultActiveKey="About MyBit Go" onChange={() => {}} accordion>
      {FAQ.map(section => (
        <Panel header={section.title} key={section.title}>
          {section.content.map(content => (
            <div key={content.question}>
              <p className="HelpPage-question">{content.question}</p>
              <p className="HelpPage-answer">{content.answer}</p>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  </div>
);


export default HelpPage;
