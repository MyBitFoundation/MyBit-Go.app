import { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;

const Label = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${({theme}) => theme.colors.grayBase};
`

const TextAreaWithLabel = ({
  label,
  value,
  onChange,
  placeholder,
  textAreaName,
  rows,
}) => {
  return (
    <React.Fragment>
      <Label>{label}</Label>
      <TextArea rows={rows} placeholder={placeholder} name={textAreaName} onChange={onChange} value={value}/>
    </React.Fragment>
  )
}

export default TextAreaWithLabel;
