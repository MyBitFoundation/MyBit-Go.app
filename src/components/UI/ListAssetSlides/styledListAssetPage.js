import styled from 'styled-components';

export const Slide = styled.div`
    position: relative;
    min-height: 469px;
    width: 100%;
    max-width: 426px;
    .Slider__header {
        font-family: 'Gilroy';
        font-size: 30px;
        line-height: 37px;
        font-weight: bold;
        padding: 25px 40px 0px 40px;
        margin: 0px;
        text-align: center;
        @media(max-width: 500px) {
            line-height: normal;
            padding: 20px 20px 0px 20px;
        }
    }
    .Slider__note {
        margin-top: 8px;
        font-family: Roboto;
        line-height: normal;
        font-size: 14px;
        text-align: center;
        padding: 0px 30px;
        @media(max-width: 500px) {
            padding: 0px 20px 0px 20px;
        }
    }
    .Slider__buttons {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 24px;
        padding: 0 40px;
        &-continue {
            min-width: 154px;
            font-weight: 500;
            float: right;
        }
        &-back {
            font-weight: 500;
            float: left;
        }
        &-centered {
            min-width: 154px;
            font-weight: 500;
        }
    }
    .Slider__tooltip {
        opacity: 0;
        position: absolute;
        width: 20px;
        height: 20px;
        font-size: 10px;
        top: 8px;
        right: 8px;
        transition: all 0.5s;
    }
    &:hover {
        .Slider__tooltip {
            opacity: 1;
            transition: all 0.5s;
        }
    }
    .Slider__img {
        margin: 0px auto;
        padding: 10px;
        &--myb {
            margin: 0px auto;
            padding: 30px 0px 26px 0px;
        }
    }
    .Slider__input {
        &-container {
            padding: 10px 50px 0px 50px;
            > .ant-input {
                color: #4A4A4A;
                margin: 5px 0px;
            }
            > .ant-select {
                color: #4A4A4A;
                margin: 5px 0px;
                width: 100%;
            }
            > .ant-input-number {
                width: 100%;
            }
        }
        &-label {
            padding: 24px 0px 8px 0px;
        }
        &-fee {
            padding: 30px 50px 0px 50px;
            > .ant-slider {
                margin: 0px 0px 27px 0px;
            }
            > .ant-input-number {
                width: 100%;
            }
        }
    }
    .Slider__upload {
        &-container {
            padding: 25px 21px 0px 21px;
            > .ant-upload-drag-icon {
                font-size: 48px;
            }
        }
        &-content {
            > .ant-upload.ant-upload-drag {
                padding: 10px 0px;
            }
            > .ant-upload-list.ant-upload-list-text {
                overflow-y: scroll;
                max-height: 80px;
            }
        }
    }
    .Slider__input-collateral {
        padding: 20px 36px 0px 36px;
        @media(max-width: 500px) {
            text-align: center;
        }
        > .ant-slider {
            margin: 0px 0px 5px 0px;
        }
        > .ant-input-number {
            width: 168px;
            display: inline-block;
            margin: 5px 0px;
            color: #4A4A4A;
            @media(max-width: 500px) {
                width: 45%;
            }
        }
        > span {
            color: #1890FF;
            margin: 0px 3px;
        }
    }
    .Slider__confirm-information {
        padding: 0px 67px 0px 72px;
        @media(max-width: 500px) {
           padding: 0px 30px 0px 30px;
           text-align: center;
        }
        .Slider__confirm-entry {
            padding-bottom: 5px;
            &-title {
                font-weight: bold;
            }
            &-note {
                font-size: 14px;
                line-height: 12px;
            }
            &-file {
              display: block;
            }
        }
    }
`

export const IntroList = styled.div`
    padding-left: 91px;
    padding-right: 48px;
    font-family: Roboto;
    @media(max-width: 500px) {
        padding: 0px 20px 0px 40px;
    }
    .IntroListItem {
        position: relative;
        padding-bottom: 5px;
        &__title {
            font-style: normal;
            font-weight: bold;
            line-height: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
        }
        &__note {
            line-height: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            font-weight: 400;
        }
        &::before {
            content: "•";
            font-size: 28px;
            position: absolute;
            top: -12px;
            left: -22px;
            color: #1890ff;
            @media(max-width: 500px) {
                line-height: normal;
                top: -9px;
                left: -18px;
            }
        }
    }

}`

export const CarouselWrapper = styled.div`
    width: 100%;
    position: relative;
    .Slider__back-button-wrapper {
        position: absolute;
        top: 0px;
        left: 0px;
        @media(max-width: 500px) {
            position: static;
            width: 100%;
            text-align: center;
            margin-top: 20px;
        }
    }
    .ant-carousel {
        min-height: 469px;
        width: 100%;
        max-width: 426px;
        margin: 0px auto;
        overflow: hidden;
        margin-top: 20px;
        box-shadow: 1px 5px 15px 2px rgba(0,0,0,0.1);
        border-radius: 4px;
        .slick-slide {
            padding: 0px;
        }
    }
`

export const SliderNavigation = styled.div`
    text-align: center;
    margin-top: 30px;
    width: 100%;
    .ListAsset-nav-button {
        width: 12px;
        height: 12px;
        padding: 0;
        margin: 0 4px;
        > button:disabled {
            width: 12px;
            height: 12px;
            background-color: #dedede;
        }
    }
    .ListAsset-nav-button.ant-btn-secondary {
        background-color: #dedede;
    }
`

