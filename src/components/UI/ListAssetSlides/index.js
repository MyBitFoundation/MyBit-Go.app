import React from 'react';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Icon from 'antd/lib/icon';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/message';
import Slider from 'antd/lib/slider';
import { Slide, IntroList } from './styledListAssetPage';
import questionTooltip from '../../../images/list-asset/questionTooltip.png';
import Earth from '../../../images/list-asset/assetList_earth.png';
import Coins from '../../../images/list-asset/assetList_coins.png';
import MYB from '../../../images/list-asset/assetList_myb.png';

const Option = Select.Option;

export const IntroSlide = ({ next, buttonsDisabled }) => (
    <Slide>
        <Tooltip title="(no preview on figma)" overlayClassName="Slider_overlay-tooltip">
            <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
        </Tooltip>
        <h1 className="Slider__header">Ready to list an asset?</h1>
        <p className="Slider__note">
            Here is a list of things you’ll need to list your asset.
        </p>
        <IntroList>
            <div className="IntroListItem">
                <div className="IntroListItem__title">A Civic account</div>
                <div className="IntroListItem__note">
                    Login securely using your Civic account. You can create one <a href="http://www.civic.com">here</a>
                </div>
            </div>
            <div className="IntroListItem">
                <div className="IntroListItem__title">Location of your asset</div>
                <div className="IntroListItem__note">
                    Enter a location. For investors, it's important they know exactly where the asset is based.
                                </div>
            </div>
            <div className="IntroListItem">
                <div className="IntroListItem__title">Supporting documents</div>
                <div className="IntroListItem__note">
                    Additional documents build trust with investors, confirming you have the necessary
                    legal and property rights to install the asset.
                                </div>
            </div>
            <div className="IntroListItem">
                <div className="IntroListItem__title">Calculate your personal management fee</div>
                <div className="IntroListItem__note">
                    How much will it cost for you to operate the asset? Here, you can calculate your fee.
                                </div>
            </div>
            <div className="IntroListItem">
                <div className="IntroListItem__title">Asset collateral</div>
                <div className="IntroListItem__note">
                    You’ll need some MyBit tokens to put down as collateral for your asset and investors.
                </div>
            </div>
        </IntroList>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="secondary" className="Slider__buttons-continue" onClick={next}>PLACEHOLDER CIVIC BUTTON</Button>
        </div>
    </Slide>
)

