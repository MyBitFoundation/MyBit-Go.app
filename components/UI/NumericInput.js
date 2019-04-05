/* eslint-disable no-param-reassign */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
} from 'antd';

class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const reg = /^\d*(\.\d{0,2})?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      value, placeholdertext, label,
    } = this.props;
    return (
      <Input
        {...this.props}
        value={value}
        onChange={this.onChange}
        placeholder={placeholdertext}
        maxLength="25"
        addonAfter={label}
        type="number"
      />
    );
  }
}

export default NumericInput;
