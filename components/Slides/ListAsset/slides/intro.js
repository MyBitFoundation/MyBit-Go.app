import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselNextButton
} from "components/CarouselSlide/";

export const IntroSlide = ({
  maxWidthDesktop,
  desktopMode,
  onClick,
  dev,
  civic,
}) => (
  <CarouselSlide
    maxWidthDesktop={maxWidthDesktop}
    hasBoxShadow={desktopMode}
    desktopMode={desktopMode}
  >
    {/* <CarouselSlideMainTitle
      isLong
      isSmallMobile
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Ready to list an asset?
    </CarouselSlideMainTitle> */}
    <CarouselSlideParagraph
      isIntro
      isFullWidth
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Here is a list of things you’ll need.
    </CarouselSlideParagraph>
    <CarouselSlideList
      hasDescriptions
      maxWidthDesktop={maxWidthDesktop}
    >
      <li>Location of your asset</li>
      <p>
        Enter a location. For investors, it's important they know exactly where
        the asset is based.
      </p>
      <li>Supporting documents</li>
      <p>
        Additional documents build trust with investors, confirming you have the
        necessary legal and property rights to install the asset.
      </p>
      <li>Calculate your personal management fee</li>
      <p>
        How much will it cost for you to operate the asset? Here, you can
        calculate your fee.
      </p>
      <li>Asset collateral</li>
      <p>
        You’ll need some MyBit tokens to put down as collateral for your asset
        and investors.
      </p>
    </CarouselSlideList>
    {desktopMode && dev && <CarouselNextButton onClick={onClick} />}
  </CarouselSlide>
);
