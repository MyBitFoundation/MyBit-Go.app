/* eslint-disable no-param-reassign */

import React from 'react';
import PropTypes from 'prop-types';

import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';

import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/css';


function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}


class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  // '.' at the end or only '' in the input box.
  onBlur() {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange({ value: value.slice(0, -1) });
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { value, placeHolderText, beforeNumber, label } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== '-' ? value : '-'}
      </span>
    ) : placeHolderText;
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={placeHolderText}
          maxLength="25"
          addonAfter={label}
        />
      </Tooltip>
    );
  }
}

NumericInput.propTypes = {
  onBlur: PropTypes.func.isRequired,
  beforeNumber: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolderText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default NumericInput;
