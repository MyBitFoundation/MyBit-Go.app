const routes = [
  '/',
  '/portfolio',
  '/list-asset',
  '/help',
  '/explore',
  '/transaction-history',
  '/watch-list',
];

const assetPageRegex = new RegExp('(\/asset//\?0x[a-fA-F0-9]{64}$)');

export const handleRedirects = (req, res, handle, app, isAssetPage) => {
  const haveCookies = req.headers && req.headers.cookie;

  // Case where its asset page
  const assetRegex = assetPageRegex.exec(req.path);
  const isAssetUrl = assetRegex && assetRegex.length > 0;
  // Should redirect
  if((routes.includes(req.path) || isAssetUrl) && (!haveCookies || req.headers.cookie.indexOf('mybit_new_user') === -1)){
    const redirectTo = {
      href: req.path,
      as: req.path,
    };

    if(isAssetUrl){
      const assetId = req.path.substring(req.path.indexOf('0x'), req.path.length);
      redirectTo.href = `/asset?id=${assetId}`;
    }
    // case where first visit is list-asset, needs to go to /asset-manager that redirects to list-asset
    else if(req.path === '/list-asset' && (!haveCookies || req.headers.cookie.indexOf('mybit_list_asset') === -1)){
      redirectTo.href = `/asset-manager`;
      redirectTo.as = `/asset-manager`;
    }
    // it's a regular page
    return app.render(req, res, "/onboarding", {redirectTo})
  } else if(isAssetPage){
    /*
    * I haven't digged into why we need to do this but if we handle it here
    * then SSR stops working for the asset page. We need to return null and let the
    * router handler handle it.
    */
    return null;
  } else if(req.path === '/'){
    return app.render(req, res, "/explore");
  } else {
    return handle(req, res)
  }
}
