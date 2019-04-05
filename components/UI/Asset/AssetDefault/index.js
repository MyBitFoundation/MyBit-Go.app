import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Progress,
  Icon,
} from 'antd';
import{
  DEFAULT_TOKEN,
} from 'constants/app';
import AssetDefaultDetailsContainer from './assetDefaultDetailsContainer';
import AssetDefaultFunded from './assetDefaultFunded';
import AssetDefaultGoal from './assetDefaultGoal';
import AssetDefaultContributeButton from './assetDefaultContributeButton';
import { formatMonetaryValue } from 'utils/helpers';

const AssetDefault = ({
  fundingGoal,
  fundingProgress,
  pastDate,
  funded,
  assetId,
  clickHandler,
}) => {
  const barWidth = funded ? 100 : Math.ceil((fundingProgress * 100) / fundingGoal);
  const goalFormatted = formatMonetaryValue(fundingGoal);
  const progressFormatted = formatMonetaryValue(fundingProgress);
  let buttonText = 'Contribute';
  let buttonType = 'primary';
  if (funded || pastDate) {
    buttonText = 'View Asset';
    buttonType = 'default';
  }

  return (
    <AssetDefaultDetailsContainer
      barWidth={barWidth}
    >
      <AssetDefaultFunded>
        Funded:{' '}
        <b>{progressFormatted}</b>
      </AssetDefaultFunded>
      <AssetDefaultGoal>
        Goal:{' '}
        <b>{goalFormatted}</b>
      </AssetDefaultGoal>
      <div>
        <Progress percent={barWidth} />
        {barWidth === 100 && (
          <Icon
            type="check-circle"
            theme="filled"
          />
        )}
      </div>

      <Link
        as={`/asset/${assetId}`}
        href={`/asset?id=${assetId}`}
      >
        <AssetDefaultContributeButton
          type={buttonType}
          onClick={
            clickHandler ||
            (() => debug(`Clicked to contribute, asset id: ${assetId}`))
          }
        >
          {buttonText}
        </AssetDefaultContributeButton>
      </Link>
    </AssetDefaultDetailsContainer>
  )
};

export default React.memo(AssetDefault)
