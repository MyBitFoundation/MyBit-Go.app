import styled from 'styled-components';

const WatchListSwitch = styled.div`
  position: relative;
  left: 100%;
  transform: translate(-100%, 0%);
  padding-right: 10px;

  & span{
    font-family: 'Assistant', sans-serif;
    font-size: 14px;
    text-align: right;
    color: #4a4a4a;
    margin-right: 10px;
    position: relative;
  }

  .ant-switch span{
    color: white;
  }
}`

export default WatchListSwitch;
