export const PULL_ASSETS_TIME = 1000 * 60;

export const AIRTABLE_ASSET_MODELS = [
  'Asset',
  'Category',
  'Funding Goal',
  'Image',
  'Model ID',
];

export const AIRTABLE_ASSET_LISTINGS = [
  'Asset ID',
  'Model ID',
  'Financials',
  'Risks',
  'About',
  'City',
  'Country',
  'Collateral Percentage',
  'Route',
  'Province',
  'Postal Code',
];

export const AIRTABLE_OPERATORS = [
  'Name',
  'Address',
];

// make sure the data from airtable is correct
// and that every required field is filled
export const verifyDataAirtable = (rules, records) => {
  if(!records) return {};
  return records.filter(({ fields }) =>
    rules.every(field => {
      const valueOfField = fields[field];
      return Object.keys(fields).includes(field) && valueOfField !== undefined;
    }
  ))
}
