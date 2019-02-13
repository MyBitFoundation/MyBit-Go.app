import { css } from 'styled-components';

export const Sizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
  categoriesFilterMobile: 500,
  categoriesFilterTablet: 900,
  carouselWithNavigationOnboardingMinWidth: 600,
  carouselWithNavigationMobile: 600,
};

export const MediaQueries = Object.keys(Sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (min-width: ${Sizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {});
