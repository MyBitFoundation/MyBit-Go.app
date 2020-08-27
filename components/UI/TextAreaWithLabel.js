import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

const Label = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grayBase};

  ${props => props.required && `&::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
  `}
`;

const TextAreaWithLabel = ({
  label,
  value,
  onChange,
  placeholder,
  textAreaName,
  rows,
  required, // only for displaying purpose (*)
}) => (
  <React.Fragment>
    <Label required={required}>{label}</Label>
    <TextArea rows={rows} placeholder={placeholder} name={textAreaName} onChange={onChange} value={value} />
  </React.Fragment>
);

export default TextAreaWithLabel;
