import styled from 'styled-components';

const ExploreFiltersSwitch = styled.div`
  .ant-switch span{
    color: white;
  }
  margin-top: 10px;
  text-align: left;
  margin-bottom: 20px;

  span{
    font-size: 14px;
    text-align: right;
    color: #4a4a4a;
    margin-right: 10px;
    position: relative;
  }

  ${({ theme }) => theme.categoriesFilterMobile`
    margin-top: 0px;
    position: relative;
    text-align: right;
    top: 7px;
    margin-bottom: 30px;
 `}

 ${({ theme }) => theme.tablet`
    margin-right: 10px;
 `}
}`

export default ExploreFiltersSwitch;
