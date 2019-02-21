export const fetchWithCache = async (url, propertyName, instance) => {
  const request = await fetch(url);
  const etag = request.headers.get('etag');
  let isCached = true;
  let data;
  if((instance[propertyName] !== etag) || !etag){
    data = await request.json();
    instance[propertyName] = etag;
    isCached = false;
  }
  return {
    data,
    isCached,
  }
}
