import React from 'react';
import Router from 'next/router';
import styled from 'styled-components'
import BackArrow from 'static/back-arrow.svg'

const GoBackTextAndArrowWrapper = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.color || props.theme.colors.blueMain};
  transition: color .3s;
  width: max-content;
  svg{
    margin-right: 5px;
    fill: ${props => props.color || props.theme.colors.blueMain};
    transition: color .3s;
  }

  :hover{
    color: ${props => props.hoverColor || props.theme.colors.blueHover};

    svg{
      fill: ${props => props.hoverColor || props.theme.colors.blueHover};
    }
  }
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

const GoBackTextAndArrow = ({
  children,
  color,
  hoverColor,
  style,
  href,
  as,
}) => {
  return (
    <GoBackTextAndArrowWrapper
      color={color}
      hoverColor={hoverColor}
      style={style}
      onClick={() => window.history.length === 1 ? Router.push(href, as) : Router.back()}
    >
      <BackArrow /> {children || "Go Back"}
    </GoBackTextAndArrowWrapper>
  )
}

export default GoBackTextAndArrow;
