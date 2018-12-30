import styled from 'styled-components';

export const ManagedAssetWrapper = styled.div`
    > .ManagedAsset__alert-row {
        display: flex;
        flex-wrap: wrap;
        height: 40px;
        justify-content: center;
        align-items: center;
        margin: 19px 0px;
        .ManagedAsset__back-column {
            flex: 1 1 auto;
        }
        .ManagedAsset__alert-column {
            flex: 1 1 auto;
            .ManagedAsset__alert {
                margin-left: auto;
                width: 100%;
                max-width: 616px;
            }
        }
    }

    > .ManagedAsset__content-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 50px;
        .ManagedAsset__content-column {
            flex: 1 1 auto;
            width: 100%;
            min-height: 631px;
            background: #F9F9F9;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 0px 0px 4px 4px;
            &:nth-child(1) {
                max-width: 656px;
                padding: 20px 20px 15px 20px;
            }
            &:nth-child(2) {
                max-width: 663px;
                padding: 24px;
            }
            &
        }
        .ManagedAsset__asset-image {
            margin-bottom: 10px;
            background-size: cover;
            background-position: bottom;
            height: 266px;
            border-radius: 6px;
        }
        .ManagedAsset__graphics {
            background: #FFFFFF;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            height: 392px;
            .ManagedAsset__chart-container {
                padding: 15px 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;

                & canvas{
                  top: 18px;
                  position: relative;
                  cursor: default;
                  left: -22px;
                }
            }
            .ManagedAsset__collateral-container {
                padding: 15px 50px;
                .ManagedAsset__collateral-title {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    font-size: 16px;
                    padding-bottom: 7px;
                }
                .ManagedAsset__collateral-description {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 16px;
                    font-size: 12px;
                }
                .ManagedAsset__collateral-bars {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding-top: 46px;
                    &-column {
                        flex-direction: column;
                        width: 99px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &-percentage {
                            padding-bottom: 10px;
                            font-family: Roboto;
                            font-style: normal;
                            font-weight: bold;
                            line-height: normal;
                            font-size: 14px;
                            color: #595959;
                        }
                        &-status {
                            font-family: Roboto;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                            font-size: 12px;
                            color: #595959;
                            padding: 12px 0px 8px 0px;
                        }
                        &-button {
                            > button {
                                font-family: Roboto;
                                font-style: normal;
                                font-weight: 500;
                                line-height: 22px;
                                font-size: 14px;
                            }
                            > span {
                                > button {
                                    font-family: Roboto;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: 22px;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const CollateralBar = styled.div`
    display: block;
    position: relative;
    height: 172px;
    width: 36px;
    background: #EFEFEF;
    border-radius: 4px;
    .CollateralBar_percentage {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 36px;
        height: ${props => props.percentage}
        background: #1890FF;
        border-radius: 4px;
    }
`

export const FlexRowTwoItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
    > div {}
    .ManagedAsset__asset-title {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        line-height: 40px;
        font-size: 34px;
        padding: 0;
        margin: 0;
        color: #4a4a4a;
    }
    .ManagedAsset__asset-meta {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        font-size: 18px;
        text-align: center;
        color: #4a4a4a;
    }
    .ManagedAsset__button {
        padding: 5px 20px;
        line-height: 22px;
        &--margin-right {
            margin-right: 14px;
            padding: 5px 20px;
            line-height: 22px;
        }
    }
    .ManagedAsset__location-icon {
        margin-right: 9px;
        transform: translate(1px, 3px);
    }
`

export const AssetValueRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .AssetValueRow__Card {
        border-radius: 4px;
        background-color: #ffffff;
        display: flex;
        font-size: 12px;
        line-height: 22px;
        height: 40px;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 3px;
        align-items: center;
        margin: 5px 0;
        &:nth-child(1) {
            width: 35%;
        }
        &:nth-child(2) {
            width: 39%;
        }
        &:nth-child(3) {
            width: 22%;
        }
        b {
            font-weight: 500;
            min-width: 51px;
            text-align: center;
            font-size: 16px;
            line-height: 19px;
            color: rgba(0, 0, 0, 0.65);
        }
        &-value--is-green {
            color: #2db84b !important;
            background-color: #F6FFED;
            border-radius: 4px;
            padding: 8px 10px 7px 10px;
        }
        &-value--is-blue {
            color: #1890FF !important;
            background-color: rgba(24, 144, 255, 0.1);
            border-radius: 4px;
            padding: 8px 10px 7px 10px;
        }
        &-box-separator {
            background-color: rgba(0, 0, 0, 0.09);
            width: 1px;
            height: 14px;
            display: inline-block;
            margin: 0px 7px;
        }
        &-img-line-chart {
            width: 22px;
            margin-right: 10px;
        }
        &-img-pie-chart {
            width: 19px;
            margin-right: 10px;
        }
    }
`

export const EqualBoxes = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .AssetBoxedRow__Card {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 4px;
        width: 200px;
        height: 190px;
        text-align: center;
        padding: 20px;
        position: relative;
        &-title {
            font-weight: bold;
            font-size: 16px;
            color: #575757;
            padding-bottom: 20px;
        }
        &-title-rows {
            font-weight: bold;
            font-size: 16px;
            color: #575757;
            padding-bottom: 10px;
            line-height: 19px;
        }
        &-text {
            padding: 5px 0px;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
        }
        &-text--is-blue {
            padding: 5px 0px;
            font-weight: bold;
            font-size: 16px;
            color: #1890FF;
            line-height: 19px;
        }
        &-text--is-green {
            padding: 5px 0px;
            font-weight: bold;
            font-size: 16px;
            color: #52C41A;
            line-height: 19px;
        }
        &-text-bottom {
            padding-top: 23px;
            font-weight: 500;
            line-height: normal;
            font-size: 14px;
        }
        &-button {
            padding-top: 13px;
            > * {
                width: 162px;
            }
        }
    }
`

export const EqualBoxesWithShadow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    .AssetBoxedRow__Card {
        margin-top: 5px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        background: #FFFFFF;
        border-radius: 4px;
        width: 200px;
        height: 190px;
        text-align: center;
        padding: 20px 13px;
        position: relative;
        &-title {
            font-weight: bold;
            font-size: 16px;
            color: #575757;
            padding-bottom: 20px;
        }
        &-title-rows {
            font-weight: bold;
            font-size: 16px;
            color: #575757;
            padding-bottom: 10px;
            line-height: 19px;
        }
        &-text {
            padding: 5px 0px;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
        }
        &-text--is-blue {
            padding: 5px 0px;
            font-weight: bold;
            font-size: 16px;
            color: #1890FF;
            line-height: 19px;
        }
        &-text--is-green {
            padding: 5px 0px;
            font-weight: bold;
            font-size: 16px;
            color: #52C41A;
            line-height: 19px;
        }
        &-text-bottom {
            padding-top: 23px;
            font-weight: 500;
            line-height: normal;
            font-size: 14px;
        }
        &-button {
            padding-top: 21px;
            > * {
                width: 99px;
            }
        }
        &-button-group {
            padding-top: 29px;
        }
        &-documents {
            padding-left: 18px;
            padding-top: 12px;
            > p {
                text-align: left;
                padding: 0px;
                margin: 0px;
                line-height: 22px;
                color: #1890FF;
            }
        }
    }
`

export const CollateralView = styled.div`
    .
`
