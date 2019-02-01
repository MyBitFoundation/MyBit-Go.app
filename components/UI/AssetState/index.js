import PropTypes from 'prop-types';
import StyledAssetState from './styledAssetState';
import StyledCalendarIcon from './styledCalendarIcon';

const AssetState = ({ endingAt }) => (
  <StyledAssetState>
    <StyledCalendarIcon />
    <p>{endingAt}</p>
  </StyledAssetState>
);


export default AssetState;
