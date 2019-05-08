import Router from 'next/router';
import {
  Button,
} from 'antd';
import BackButtonWrapper from './backButtonWrapper';

const BackButton = () => (
  <BackButtonWrapper
    type="secondary"
    onClick={() => window.history.length === 2 ? Router.push('/portfolio') : Router.back()}
  >
    Back
  </BackButtonWrapper>
)

export default BackButton;
