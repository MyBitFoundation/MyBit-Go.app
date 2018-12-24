import React from 'react';
import { Link } from 'react-router-dom';

export const getContentForNotification = (obj) => {
  const {
    listAssetProps,
    metamaskProps,
    status
  } = obj;
  if(listAssetProps){
    switch (status) {
      case 'success':
        return {
          title: <span style={{marginRight: '10px'}}>Started crowdsale for {listAssetProps.assetName} successfully</span>,
          message: <span>You can find the asset listing
            <Link
              href={`/explore/${listAssetProps.assetId}`}
              to={`/explore/${listAssetProps.assetId}`}
            >
            {' '}here.
            </Link></span>,
        }
      case 'info':
        return {
          title: `Starting the crowdsale for ${listAssetProps.assetName}`,
          message: 'This action can take several minutes. This message will update as soon as the transaction is processed.',
        }
      case 'error':
        return {
          title: `Failed to start the crowdsale for ${listAssetProps.assetName}`,
          message: 'Unfortunately your transaction failed.',
        }
      default:
        return null;
    }
  } else if(metamaskProps){
    switch(status) {
      case 'info':
        return {
          title: `Creation of crowdsale for ${metamaskProps.AssetName}`,
          message: 'Please confirm the transaction in Metamask to start the crowdsale. Thank you for beta testing the platform.',
        }
      case 'error':
        return undefined;
      default:
        return null;
    }
  }
}
