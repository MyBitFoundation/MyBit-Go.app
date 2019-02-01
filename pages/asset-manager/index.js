import Router from 'next/router';
import {
  Slides,
} from './slides';

import CarouselWithNavigation from '../../components/UI/CarouselWithNavigation';

const SliderNavigationTooltips = [
  { slide: 0, tooltip: "KYC" },
  { slide: 1, tooltip: "Location" },
  { slide: 2, tooltip: "Select Asset" },
  { slide: 3, tooltip: "Asset Location" },
  { slide: 4, tooltip: "Supporting Documents" },
]

const AssetManager = () => (
  <React.Fragment>
    <CarouselWithNavigation
      navigationTooltips={SliderNavigationTooltips}
      slides={Slides}
      onFinish={() => Router.push("/list-asset")}
      minWidthStyle="426px"
    />
  </React.Fragment>
);

export default AssetManager;
