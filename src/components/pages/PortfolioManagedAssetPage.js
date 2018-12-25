import React from 'react';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import Tooltip from 'antd/lib/tooltip';
import {
    ManagedAssetWrapper,
    FlexRowTwoItems,
    AssetValueRow,
    EqualBoxes,
    EqualBoxesWithShadow,
    CollateralBar
} from '../UI/ManagedAssetPage/styledManagedAssetPage'
import LocationIcon from '../../images/Location-blue.svg';
import PieChart from '../../images/chart-pie.png';
import LineChart from '../../images/chart-line.png';
import Fee from '../../images/Fee.png';

const ButtonGroup = Button.Group;

class PortfolioManagedAssetPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayProfit = this.displayProfit.bind(this);
        this.displayCollateral = this.displayCollateral.bind(this);
        this.state = {
            chartBoxView: "profit",
        };
    }

    displayProfit() {
        this.setState({ chartBoxView: "profit" });
    }

    displayCollateral() {
        this.setState({ chartBoxView: "collateral" });
    }

    render() {
        return (
            <ManagedAssetWrapper>
                <div className="ManagedAsset__alert-row">
                    <div className="ManagedAsset__back-column">
                        <Button>Back</Button>
                    </div>
                    <div className="ManagedAsset__alert-column">
                        <Alert className="ManagedAsset__alert" message="This is an success message from MyBit." type="success" showIcon closable />
                    </div>
                </div>

                <div className="ManagedAsset__content-wrapper">
                    <div className="ManagedAsset__content-column">
                        <FlexRowTwoItems>
                            <div><h1 className="ManagedAsset__asset-title">Bitcoin ATM</h1></div>
                            <div>
                                <Button className="ManagedAsset__button--margin-right">Sell on MYDAX</Button>
                                <Button className="ManagedAsset__button">View asset listing</Button>
                            </div>
                        </FlexRowTwoItems>
                        <FlexRowTwoItems>
                            <div><h2 className="ManagedAsset__asset-meta">
                                <LocationIcon className="ManagedAsset__location-icon" />
                                Zug, Switzerland
                            </h2></div>
                            <div><h2 className="ManagedAsset__asset-meta">Manufacturer company (Partner Name)</h2></div>
                        </FlexRowTwoItems>
                        <img
                            className="ManagedAsset__asset-image"
                            src="https://i2.wp.com/smartereum.com/wp-content/uploads/2017/11/hyosung-bitcoin-atm-korea-e1522530212417.png?resize=696%2C348&ssl=1"
                            alt="Asset Preview"
                        />
                        <AssetValueRow>
                            <div className="AssetValueRow__Card">
                                <img className="AssetValueRow__Card-img-pie-chart" src={PieChart} alt="Line chart" />
                                Asset Value
                                <div className="AssetValueRow__Card-box-separator" />
                                <b className="AssetValueRow__Card-value--is-blue">$2049.53</b>
                            </div>
                            <div className="AssetValueRow__Card">
                                <img className="AssetValueRow__Card-img-line-chart" src={LineChart} alt="Line chart" />
                                Asset Revenue
                                <div className="AssetValueRow__Card-box-separator" />
                                <b className="AssetValueRow__Card-value--is-green">$5030.63</b>
                            </div>
                            <div className="AssetValueRow__Card">
                                <img className="AssetValueRow__Card-img-pie-chart" src={Fee} alt="Line chart" />
                                Fee
                                <div className="AssetValueRow__Card-box-separator" />
                                <b className="AssetValueRow__Card-value--is-blue">5%</b>
                            </div>
                        </AssetValueRow>
                        <EqualBoxes>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Total profit</div>
                                <div className="AssetBoxedRow__Card-text--is-green">1200.67$</div>
                                <div className="AssetBoxedRow__Card-text">12 ETH</div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Average profit</div>
                                <div className="AssetBoxedRow__Card-text--is-blue">23.77$</div>
                                <div className="AssetBoxedRow__Card-text">0.3 ETH</div>
                                <div className="AssetBoxedRow__Card-text-bottom">Daily</div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title-rows">Available to <br />withdraw</div>
                                <div className="AssetBoxedRow__Card-text--is-green">150.77$</div>
                                <div className="AssetBoxedRow__Card-text">1.3 ETH</div>
                                <div className="AssetBoxedRow__Card-button">
                                    <Button type="primary">Withdraw</Button>
                                </div>
                            </div>
                        </EqualBoxes>
                    </div>
                    <div className="ManagedAsset__content-column">
                        <EqualBoxesWithShadow>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Total profit</div>
                                <div className="AssetBoxedRow__Card-text--is-green">1200.67$</div>
                                <div className="AssetBoxedRow__Card-text">12 ETH</div>
                                <div className="AssetBoxedRow__Card-button-group">
                                    <ButtonGroup size="small">
                                        <Button onClick={this.displayProfit}>1W</Button>
                                        <Button onClick={this.displayProfit}>1M</Button>
                                        <Button onClick={this.displayProfit}>1Y</Button>
                                        <Button onClick={this.displayProfit}>MAX</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Collateral</div>
                                <div className="AssetBoxedRow__Card-text--is-blue">2000.00$</div>
                                <div className="AssetBoxedRow__Card-text">65,000 MYB</div>
                                <div className="AssetBoxedRow__Card-button">
                                    <Button type="secondary" onClick={this.displayCollateral}>View</Button>
                                </div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title-rows">Supporting documents</div>
                                <div className="AssetBoxedRow__Card-documents">
                                    <p>property.docx</p>
                                    <p>more_documents.pdf</p>
                                </div>
                            </div>
                        </EqualBoxesWithShadow>
                        <div className="ManagedAsset__graphics">
                            {this.state.chartBoxView === "profit" && (
                                <div className="ManagedAsset__chart-container">
                                    chart
                                </div>
                            )}
                            {this.state.chartBoxView === "collateral" && (
                                <div className="ManagedAsset__collateral-container">
                                    <div className="ManagedAsset__collateral-title">
                                        Asset collateral
                                    </div>
                                    <div className="ManagedAsset__collateral-description">
                                        Once asset revenue supasses the asset value you can withdraw your asset collateral.
                                    </div>
                                    <div className="ManagedAsset__collateral-bars">
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">25%</div>
                                            <CollateralBar percentage="172px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">Ready to withdraw</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Button type="primary">Withdraw</Button>
                                            </div>
                                        </div>
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">50%</div>
                                            <CollateralBar percentage="42px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">$1,859/2,800</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Tooltip
                                                    title="Once asset revenue reaches $4,200 you can withdraw (25% of collateral) MYB."
                                                >
                                                    <Button type="secondary" disabled>Withdraw</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">75%</div>
                                            <CollateralBar percentage="0px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">$0/4,200</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Tooltip
                                                    title="Once asset revenue reaches $4,200 you can withdraw (25% of collateral) MYB."
                                                >
                                                    <Button type="secondary" disabled>Withdraw</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">100%</div>
                                            <CollateralBar percentage="0px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">$0/5,600</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Tooltip
                                                    title="Once asset revenue reaches $4,200 you can withdraw (25% of collateral) MYB."
                                                >
                                                    <Button type="secondary" disabled>Withdraw</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ManagedAssetWrapper>
        )
    }
}

export default PortfolioManagedAssetPage;