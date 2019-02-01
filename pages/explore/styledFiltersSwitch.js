import styled from 'styled-components';

const StyledFiltersSwitch = styled.div`
  position: relative;
  margin-right: 10px;
  margin-bottom: 30px;
  text-align: right;
  top: 7px;


  span{
    font-family: Roboto;
    font-size: 14px;
    text-align: right;
    color: #4a4a4a;
    margin-right: 10px;
    position: relative;
  }

  .ant-switch span{
    color: white;
  }

  @media(max-width: ${props => props.breakpoints.categoriesFilterTablet}){
    padding-top: 0px;
    text-align: right;
    margin-right: 10px;
    margin-left: 0px;
  }

  @media(max-width: ${props => props.breakpoints.categoriesFilterMobile}){
    padding-top: 50px;
    text-align: left;
    margin-left: 10px;
  }
}`

export default StyledFiltersSwitch;
