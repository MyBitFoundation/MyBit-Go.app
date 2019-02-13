import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
  StyledCarouselSlideList,
  StyledCarouselTooltip,
} from 'components/CarouselSlide/';


export const IntroSlide = () => (
  <StyledCarouselSlide>
    <StyledCarouselTooltip
      title="(no preview on figma)"
    >
    </StyledCarouselTooltip>
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      Ready to list an asset?
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isIntro
      isFullWidth
    >
      Here is a list of things you’ll need to list your asset.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideList
      hasDescriptions
    >
      <li>A Civic account</li>
      <p>
        Login securely using your Civic account. You can create one{" "}
        <a
          href="https://www.civic.com/app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>.
      </p>
      <li>Location of your asset</li>
      <p>
        Enter a location. For investors, it's important they know exactly
        where the asset is based.
      </p>
      <li>Supporting documents</li>
      <p>
        Additional documents build trust with investors, confirming you have
        the necessary legal and property rights to install the asset.
      </p>
      <li>
        Calculate your personal management fee
      </li>
      <p>
        How much will it cost for you to operate the asset? Here, you can
        calculate your fee.
      </p>
      <li>Asset collateral</li>
      <p>
        You’ll need some MyBit tokens to put down as collateral for your asset
        and investors.
      </p>
    </StyledCarouselSlideList>
  </StyledCarouselSlide>
);
