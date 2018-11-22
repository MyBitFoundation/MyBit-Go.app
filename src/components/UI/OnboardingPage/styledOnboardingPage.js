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
            padding: 0px 0px 0px 40px;
        }
    }
`

export const Slide = styled.div`
    position: relative;
    min-height: 600px;
    width: 100%;
    max-width: 600px;
    .Onboarding__img {
        &-default {
            position: absolute;
            top: 21px;
            right: 40px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-globe {
            position: absolute;
            top: 28px;
            right: 51px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-desk {
            position: absolute;
            top: 41px;
            right: 30px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-key {
            position: absolute;
            top: 46px;
            right: 66px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-setup {
            position: absolute;
            top: 158px;
            right: 29px;
            @media(max-width: 600px) {
                display: none !important;
            }
        }
        &-static {
            margin: 0px auto;
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
        margin: 40px 0px 10px 0px;
        &--long {
            font-size: 35px;
            line-height: 40px;
            font-weight: bold;
            margin-top: 40px;
            font-style: normal;
        }
        @media(max-width: 600px) {
            font-size: 32px;
            line-height: 38px;
        }
        &--blue {
          color: #1890ff;
        }
        &--red {
          color: red;
        }
    }
    .Onboarding__paragraph-title {
        font-size: 18px;
        font-weight: bold;
        color: #4a4a4a;
        line-height: normal;
        width: 80%;
        margin: 0px 0px 20px 0px;
        @media(max-width: 600px) {
            width: 100%;
        }
        &--big {
            font-size: 20px;
            font-weight: bold;
            color: #4a4a4a;
            width: 80%;
            margin: -10px 0px 20px 0px;
            @media(max-width: 600px) {
                width: 100%;
            }
        }
    } 
    .Onboarding__static-img-wrapper {
        width: 100%;
        padding-right: 40px;
        text-align: center;
    }
    .Onboarding__paragraph-wrapper {
        margin-top: 30px;
    }
    .Onboarding__paragraph {
        font-size: 18px;
        color: #4a4a4a;
        line-height: 24px;
        width: 77%;
        line-height: normal;
        @media(max-width: 600px) {
            font-size: 16px;
            width: 100%;
        }
        &--intro {
            font-size: 20px;
            color: #4a4a4a;
            line-height: normal;
            width: 66%;
            margin: 20px 0px 15px 0px;
            @media(max-width: 600px) {
                font-size: 16px;
            }
        }
        &--no-images {
            font-size: 18px;
            color: #4a4a4a;
            line-height: 22px;
            width: 82%;
            @media(max-width: 600px) {
                font-size: 16px;
            }
        }
        &--no-images-full {
            font-size: 18px;
            color: #4a4a4a;
            line-height: 22px;
            width: 90%;
            @media(max-width: 600px) {
                font-size: 16px;
            }
        }
        &--no-images--small {
            font-size: 18px;
            color: #4a4a4a;
            line-height: 22px;
            width: 72%;
            @media(max-width: 600px) {
                font-size: 16px;
            }
        }
    }
    .Onboarding__buttons {
        position: absolute;
        bottom: 20px;
        right: 20px;
        @media(max-width: 600px) {
            position: static;
        }
        &-next {
            font-style: normal;
            font-weight: 500;
            line-height: 22px;
            font-size: 14px;
            padding-right: 8px;
            &-arrow{
                padding-top: 5px;
                padding-left: 15px;
                float: right;
            }
            @media(max-width: 600px) {
                position: static;
                display: block;
                margin: 10px auto;
            }
        }
        &-skip {
            border: none;
            color: #1890ff;
            font-style: normal;
            font-weight: normal;
            line-height: 22px;
            font-size: 14px;
            @media(max-width: 600px) {
                position: static;
                display: block;
                margin: 10px auto;
            }
        }
        &-back {
            position: absolute;
            bottom: 20px;
            left: -20px;
            font-style: normal;
            font-weight: normal
            line-height: 22px;
            font-size: 14px;
            padding-left: 20px;
            padding-right: 20px;
            color: color: rgba(0, 0, 0, 0.65);
            @media(max-width: 600px) {
                position: static;
                display: block;
                margin: 10px auto;
            }
        }
        &-get {
            border: none;
            text-decoration: underline;
            color: #1890ff;
            display: inline-block;
            margin-left: 5px;
            font-size: 18px;
        }
    }
    .Onboarding__list {
        padding: 0;
        list-style: none;
        margin-top: 50px;
        @media(max-width: 600px) {
            margin-top: 10px;
        }
        &.no-margin-list {
            margin-top: 10px;
        }
        &-item {
            font-weight: normal;
            width: 90%;
            margin: 0px 0px 0px 18px;
            font-size: 18px;
            position: relative;
            line-height: 34px;
            @media(max-width: 600px) {
                font-size: 16px;
                line-height: 28px;
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
    .Onboarding__list--small-mt {
        padding: 0;
        list-style: none;
        margin-top: 36px;
        @media(max-width: 600px) {
            margin-top: 10px;
        }
        &-item {
            font-weight: normal;
            width: 85%;
            margin: 16px 0px 16px 18px;
            font-size: 18px;
            position: relative;
            line-height: 19px;
            @media(max-width: 600px) {
                font-size: 16px;
                line-height: 28px;
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
        padding: 0;
        list-style: none;
        margin-top: 25px;
        @media(max-width: 600px) {
            margin-top: 10px;
        }
        &-item {
            font-weight: normal;
            width: 85%;
            margin: 16px 0px 16px 18px;
            font-size: 18px;
            position: relative;
            line-height: normal;
            @media(max-width: 600px) {
                font-size: 16px;
                line-height: 28px;
            }
            &::before {
                content: "•"; 
                font-size: 28px;
                position: absolute;
                top: -6px;
                left: -18px;
                color: #1890ff;
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
        background: black;
        border-radius: 6px;
        padding: 0;
        margin: 0 4px;
        border: none;
        background: #dedede;
        &:hover, &:focus {
            background: #dedede;
        }
        &.active-slide {
            background: #1890ff;
            &:hover, &:focus {
            background: #1890ff;
            }
        }
    }
    .Onboarding__tooltip-inner {
        .ant-tooltip-content {
            box-shadow: 1px 5px 20px 2px rgba(0,0,0,0.2);
            border-radius: 4px;
        }
        .ant-tooltip-inner {
            background-color: #ffffff;
            color: #4a4a4a;
            padding: 10px;
            max-width: 200px;
        }
        .ant-tooltip-arrow {
            border-top-color: #ffffff;
        }
    }
`