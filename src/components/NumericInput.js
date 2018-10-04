/* eslint-disable no-param-reassign */

import React from 'react';
import PropTypes from 'prop-types';

import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';

class NumericInput extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(2) {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      value, placeHolderText, label,
    } = this.props;
    return (
      <Input
        {...this.props}
        value={value}
        onChange={this.onChange}
        placeholder={placeHolderText}
        maxLength="25"
        addonAfter={label}
        type="number"
      />
    );
  }
}

NumericInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolderText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default NumericInput;
