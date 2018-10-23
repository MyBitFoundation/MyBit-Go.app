import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import MyBitButtonStyle from './styledButton';

const MyBitButton = ({
  size, styling, active, children, onClick,
}) => (
  <div>
    <MyBitButtonStyle styling={styling}>
      <Button
        className={active ? 'ant-btn--is-active' : ''}
        size={size}
        onClick={onClick}
      >
        {children}
      </Button>
    </MyBitButtonStyle>
  </div>
);

MyBitButton.propTypes = {
  styling: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  active: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

MyBitButton.defaultProps = {
  active: false,
  children: '',
  size: '',
  onClick: undefined,
};

export default MyBitButton;