export const LocationSlide = ({ next, handleInputChange, handleSelectChange, buttonsDisabled }) => (
    <Slide>
        <h1 className="Slider__header">What’s your location?</h1>
        <p className="Slider__note">
            Different assets will be available to fund depending on where you are.
        </p>
        <img src={Earth} className="Slider__img" alt="Earth" />
        <div className="Slider__input-container">
            <Input placeholder="City" name="locationCity" onChange={(e) => handleInputChange(e)} />
            <Select
            showSearch
            style={{ width: "100%", marginTop: "10px" }}
            placeholder="Country"
            optionFilterProp="children"
            onChange={handleSelectChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            <Option value="bulgaria">Bulgaria</Option>
            <Option value="unitedkingdom">United Kingdom</Option>
            <Option value="spain">Spain</Option>
            <Option value="portugal">Portugal</Option>
        </Select>
        </div>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const AvailableAssetsSlide = ({ next, handleInputChange, handleSelectChange, buttonsDisabled }) => (
    <Slide>
        <Tooltip title="More assets will become available in the future." overlayClassName="Slider_overlay-tooltip">
            <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
        </Tooltip>
        <h1 className="Slider__header">Assets available</h1>
        <p className="Slider__note">
            Below is the list of assets available to you
        </p>
        <div className="Slider__input-container">
            <Select
                showSearch
                style={{ width: "100%", marginTop: "10px" }}
                placeholder="Asset Category"
                optionFilterProp="children"
                onChange={handleSelectChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="option1">Crypto</Option>
                <Option value="option2">Energy</Option>
                <Option value="option3">Real Estate</Option>
            </Select>
            <Select
                showSearch
                style={{ width: "100%", marginTop: "10px" }}
                placeholder="Available Assets"
                optionFilterProp="children"
                onChange={handleSelectChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="option1">Crypto</Option>
                <Option value="option2">Energy</Option>
                <Option value="option3">Real Estate</Option>
            </Select>
            <div className="Slider__input-label">Selected Asset value: </div>
            <Input
                placeholder="$7000"
                defaultValue="$7000"
                name="assetvalue" onChange={(e) => handleInputChange(e)} 
            />
        </div>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const AssetLocationSlide = ({ next, handleInputChange, handleSelectChange, buttonsDisabled }) => (
    <Slide>
        <h1 className="Slider__header">Asset location?</h1>
        <p className="Slider__note">
            This is where your asset is going to be once fully funded.
        </p>
        <div className="Slider__input-container">
            <Input placeholder="Address Line 1" name="address1" onChange={(e) => handleInputChange(e)} />
            <Input placeholder="Address Line 2" name="address2" onChange={(e) => handleInputChange(e)} />
            <Input placeholder="City/Town"name="city/town" onChange={(e) => handleInputChange(e)} />
            <Select
                showSearch
                placeholder="Country"
                optionFilterProp="children"
                onChange={handleSelectChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="bulgaria">Bulgaria</Option>
                <Option value="unitedkingdom">United Kingdom</Option>
                <Option value="spain">Spain</Option>
                <Option value="portugal">Portugal</Option>
            </Select>
            <Input placeholder="Province/Region" name="province/region" onChange={(e) => handleInputChange(e)} />
            <Input placeholder="Postal Code" name="postalcode" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const UploadSlide = ({ next, buttonsDisabled }) => {
    const props = {
        name: 'file',
        multiple: true,
        action: '//jsonplaceholder.typicode.com/posts/',
        onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        },
    };
    return (
        <Slide>
            <Tooltip 
                title="Supporting documents build trust with investors, confirming that you have
                 the required documents to install the asset in its stated location." overlayClassName="Slider_overlay-tooltip">
                <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
            </Tooltip>
            <h1 className="Slider__header">Supporting docs</h1>
            <p className="Slider__note">
                While not essential, assets with supporting documents are more likely to get funded.
            </p>
            <div className="Slider__upload-container">
                <Upload.Dragger {...props} className="Slider__upload-content">
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Upload your docs here</p>
                    <p className="ant-upload-hint">Format .rar .zip .doc .docx .pdf .jpg...</p>
                </Upload.Dragger>
            </div>
            <div className="Slider__buttons">
                <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
            </div>
        </Slide>
    )
}

export const FeeSlide = ({ next, handleInputChange, onSliderChange, buttonsDisabled }) => (
    <Slide>
        <Tooltip 
            title="Management fees are paid out every month from profits generated by the asset."
            overlayClassName="Slider_overlay-tooltip">
            <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
        </Tooltip>
        <h1 className="Slider__header">Management fee</h1>
        <p className="Slider__note">
            Here you can calculate your fee for managing the asset. This fee should include any financial 
            costs you expect to incur in order to keep the asset maintained and in full working order. 
        </p>
        <img src={Coins} className="Slider__img" alt="Coins" />
        <div className="Slider__input-fee">
            <Slider
                min={0}
                max={100}
                onChange={onSliderChange}
                defaultValue={25}
            />
            <Input placeholder="Percentage %" name="percentageFee" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const CollateralSlide = ({ next, handleInputChange, onSliderChange, buttonsDisabled }) => (
    <Slide>
        <Tooltip 
            title="MYB is used as an insurance mechanism, much like a deposit to 
            protect investors' funds and incentivise proper behaviour."
            overlayClassName="Slider_overlay-tooltip">
            <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
        </Tooltip>
        <h1 className="Slider__header">Asset collateral </h1>
        <p className="Slider__note">
            MYB is used as an insurance mechanism, much like a deposit to protect investors' funds and incentivise proper behaviour. 
        </p>
        <img src={MYB} className="Slider__img--myb" alt="MYB" />
        <div className="Slider__input-collateral">
            <Slider
                min={0}
                max={100}
                defaultValue={50}
                onChange={onSliderChange}
            />
            <div>50%</div>
            <Input placeholder="MYB" name="mybCollateral" onChange={(e) => handleInputChange(e)} />
            <span>=</span>
            <Input placeholder="Dollars" name="dollarsCollateral" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const ConfirmAsset = ({ next, confirmAsset, buttonsDisabled }) => (
    <Slide>
        <h1 className="Slider__header">Confirm information</h1>
        <p className="Slider__note">
            Please confirm your asset information below.
        </p>
        <div className="Slider__confirm-information">
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Location</div>
                <div className="Slider__confirm-entry-note">Prague/Czech Republic</div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Asset</div>
                <div className="Slider__confirm-entry-note">Bitcoin ATM</div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Asset location</div>
                <div className="Slider__confirm-entry-note">Street name here, 130 000, Prague, Czech Republic </div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Supporting documents</div>
                <div className="Slider__confirm-entry-note">
                    <a href="/list-asset" className="Slider__confirm-entry-file">Location-verification.pdf</a>
                    <a href="/list-asset" className="Slider__confirm-entry-file">Property.rights.pdf</a>
                </div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Management fee</div>
                <div className="Slider__confirm-entry-note">5%</div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Asset collateral</div>
                <div className="Slider__confirm-entry-note">130,000 MYB 25%</div>
            </div>
        </div>
        <div className="Slider__buttons">
            <Button disabled={buttonsDisabled} type="primary" className="Slider__buttons-continue" onClick={confirmAsset}>Confirm listing</Button>
        </div>
    </Slide>
)


