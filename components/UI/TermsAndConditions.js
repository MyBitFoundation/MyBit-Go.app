import styled from 'styled-components';
import {
  Checkbox,
} from 'antd';

const TermsAndConditionsWrapper = styled.div`
  display: flex;
`

const TermsAndConditionsText = styled.p`
  display: inline-block;
  margin-left: 10px;

  a:focus{
    text-decoration: none;
  };
}`

const TermsAndConditions = ({
  onChange,
  checked,
  disabled,
}) => (
  <TermsAndConditionsWrapper>
    <Checkbox
      onChange={onChange}
      checked={checked}
      disabled={disabled}
    />
    <TermsAndConditionsText>
        I've read and agree to the {' '}
      <a
        href="https://docs.google.com/document/d/1LUArMnGpnvpe5fI4-QI_lvkJTb5Xf6me0XU1zznCqmk/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms and Conditions
      </a>
      .
    </TermsAndConditionsText>
  </TermsAndConditionsWrapper>
)

export default TermsAndConditions;
