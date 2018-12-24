import React from 'react';
import { Link } from 'react-router-dom';

export const getContentForNotification = (obj) => {
  const {
    listAssetProps,
    metamaskProps,
    fundingProps,
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
          message: 'Unfortunately your transaction failed. Please try again.',
        }
      default:
        return null;
    }
  } else if(fundingProps){
      switch(status){
        case 'success':
          return {
            title: <span style={{marginRight: '10px'}}>Contributed successfuly to {fundingProps.assetName}</span>,
            message: (
                <React.Fragment>
                  <span >Amount contributed: <span style={{fontWeight: 600}}>{fundingProps.amount}</span></span>
                  {window.location.pathname.includes('portfolio') ? <p>{' '}</p> : (
                    <Link
                      to={'/portfolio'}
                      href={'/portfolio'}
                      style={{display: 'block', textAlign: 'right'}}
                    >
                      Go to Portfolio
                    </Link>
                    )
                  }
                </React.Fragment>
              )
          }
        case 'info':
          return {
            title: `Contributing ${fundingProps.amount} to ${fundingProps.assetName}`,
            message: 'It may take several minutes for this action to be processed by the Ethereum Network. Meanwhile, you can explore the platform.',
          }
        case 'error':
          return {
            title: `Failed to contribute to ${fundingProps.assetName}`,
            message: 'Unfortunately your transaction failed. Please try again.',
          }
        default:
          return null;
      }
  } else if(metamaskProps){
    const { operationType } = metamaskProps;
    switch(operationType){
      case 'list-asset':
        switch(status) {
          case 'info':
            return {
              title: `Creation of crowdsale for ${metamaskProps.assetName}`,
              message: 'Please confirm the transaction in Metamask to start the crowdsale. Thank you for beta testing the platform.',
            }
          case 'error':
            return undefined;
          default:
            return null;
        }
      case 'contribution':
        switch(status) {
          case 'info':
            return {
              title: `Contributing to ${metamaskProps.assetName}`,
              message: 'Please confirm the transaction in Metamask to contribute to the crowdsale. Thank you for beta testing the platform.',
            }
          case 'error':
            return undefined;
          default:
            return null;
        }
      default:
        return null;
    }
  }
}
