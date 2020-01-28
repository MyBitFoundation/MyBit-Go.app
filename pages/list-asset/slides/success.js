import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Button as ButtonAnt,
} from 'antd';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
} from 'components/CarouselSlide/';

import SuccessEarth from "public/list-asset/success-list-asset-earth.svg";
import SuccessCheckmark from "public/list-asset/success-list-asset.svg";

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

const Button = styled(ButtonAnt)`
  margin: 0 auto;
  margin-top: 60px;
  display: block;
  font-weight: 500;
`

export const SuccessSlide = ({
  maxWidthDesktop,
  assetId,
  desktopMode,
}) => (
  <CarouselSlide
    maxWidthDesktop={maxWidthDesktop}
    hasBoxShadow={desktopMode}
    desktopMode={desktopMode}
  >
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Listing confirmed
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      isCentered
      maxWidthDesktop={maxWidthDesktop}
    >
      Your asset has been succesfully listed. <br />You can access it{' '}
      <Link
        as={`/asset/${assetId}`}
        href={`/asset?id=${assetId}`}
      ><a>here</a></Link>.
    </CarouselSlideParagraph>
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
      <Button
        type="primary"
      >
        Go to Explore
      </Button>
    </Link>

  </CarouselSlide>
);
