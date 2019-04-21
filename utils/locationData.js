const allowedFields = ['country', 'locality', 'postal_code', 'route']
export const processLocationData = (addresses, wantedFields) => {
  if(!Array.isArray(wantedFields) || (Array.isArray(wantedFields) && wantedFields.length === 0)){
    throw Exception('processLocationData() needs to be passed the wanted fields');
  }
  const foundFields = [];
  const toReturn = {};

  for(const address of addresses){
    const {
      types,
      address_components,
    } = address;

    for(const wantedField of wantedFields){
      if(!foundFields.includes(wantedField) && types.includes(wantedField)){
        if(Array.isArray(address_components)){
          for(const specificAddress of address_components){
            if(specificAddress.types.includes(wantedField)){
              toReturn[wantedField] = specificAddress['long_name'];
              foundFields.push(wantedField)
            }
          }
        }
        else {
          toReturn[wantedField] = address['long_name'];
          foundFields.push(wantedField)
        }
      }
    }
  }
  return toReturn;
}
