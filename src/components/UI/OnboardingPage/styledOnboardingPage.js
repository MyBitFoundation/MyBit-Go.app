import styled from 'styled-components';

export const CarouselWrapper = styled.div`
    .ant-carousel {
        min-height: 600px;
        width: 100%;
        max-width: 600px;
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

export const Slide = styled.div`
    position: relative;
    min-height: 600px;
    width: 100%;
    max-width: 600px;
    .Onboarding__img {
        &-mybit {
            position: absolute;
            top: 21px;
            right: 40px;
            width: 99px;
            height: 100px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-globe {
            position: absolute;
            top: 28px;
            right: 51px;
            width: 164px;
            height: 152px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-desk {
            position: absolute;
            top: 41px;
            right: 30px;
            width: 190px;
            height: 196px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-key {
            position: absolute;
            top: 46px;
            right: 66px;
            width: 69px;
            height: 52px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-setup {
            position: absolute;
            top: 158px;
            right: 29px;
            width: 77px;
            height: 249px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-safe-graphic {
            margin: 0px auto;
            width: 113px;
            height: 173px;
            padding-top: 5px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-ethereum {
            margin: 0px auto;
            width: 203px;
            height: 168px;
            padding-top: 5px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-smart-contract {
            margin: 0px auto;
            width: 199px;
            height: 198px;
            padding-top: 5px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
    }
    .Onboarding__main-title {
        font-style: normal;
        font-weight: bold;
        line-height: normal;
        font-size: 40px;
        margin: 0px;
        padding: 40px 40px 0px 40px;
        @media(max-width: 600px) {
            font-size: 32px;
            line-height: 38px;
            padding: 20px 20px 0px 20px;
            text-align: center;
        }
        &--long {
            font-size: 35px;
            line-height: 40px;
            font-weight: bold;
            padding: 40px 40px 0px 40px;
            margin: 0px;
            font-style: normal;
            @media(max-width: 600px) {
                font-size: 32px;
                line-height: 38px;
                padding: 20px 20px 0px 20px;
                text-align: center;
            }
        }
        &--blue {
          color: #1890ff;
        }
        &--red {
          color: red;
        }
    }
    .Onboarding__paragraph-title {
        font-family: Roboto;
        font-size: 18px;
        font-weight: bold;
        color: #4a4a4a;
        line-height: normal;
        width: 90%;
        padding: 0px 40px;
        margin: 0px;
        @media(max-width: 600px) {
            width: 100%;
            padding: 0px 20px;
            text-align: center;
        }
        &--big {
            font-size: 20px;
            font-weight: bold;
            color: #4a4a4a;
            width: 80%;
            padding: 8px 40px 10px 40px;
            margin: 0px;
            @media(max-width: 600px) {
                width: 100%;
                padding: 20px 20px 0px 20px;
                text-align: center;
            }
        }
    } 
    .Onboarding__static-img-wrapper {
        width: 100%;
        text-align: center;
    }
    .Onboarding__content-wrapper--pt-15 {
        padding-top: 15px;
    }
    .Onboarding__content-wrapper--pt-20 {
        padding-top: 20px;
    }
    .Onboarding__content-wrapper--pt-30 {
        padding-top: 30px;
    }
    .Onboarding__paragraph {
        font-size: 18px;
        color: #4a4a4a;
        line-height: normal;
        width: 85%;
        padding: 18px 40px 0px 40px;
        margin: 0px;
        line-height: normal;
        @media(max-width: 600px) {
            font-size: 16px;
            width: 100%;
            text-align: justify;
            padding: 18px 20px 0px 20px;
        }
        &-break {
            @media(max-width: 600px) {
                display: none;
            }
        }
        &--intro {
            font-size: 20px;
            color: #4a4a4a;
            line-height: normal;
            width: 75%;
            padding: 20px 40px 15px 40px;
            margin: 0px;
            @media(max-width: 600px) {
                width: 100%;
                font-size: 16px;
                padding: 20px 20px 15px 20px;
                text-align: justify;
            }
        }
        &--no-images {
            font-size: 18px;
            color: #4a4a4a;
            line-height: 22px;
            padding: 0px 40px;
            width: 89%;
            @media(max-width: 600px) {
                font-size: 16px;
                text-align: justify;
                padding: 0px 20px;
                width: 100%;
            }
        }
        &--no-images-full {
            font-size: 18px;
            color: #4a4a4a;
            line-height: 22px;
            width: 97%;
            padding: 0px 40px;
            @media(max-width: 600px) {
                font-size: 16px;
                text-align: justify;
                padding: 0px 20px;
                width: 100%;
            }
        }
        &--no-images--small {
            font-size: 18px;
            color: #4a4a4a;
            line-height: 22px;
            width: 82%;
            padding: 0px 40px;
            @media(max-width: 600px) {
                font-size: 16px;
                text-align: justify;
                padding: 0px 20px;
                width: 100%;
            }
        }
    }
    .Onboarding__buttons {
        position: absolute;
        width: 100%;
        bottom: 20px;
        padding: 0px 20px;
        @media(max-width: 600px) {
            position: static;
            text-align: center;
            padding: 10px;
        }
        &-next {
            font-family: Roboto;
            float: right;
            font-style: normal;
            font-weight: 500;
            line-height: 22px;
            font-size: 14px;
            padding-right: 8px;
            padding-left: 16px;
            &-arrow {
                padding-top: 5px;
                padding-left: 15px;
                float: right;
            }
            @media(max-width: 600px) {
                float: none;
                margin: 10px 3px;
                display: inline-block;
            }
        }
        &-skip {
            float: right;
            border: none;
            color: #1890ff;
            font-style: normal;
            font-weight: normal;
            line-height: 22px;
            font-size: 14px;
            @media(max-width: 600px) {
                float: none;
                display: block;
                width: 100%;
                margin: 10px auto;
            }
        }
        &-back {
            float: left;
            font-style: normal;
            font-weight: normal
            line-height: 22px;
            font-size: 14px;
            padding-left: 20px;
            padding-right: 20px;
            color: color: rgba(0, 0, 0, 0.65);
            @media(max-width: 600px) {
                float: none;
                display: inline-block;
                margin: 10px 3px;
            }
        }
        &-get {
            border: none;
            text-decoration: underline;
            color: #1890ff;
            display: inline-block;
            margin-left: 5px;
            font-size: 18px;
            @media(max-width: 600px) {
                display: block;
                width: 100%;
                text-align: center;
                margin: 10px auto;
            }
        }
    }
    .Onboarding__list {
        padding: 40px 40px 0px 40px;
        margin: 0px;
        list-style: none;
        @media(max-width: 600px) {
            padding: 20px 20px 0px 20px;
        }
        &-item {
            width: 93%;
            margin: 0px 0px 0px 16px;
            font-size: 18px;
            position: relative;
            line-height: 34px;
            font-weight: regular;
            @media(max-width: 600px) {
                font-size: 16px;
                line-height: 28px;
                width: 100%;
                padding-right: 20px;
            }
            &::before {
                content: "•"; 
                font-size: 28px;
                position: absolute;
                top: 0px;
                left: -16px;
                color: #1890ff;
            }
        }
    }
    .Onboarding__list.custom-pt-50 {
        padding-top: 50px;
        @media(max-width: 600px) {
            padding-top: 20px;
        }
    }
    .Onboarding__list--small-mt {
        padding: 23px 40px 0px 40px;
        margin: 0px;
        list-style: none;
        @media(max-width: 600px) {
            padding: 20px 20px 0px 20px;
        }
        &-item {
            font-weight: normal;
            width: 90%;
            margin: 16px 0px 16px 18px;
            font-size: 18px;
            position: relative;
            line-height: 19px;
            @media(max-width: 600px) {
                font-size: 16px;
                line-height: 28px;
                margin: 5px 0px 5px 18px;
                width: 100%;
                padding-right: 20px;
            }
            &::before {
                content: "•"; 
                font-size: 28px;
                position: absolute;
                top: 0px;
                left: -18px;
                color: #1890ff;
            }
        }
    }
    .Onboarding__list--key-security {
        padding: 10px 40px 0px 40px;
        list-style: none;
        margin: 0px;
        @media(max-width: 600px) {
            padding: 20px 20px 0px 20px;
        }
        &-item {
            font-weight: normal;
            width: 90%;
            margin: 16px 0px 16px 18px;
            font-size: 18px;
            position: relative;
            line-height: normal;
            @media(max-width: 600px) {
                font-size: 16px;
                line-height: 28px;
                margin: 5px 0px 5px 18px;
                width: 100%;
                padding-right: 20px;
            }
            &::before {
                content: "•"; 
                font-size: 28px;
                position: absolute;
                top: -6px;
                left: -18px;
                color: #1890ff;
                @media(max-width: 600px) {
                    top: -1px;
                }
            }
        }
    }
`

export const SliderNavigation = styled.div`
    text-align: center;
    margin-top: 30px;
    width: 100%;
    .Onboarding__slider-nav-button {
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
    .Onboarding__slider-nav-button.ant-btn-secondary {
        background-color: #dedede;
    }
`