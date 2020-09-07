import React from 'react';
import { Timeline } from 'antd';
import styled, { css } from 'styled-components';

const CustomDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.grayUltraLight};
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #BDBDBD;

  ${props => props.current && css`
    color: white;
    background-color: ${({ theme }) => theme.colors.blueMain};
    border: none;
  `}

  ${props => props.completed && css`
    color: ${({ theme }) => theme.colors.green};
    background-color: ${({ theme }) => theme.colors.green};
    border: none;

    &::after{
      content: ' ';
      display: block;
      width: 14px;
      height: 11px;
      background-image: url(static/list-asset/checkmark.svg);
      background-repeat: no-repeat;
      top: 50%;
      transform: translate(-50%,-50%);
      left: 50%;
      position: absolute;
    }
  `}
`;

const CustomTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #BDBDBD;

  ${props => props.current && css`
    color: ${({ theme }) => theme.colors.blueMain};
  `}

  ${props => props.completed && css`
    color: ${({ theme }) => theme.colors.green};
  `}
`;

const CustomContent = styled.div`
  color: #BDBDBD;

  ${props => props.current && css`
    color: inherit;
  `}

  ${props => props.completed && css`
    color: inherit;
  `}
`;

const TimelineItemWrapper = styled(Timeline.Item)`
  ${props => props.onClick && css`
    cursor: pointer;
  `}
`;

const CustomTimelineItem = ({
  step,
  title,
  content,
  currentStep,
  goToStep,
}) => {
  const current = currentStep === step;
  const completed = currentStep > step;
  return (
    <TimelineItemWrapper
      dot={<CustomDot current={current} completed={completed}>{step}</CustomDot>}
      onClick={goToStep ? () => goToStep(step) : undefined}
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
    </TimelineItemWrapper>
  );
};

export default CustomTimelineItem;
