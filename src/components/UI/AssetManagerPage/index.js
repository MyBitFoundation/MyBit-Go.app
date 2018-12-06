import React from 'react';
import Button from 'antd/lib/button';
import { Slide } from './styledAssetManagerPage';
import Tools from '../../../images/asset-manager/tools.png';
import Myb from '../../../images/asset-manager/myb.png';

const SlideButtons = ({ previous, next, nextText = "Next" }) => {
    return (
        <div className="Slider__buttons-wrapper">
            <div className="Slider__buttons">
                <Button type="secondary" className="Slider__buttons-back" onClick={previous}>Back</Button>
                <Button type="primary" className="Slider__buttons-continue" onClick={next}>{nextText}</Button>
            </div>
        </div>
    )
}

export const WhatSlide = ({ next }) => (
    <Slide>
        <h1 className="Slider__header">What is an Asset Manager?</h1>
        <p className="Slider__IntroNote">
            Asset Managers are critical to the MyBit Go platform. 
            They supervise the assets and are responsible for:
        </p>
        <p className="Slider__ListItem">
            Coordinating any local approval required and/or navigating regulations 
            (e.g. getting approval from a store owner to place a Crypto ATM in their store).
        </p>
        <p className="Slider__ListItem">
            Listing assets: only Asset Managers have the power to initiate new funding campaigns for assets.
        </p>
        <p className="Slider__ListItem">
            Oversight and maintenance: the Asset Manager is in charge of overseeing the asset 
            and ensuring it functions properly. This may include security, repairs, marketing, 
            or replenishing funds in the case of a Crypto ATM.
        </p>
        <div className="Slider__buttons-wrapper">
            <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const WhySlide = (props) => (
    <Slide>
        <h1 className="Slider__header">Why is an Asset<br /> Manager needed?</h1>
        <div className="Slider__img-wrapper">
            <img className="Slider__img-tools" alt="Tools" src={Tools} />
        </div>
        <div className="Slider__paragraph-wrapper">
            <p className="Slider__paragraph">
                In a perfect, futuristic world the MyBit Go ecosystem could be fully automated.
            </p>
            <p className="Slider__paragraph">
                So, when an asset has an issue, it could request another 
                machine to come and fix it, replenish its funds or inventory, etc.
            </p>
            <p className="Slider__paragraph">
                Since we are not yet at that stage, human oversight is required for most assets to function properly.
            </p>
        </div>
        <SlideButtons {...props} />
    </Slide>
)

export const WhoSlide = (props) => (
    <Slide>
        <h1 className="Slider__header">Who is qualified to be an Asset Manager?</h1>
        <div className="Slider__paragraph-wrapper">
            <p className="Slider__paragraph">
                Anyone who passes identity verification is eligible to be an Asset Manager.
            </p>
            <p className="Slider__paragraph">
                Once approved, you have the right to be an Asset Manager for life.
            </p>
            <p className="Slider__paragraph">
                However, this does not guarantee an income for life.
            </p>
            <p className="Slider__paragraph">
                After being appointed, everything is based on trust.
            </p>
            <p className="Slider__paragraph">
                That is, the more assets you manage successfully, the better your trust rating.
            </p>
            <p className="Slider__paragraph">
                If you act badly, you will still be an Asset Manager, but investors may not 
                fund your assets. In rare situations, you may be banned from the platform.
            </p>
        </div>
        <SlideButtons {...props} />
    </Slide>
)

export const HowSlide = (props) => (
    <Slide>
        <h1 className="Slider__header">How are Asset Managers incentivised?</h1>
        <div className="Slider__paragraph-wrapper">
            <p className="Slider__paragraph">
                In return for maintaining the asset, Asset Managers receive a 
                portion of the revenue it generates.
            </p>
            <p className="Slider__paragraph">
                Since profits are based on an asset’s revenue rather than a fixed amount, 
                it incentivises the Asset Manager to ensure the asset generates as much revenue as possible.
            </p>
            <p className="Slider__paragraph">
                To follow free market principles, the percentage of revenue is chosen by the Asset Manager.
            </p>
            <p className="Slider__paragraph">
                Then, if they request too high a percentage, in theory, investors will not fund the asset.
            </p>
        </div>
        <SlideButtons {...props} />
    </Slide>
)

export const HowSlideLast = (props) => (
    <Slide>
        <h1 className="Slider__header">How do you ensure Asset Managers do their job?</h1>
        <div className="Slider__img-wrapper">
            <img className="Slider__img-myb" alt="Tools" src={Myb} />
        </div>
        <p className="Slider__paragraph--last-slide">
            Asset managers can put down collateral by locking their MyBit Tokens (MYB). 
            If they fail to perform their duties, investors can vote to revoke their MYB.
        </p>
        <p className="Slider__paragraph--last-slide">
            When this occurs, the tokens are burnt and a new Asset Manager is sought. Alternatively, 
            if an Asset Manager performs their duties, they can withdraw their collateral (MYB) in
                increments as the asset generates revenue. This model encourages Asset Managers to act in 
                the best interest of investors or risk loosing financially.
        </p>
        <SlideButtons {...props} nextText="Get Started" />
    </Slide>
)

