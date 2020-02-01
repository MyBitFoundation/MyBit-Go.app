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
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor'
import styled, { css } from 'styled-components';

const { Panel } = Collapse;

const HelpPageAnswer = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}`

const HelpPageButton = styled.a`
  ${props => props.isTelegram && css`
    background-image: linear-gradient(79deg, #001358, #125ac4);
    border-radius: 4px;

    button{
      background-color: transparent;
      border-color: transparent;

      &:hover{
        background-color: transparent;
        border-color: transparent;
      }
    }

    .anticon{
      margin: 0px 3px;
      position: relative;
      left: 8px;
      top: 1px;

      svg{
        fill: white;
      }
    }
  `}
}`


const HelpPageButtons = styled.div`
  display: none;

  ${({theme}) => theme.tablet`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    & a{
      margin: 0px 10px;
      width: max-content;
    }
  `}
}`

const HelpPageQuestion = styled.p`
  line-height: 22px;
  font-size: 14px;
  font-weight: 500;
  color: #1890ff;
  margin-bottom: 2px;
}`


const HelpPageWrapper = styled.div`
  color: #001358;

  .ant-collapse-header{
    font-weight: 500;
  }
}`


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
