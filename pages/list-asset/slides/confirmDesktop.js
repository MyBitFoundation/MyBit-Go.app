import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselNextButton,
} from 'components/CarouselSlide/';
import AlertMessage from 'ui/AlertMessage';

const InformationWrapper = styled.div`
  b{
    font-size: 16px;
    font-weight: 500;
  }

  p{
    font-size: 14px;
  }

  ${({theme}) => theme.tablet`
    width: 90%;
    margin: 0 auto;
  `}
`;

const AlertMessageWrapper = styled.div`
  .ant-alert{
    padding: 8px 10px 8px 37px;
  }

  .ant-alert-message p {
    margin: 0px 0px !important;
  }

`

export const ConfirmSlideDesktop = ({
  formData,
  isUserListingAsset,
  setUserListingAsset,
  listedAssetId,
  maxWidthDesktop,
  error,
  onClick,
  nextButtonDisabled,
}) => {
  return (
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
      hasBoxShadow
      desktopMode
    >
      <CarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Confirm with MetaMask
      </CarouselSlideMainTitle>
      <InformationWrapper>
        <p>Check if all the information is correct. Afterwards, confirm the payment in MetaMask.</p>
        <p>Click on the steps if you want to change any information.</p>
        <p>We use Kyber for handling token conversions.</p>
        <p>Please note you are required to have some Ethereum to cover the gas costs.</p>
        {error && (
          <AlertMessageWrapper>
            <AlertMessage
              type="error"
              message={error}
              showIcon
              closable={false}
            />
          </AlertMessageWrapper>
        )}
        <CarouselNextButton
          onClick={onClick}
          disabled={nextButtonDisabled || error}
          loading={isUserListingAsset}
          style={{
            marginTop: '176px',
          }}
        >
          Confirm & List Asset
        </CarouselNextButton>
      </InformationWrapper>
    </CarouselSlide>
  );
}
