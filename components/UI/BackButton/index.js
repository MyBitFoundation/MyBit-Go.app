import Router from 'next/router';
import {
  Button,
} from 'antd';
import BackButtonWrapper from './backButtonWrapper';

const BackButton = ({
  href,
  as,
}) => (
  <BackButtonWrapper
    type="secondary"
    onClick={() => window.history.length === 1 ? Router.push(href, as) : Router.back()}
  >
    Back
  </BackButtonWrapper>
)

export default BackButton;
