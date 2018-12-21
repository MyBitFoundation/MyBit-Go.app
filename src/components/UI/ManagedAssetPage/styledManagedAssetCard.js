import styled from 'styled-components';

export const ManagedAssetCardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    .ManagedAsset__Card {
        margin: 20px 51px 10px 0px;
        &:nth-child(3n+3) {
            margin-right: 0px;
        }
        &-header {
            position: relative;
            height: 190px;
            width: 419px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            &-image {
                position: absolute;
                left: 0;
                top: 0;
                height: 190px;
                width: 419px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
            &-title {
                position: absolute;
                left: 20px;
                bottom: 35px;
                color: #ffffff;
                font-family: "Roboto";
                font-style: bold;
                font-size: 18px;
                line-height: 21px;
            }
            &-location {
                position: absolute;
                left: 20px;
                bottom: 13px;
                color: #ffffff;
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: normal;
                font-size: 14px;
                &-icon {
                    margin-right: 8px;
                }
            }
        }
        &-content {
            height: 226px;
            width: 419px;
            background: #F9F9F9;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            padding: 10px 10px 15px 10px;
            position: relative;
            &-bottom-left {
                position: absolute;
                bottom: 21px;
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                line-height: normal;
                font-size: 16px;
            }
            &-button {
                position: absolute;
                right: 10px;
                bottom: 15px;
                > * {
                    font-family: Roboto;
                    line-height: 22px;
                    font-size: 14px;
                    text-align: center;
                    padding: 5px 0px;
                    min-width: 150px;
                }
            }
            &-value {
                display: flex;
                justify-content: space-between;
                &-card {
                    font-family: Roboto;
                    border-radius: 4px;
                    background-color: #ffffff;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    line-height: 22px;
                    height: 40px;
                    justify-content: space-between;
                    align-items: center;
                    padding: 3px 3px 3px 9px;
                    margin-bottom: 5px;
                    &:nth-child(1) {
                        width: 46%;
                    }
                    &:nth-child(2) {
                        width: 50%;
                    }
                    b {
                        font-weight: 500;
                        min-width: 51px;
                        text-align: center;
                        font-size: 16px;
                        line-height: 19px;
                        color: rgba(0, 0, 0, 0.65);
                    }
                    &--is-green {
                        color: #2db84b !important;
                        background-color: #F6FFED;
                        border-radius: 4px;
                        padding: 8px 5px 7px 5px;
                    }
                    &--is-blue {
                        color: #1890FF !important;
                        background-color: rgba(24, 144, 255, 0.1);
                        border-radius: 4px;
                        padding: 8px 5px 7px 5px;
                    }
                } 
            }
            &-data {
                &-row {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    line-height: 22px;
                    justify-content: space-between;
                    align-items: center;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: normal;
                    font-size: 16px;
                    padding: 5px 0px;
                }
                &--is-bold {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    line-height: normal;
                    font-size: 16px;
                    color: #595959;
                }
                &--is-progress {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    line-height: normal;
                    font-size: 16px;
                    color: #bbbbbb;
                }
                &-separator {
                    background-color: rgba(0, 0, 0, 0.09);
                    width: 1px;
                    height: 14px;
                    display: inline-block;
                    margin: 0px 7px;
                }
            }
        }
    }
`