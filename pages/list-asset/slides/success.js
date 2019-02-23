import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Button,
} from 'antd';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
} from 'components/CarouselSlide/';

import SuccessEarth from "static/list-asset/success-list-asset-earth.svg";
import SuccessCheckmark from "static/list-asset/success-list-asset.svg";

const Earth = styled(SuccessEarth)`
  margin: 0 auto;
  display: block;
`

const Checkmark = styled(SuccessCheckmark)`
  margin: 0 auto;
  display: block;
  margin-bottom: 20px;
  margin-top: 20px;
`

const StyledButton = styled(Button)`
  margin: 0 auto;
  margin-top: 60px;
  display: block;
  font-weight: 500;
`

export const SuccessSlide = ({
  maxWidthDesktop,
  assetId,
}) => (
  <StyledCarouselSlide
    maxWidthDesktop={maxWidthDesktop}
  >
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Listing confirmed
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Your asset has been succesfully listed. <br />You can access it{' '}
      <Link
        as={`/asset/${assetId}`}
        href={`/asset?id=${assetId}`}
      >here</Link>.
    </StyledCarouselSlideParagraph>
    <Checkmark />
    <Earth />
    <Link
      href="/explore"
      style={{
        width: 'max-content',
        textAlign: 'center',
        display: 'block',
        margin: '0 auto',
      }}
    >
      <StyledButton
        type="primary"
      >
        Go to Explore
      </StyledButton>
    </Link>

  </StyledCarouselSlide>
);
