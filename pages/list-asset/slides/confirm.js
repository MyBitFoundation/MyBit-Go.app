import styled from 'styled-components';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
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

const StyledAlertMessage = styled.div`
  .ant-alert{
    padding: 8px 10px 8px 37px;
  }

  .ant-alert-message p {
    margin: 0px 0px !important;
  }

`

export const ConfirmSlide = ({
  formData,
  isUserListingAsset,
  setUserListingAsset,
  listedAssetId,
  maxWidthDesktop,
  error,
}) => {
  return (
    <StyledCarouselSlide>
      <StyledCarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
      Confirm information
    </StyledCarouselSlideMainTitle>
      <StyledCarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Please confirm your asset information below.
      </StyledCarouselSlideParagraph>
      <InformationWrapper>
        <section>
          <b>Location</b>
          <p>
            {formData.userCity === "" ? "[city missing]" : formData.userCity}/
            {formData.userCountry === ""
              ? "[country missing]"
              : formData.userCountry}
          </p>
        </section>
        <section>
          <b>Asset</b>
          <p>
            {formData.asset === "" ? "[asset missing]" : formData.asset}
          </p>
        </section>
        <section>
          <b>Asset location</b>
          <p>
            {formData.assetAddress1 === ""
              ? "[address missing]"
              : formData.assetAddress1}
            {formData.assetAddress2 === "" ? "" : `,${formData.assetAddress2}`}
          </p>
        </section>
        <section>
          <b>Supporting documents</b>
          <p>
            {formData.fileList.length === 0
              ? "[files not uploaded]"
              : formData.fileList.map(file => (
                  <span
                    key={file.name}
                    className="Slider__confirm-entry-file"
                  >
                    {file.name}
                  </span>
                ))}
          </p>
        </section>
        <section>
          <b>Management fee</b>
          <p>
            {formData.managementFee}%
          </p>
        </section>
        <section>
          <b>Asset collateral</b>
          <p>
            {parseFloat(parseFloat(formData.collateralMyb).toFixed(3))} MYB{" "}
            {formData.collateralPercentage}%
          </p>
        </section>
        {error && (
          <StyledAlertMessage>
            <AlertMessage
              type="error"
              message={error}
              showIcon
              closable={false}
            />
          </StyledAlertMessage>
        )}
      </InformationWrapper>
    </StyledCarouselSlide>
  );
}
