import styled from 'styled-components';

const StyledFiltersSwitch = styled.div`
  .ant-switch span{
    color: white;
  }
  margin-top: 10px;
  text-align: left;
  margin-bottom: 20px;

  span{
    font-family: Roboto;
    font-size: 14px;
    text-align: right;
    color: #4a4a4a;
    margin-right: 10px;
    position: relative;
  }

  ${({ theme }) => theme.categoriesFilterMobile`
    position: relative;
    padding-top: 0px;
    text-align: right;
    margin-left: 0px;
    top: 7px;
    margin-bottom: 30px;
 `}

 ${({ theme }) => theme.tablet`
    margin-right: 10px;
 `}
}`

export default StyledFiltersSwitch;
