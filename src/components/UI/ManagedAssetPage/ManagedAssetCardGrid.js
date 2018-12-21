import React from 'react';
import Button from 'antd/lib/button';
import { ManagedAssetCardsWrapper } from './styledManagedAssetCard';
import LocationIcon from '../../../images/Location-icon.png';

const img_url = "https://habrastorage.org/getpro/habr/post_images/d46/5ff/5c8/d465ff5c80609a9d042754bdc3733797.jpg"

export const ManagedAssetCardGrid = ({ assets }) => (
    <ManagedAssetCardsWrapper>
        {[...Array(5)].map((e, i) => (
        <div className="ManagedAsset__Card" key={i}>
            <div className="ManagedAsset__Card-header">
                <img src={img_url} className="ManagedAsset__Card-header-image" />
                <div className="ManagedAsset__Card-header-title">
                    Bitcoin ATM
                </div>
                <div className="ManagedAsset__Card-header-location">
                    <img src={LocationIcon} className="ManagedAsset__Card-header-location-icon" />
                    Zug, Switzerland
                </div>
            </div>
            <div className="ManagedAsset__Card-content">
                <div className="ManagedAsset__Card-content-value">
                    <div className="ManagedAsset__Card-content-value-card">
                        Asset value
                        <b className="ManagedAsset__Card-content-value-card--is-green">$2049.53</b>
                    </div>
                     <div className="ManagedAsset__Card-content-value-card">
                        Asset revenue
                        <b className="ManagedAsset__Card-content-value-card--is-blue">$2049.16</b>
                    </div>
                </div>
                <div className="ManagedAsset__Card-content-data">
                    <div className="ManagedAsset__Card-content-data-row">
                        Your management fee:
                        <div className="ManagedAsset__Card-content-data-row-right">
                            <b className="ManagedAsset__Card-content-data--is-progress">Funding in progress</b>
                            <div className="ManagedAsset__Card-content-data-separator" />
                            <b className="ManagedAsset__Card-content-data--is-bold">5%</b>
                        </div>
                    </div>
                    <div className="ManagedAsset__Card-content-data-row">
                        Total profit:
                        <div className="ManagedAsset__Card-content-data-row-right">
                            <b className="ManagedAsset__Card-content-data--is-progress">Funding in progress</b>
                        </div>
                    </div>
                    <div className="ManagedAsset__Card-content-data-row">
                        Availabe for Withdraw:
                        <div className="ManagedAsset__Card-content-data-row-right">
                            <b className="ManagedAsset__Card-content-data--is-progress">Funding in progress</b>
                        </div>
                    </div>
                </div>
                <div className="ManagedAsset__Card-content-bottom-left">
                    Funded: <b>$5,600</b>/$7,000
                </div>
                <div className="ManagedAsset__Card-content-button">
                    <Button>View asset listing</Button>
                </div>
            </div>
        </div>
        ))}
    </ManagedAssetCardsWrapper>
)