import styled from 'styled-components';

export const Slide = styled.div`
    position: relative;
    min-height: 469px;
    width: 100%;
    max-width: 426px;
    .Slider__header {
        font-family: 'Gilroy';
        font-size: 30px;
        line-height: 29px;
        font-weight: bold;
        padding: 24px 27px 0px 27px;
        margin: 0px;
        text-align: center;
        color: #000000;
    }
    .Slider__buttons {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 24px;
        padding: 0 24px;
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
    .Slider__IntroNote {
        line-height: normal;
        font-family: Roboto;
        font-weight: bold;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        padding: 22px 56px 0px 91px;
        margin: 0;
    }
    .Slider__ListItem {
        line-height: normal;
        font-family: Roboto;
        font-weight: normal;
        font-size: 12px;
        margin: 15px 0px 0px 0px;
        color: rgba(0, 0, 0, 0.65);
        padding: 0px 48px 0px 91px;
        position: relative;
        &::before {
            content: "•";
            font-size: 28px;
            position: absolute;
            top: -10px;
            left: 70px;
            color: #1890ff;
        }
    }
    .Slider__img-wrapper {
        width: 100%;
        padding: 31px 0px 15px 0px;
        > .Slider__img-tools {
            width: 155px;
            height: 99px;
            margin: 0px auto;
        }
        > .Slider__img-myb {
            width: 59px;
            height: 70px;
            margin: 0px auto;
        }
    }
    .Slider__paragraph-wrapper {
        padding-top: 25px;
    }
    .Slider__paragraph {
        padding: 0px 69px 15px 69px;
        font-family: Roboto;
        line-height: normal;
        font-size: 12px;
        margin: 0;
        color: rgba(0, 0, 0, 0.65);
        &--last-slide {
            padding: 0px 61px 15px 78px;
            font-family: Roboto;
            line-height: normal;
            font-size: 12px;
            margin: 0;
            color: rgba(0, 0, 0, 0.65);
        }
    }
    
`

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