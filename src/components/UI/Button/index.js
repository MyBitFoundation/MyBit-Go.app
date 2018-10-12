import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import MyBitButtonStyle from './styledButton';

const MyBitButton = props => (
  <div>
    <MyBitButtonStyle styling={props.styling}>
      <Button
        className={props.active ? 'ant-btn--is-active' : ''}
        {...props}
      >
        {props.children}
      </Button>
    </MyBitButtonStyle>
  </div>
);

MyBitButton.propTypes = {
  styling: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  active: PropTypes.bool,
  children: PropTypes.node,
};

MyBitButton.defaultProps = {
  active: false,
  children: '',
};

export default MyBitButton;
