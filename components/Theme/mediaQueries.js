import { css } from 'styled-components';

/*
* Keep any custom breakpoints you need here.
* Please try not to have custom breakpoints.
*/
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
  headerHeightMobile: 50,
  headerHeightTablet: 90,
  marginTopPageWrapper: 25,
};

export const MediaQueries = Object.keys(Sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (min-width: ${Sizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {});
