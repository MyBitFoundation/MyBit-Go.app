export const PULL_ASSETS_TIME = 1000 * 60;
export const PULL_CATEGORIES_TIME = 1000 * 60;

export const AIRTABLE_ASSETS_RULES = [
  'Asset',
  'Category',
  'Description',
  'Details',
  'Funding goal',
  'Image URL',
  'Partner',
  'Partner Address',
];

export const AIRTABLE_CATEGORIES_RULES = [
  'Category',
  'byte32',
  'Category Contract',
];

// make sure the data from airtable is correct
// and that every required field is filled
export const verifyDataAirtable = (rules, records) => {
  return records.filter(({ fields }) =>
    rules.every(field => {
      const valueOfField = fields[field];
      return Object.keys(fields).includes(field) && valueOfField;
    }
  ))
}
