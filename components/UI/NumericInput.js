/* eslint-disable no-param-reassign */

import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'lodash';

import {
  Input,
} from 'antd';

class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      decimalPlaces = 2,
    } = this.props;
    const { value } = e.target;
    const reg = new RegExp(`\\d+(\\.\\d{0,${decimalPlaces}})?`, 'g');
    const matches = reg.test(value);
    const isNumber = !Number.isNaN(value)

    if ((isNumber && matches) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      value, placeholdertext, label,
    } = this.props;

    return (
      <Input
        {...omit(this.props, NumericInput.OmitProps)}
        value={value}
        onChange={this.onChange}
        placeholder={placeholdertext}
        addonAfter={label}
        type="number"
      />
    );
  }
}


NumericInput.OmitProps = [
  'decimalPlaces',
]

export default NumericInput;
