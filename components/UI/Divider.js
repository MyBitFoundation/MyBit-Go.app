import { Divider as DividerAnt } from 'antd';

const Divider = ({
  styling,
}) => (
  <DividerAnt
    style={{
      margin: '10px 0px',
      backgroundColor: '#D9D9D9',
      ...styling,
    }}
  />
);

export default Divider;
