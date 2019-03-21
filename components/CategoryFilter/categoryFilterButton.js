import styled from 'styled-components';
import {
  Button,
} from 'antd';

const CategoryFilterButton = styled(Button)`
  text-shadow: none;
  background-color: ${props => ((props.type === 'primary') ? '#fff' : '#fff')};
  color: ${props => ((props.type === 'primary') ? '#1890ff' : 'rgba(0, 0, 0, 0.65)')};
  border-color: ${props => ((props.type === 'primary') ? '#1890ff ' : '#d9d9d9')};

  &:hover {
    background-color: #fff;
    color: #1890ff;
    border-color: #1890ff;
  }

  &:focus-within {
    color: none;
    background-color: none;
    border-color: none;
  }

  &:focus {
    background-color: ${props => ((props.type === 'primary') ? '#fff' : '#fff')};
    color: ${props => ((props.type === 'primary') ? '#1890ff' : 'rgba(0, 0, 0, 0.65)')};
    border-color: ${props => ((props.type === 'primary') ? '#1890ff ' : '#d9d9d9')};
  }
}`

export default CategoryFilterButton;
