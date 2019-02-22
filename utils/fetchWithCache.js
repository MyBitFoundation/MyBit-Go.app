export const fetchWithCache = async (url, propertyName, instance) => {
  const response = await fetch(url);
  const etag = response.headers.get('etag');
  let isCached = true;
  let data;

  if((instance[propertyName] !== etag) || !etag){
    data = await response.json();
    instance[propertyName] = etag;
    isCached = false;
  }
  return {
    data,
    isCached,
  }
}
