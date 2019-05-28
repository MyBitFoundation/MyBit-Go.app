import React from 'react';
import styled from 'styled-components'
import Link from 'next/link'
import BackArrow from 'static/back-arrow.svg'

// Workaround to style <Link />
// see: https://github.com/zeit/next.js/issues/1942

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
  text,
  color,
  hoverColor,
  style,
  href,
  as,
}) => {
  return (
    <Link
      href={href}
      as={as}
      passHref
    >
      <GoBackTextAndArrowWrapper
        color={color}
        hoverColor={hoverColor}
        style={style}
      >
        <BackArrow /> {children || text}
      </GoBackTextAndArrowWrapper>
    </Link>
  )
}

export default GoBackTextAndArrow;
