export const ARTIFICIAL_DELAY_IN_MS = 3000;
export const USD_MYB_SYMBOL = 'USD/MYB';
export const noop = () => {};
export const debug =
  process.env.NODE_ENV === 'DEVELOPMENT'
    ? variable => console.log(variable)
    : () => {};
