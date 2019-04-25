import React from 'react';
import { Timeline } from 'antd';
import styled, { css } from 'styled-components';
import Check from 'static/list-asset/check.svg';

const CustomDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #D9D9D9;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #BDBDBD;

  ${(props) => props.current && css`
    color: white;
    background-color: ${({theme}) => theme.colors.blueMain};
    border: none;
  `}
`

const CustomTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #BDBDBD;

  ${(props) => props.current && css`
    color: ${({theme}) => theme.colors.blueMain};
  `}

  ${(props) => props.completed && css`
    color: #52C41A;
  `}
`

const CustomContent = styled.div`
  color: #BDBDBD;

  ${(props) => props.current && css`
    color: inherit;
  `}

  ${(props) => props.completed && css`
    color: inherit;
  `}
`

const CustomTimelineItem = ({
  step,
  title,
  content,
  currentStep,
}) => {
  const current = currentStep === step - 1;
  const completed = currentStep > step - 1;
  return (
    <Timeline.Item
      dot={completed ? <Check /> : <CustomDot current={current}>{step}</CustomDot>}
    >
      <CustomTitle
        completed={completed}
        current={current}
      >
        {title}
      </CustomTitle>
      <CustomContent
        completed={completed}
        current={current}
      >
        {content}
      </CustomContent>
    </Timeline.Item>
  )
}

export default CustomTimelineItem;
