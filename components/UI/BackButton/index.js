import Router from 'next/router';
import {
  Button,
} from 'antd';

const BackButton = () => (
  <Button
    type="secondary"
    onClick={() => window.history.length === 2 ? Router.push('/portfolio') : Router.back()}
  >
    Back
  </Button>
)

export default BackButton;
