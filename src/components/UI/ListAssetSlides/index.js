import React from 'react';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number'
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
import * as DummyData from './dummyData'

const Option = Select.Option;

export const IntroSlide = ({ next }) => (
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
            <Button type="secondary" className="Slider__buttons-continue" onClick={next}>PLACEHOLDER CIVIC BUTTON</Button>
        </div>
    </Slide>
)

export const LocationSlide = ({ next, handleInputChange, handleSelectChange }) => (
    <Slide>
        <h1 className="Slider__header">What’s your location?</h1>
        <p className="Slider__note">
            Different assets will be available to fund depending on where you are.
        </p>
        <img src={Earth} className="Slider__img" alt="Earth" width="120px" height="120px"/>
        <div className="Slider__input-container">
            <Input placeholder="City" name="userCity" onChange={(e) => handleInputChange(e)} />
            <Select
            showSearch
            style={{ width: "100%", marginTop: "10px" }}
            placeholder="Country"
            optionFilterProp="children"
            onChange={(value) => handleSelectChange(value, "userCountry")}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            { 
                DummyData.Countries.map(country => (
                    <Option key={country} value={country}>{country}</Option>
                ))
            }
        </Select>
        </div>
        <div className="Slider__buttons">
            <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const AvailableAssetsSlide = ({ next, assetValue, handleSelectChange }) => (
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
                onChange={(value) => handleSelectChange(value, "category")}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                { 
                    DummyData.Categories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                    ))
                }
            </Select>
            <Select
                showSearch
                style={{ width: "100%", marginTop: "10px" }}
                placeholder="Available Assets"
                optionFilterProp="children"
                onChange={(value) => handleSelectChange(value, "asset")}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                { 
                    DummyData.Assets.map(asset => (
                        <Option key={asset} value={asset}>{asset}</Option>
                    ))
                }
            </Select>
            <div className="Slider__input-label">Selected Asset value: </div>
            <InputNumber
                placeholder="Funding Goal"
                name="assetValue"
                value={assetValue}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(value) => handleSelectChange(value, "assetValue")}
            />
        </div>
        <div className="Slider__buttons">
            <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const AssetLocationSlide = ({ next, handleInputChange, handleSelectChange }) => (
    <Slide>
        <h1 className="Slider__header">Asset location?</h1>
        <p className="Slider__note">
            This is where your asset is going to be once fully funded.
        </p>
        <div className="Slider__input-container">
            <Input placeholder="Address Line 1" name="assetAddress1" onChange={(e) => handleInputChange(e)} />
            <Input placeholder="Address Line 2" name="assetAddress2" onChange={(e) => handleInputChange(e)} />
            <Input placeholder="City/Town"name="assetCity" onChange={(e) => handleInputChange(e)} />
            <Select
                showSearch
                placeholder="Country"
                optionFilterProp="children"
                onChange={(value) => handleSelectChange(value, "assetCountry")}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                { 
                    DummyData.Countries.map(country => (
                        <Option key={country} value={country}>{country}</Option>
                    ))
                }
            </Select>
            <Input placeholder="Province/Region" name="assetProvince" onChange={(e) => handleInputChange(e)} />
            <Input placeholder="Postal Code" name="assetPostalCode" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="Slider__buttons">
            <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const UploadSlide = ({ next, handleFileUpload }) => {
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
                <Upload.Dragger {...props} className="Slider__upload-content" onChange={handleFileUpload}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Upload your docs here</p>
                    <p className="ant-upload-hint">Format .rar .zip .doc .docx .pdf .jpg...</p>
                </Upload.Dragger>
            </div>
            <div className="Slider__buttons">
                <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
            </div>
        </Slide>
    )
}

export const FeeSlide = ({ next, handleSliderChange, handleSelectChange, managementFee }) => (
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
        <img src={Coins} className="Slider__img" alt="Coins" width="83px" height="100px" />
        <div className="Slider__input-fee">
            <Slider
                min={0}
                max={100}
                value={managementFee}
                onChange={(value) => handleSelectChange(value, "managementFee")}
                defaultValue={managementFee}
            />
            <InputNumber
                defaultValue={managementFee}
                min={0}
                max={100}
                value={managementFee}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={(value) => handleSelectChange(value, "managementFee")}
            />
        </div>
        <div className="Slider__buttons">
            <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
)

export const CollateralSlide = ({ next, handleCollateralChange, collateralPercentage, collateralMyb, collateralDollar, constraints }) => {
    return (
        <Slide>
        <Tooltip 
            title="Assets with a high collateral are more likely to get funded."
            overlayClassName="Slider_overlay-tooltip">
            <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
        </Tooltip>
        <h1 className="Slider__header">Asset collateral </h1>
        <p className="Slider__note">
            MYB is used as an insurance mechanism, much like a deposit to protect investors' funds and incentivise proper behaviour. 
        </p>
        <img src={MYB} className="Slider__img--myb" alt="MYB" width="90px" heght="65px" />
        <div className="Slider__input-collateral">
            <Slider
                min={0}
                max={100}
                defaultValue={collateralPercentage}
                value={collateralPercentage}
                onChange={(value) => handleCollateralChange(value, "percentage")}
            />
            <div>{`${collateralPercentage}%`}</div>
            <InputNumber
                defaultValue={collateralMyb}
                value={collateralMyb}
                step={0.1}
                precision={2}
                min={constraints.min_myb}
                max={constraints.max_myb}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(value) => handleCollateralChange(value, "myb")}
            />
            <span>=</span>
            <InputNumber
                defaultValue={collateralDollar}
                value={collateralDollar}
                step={0.1}
                precision={2}
                min={constraints.min_dollars}
                max={constraints.max_dollars}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(value) => handleCollateralChange(value, "dollar")}
            />
        </div>
        <div className="Slider__buttons">
            <Button type="primary" className="Slider__buttons-continue" onClick={next}>Next</Button>
        </div>
    </Slide>
    )
}

export const ConfirmAsset = ({ next, confirmAsset, dataObject }) => (
    <Slide>
        <h1 className="Slider__header">Confirm information</h1>
        <p className="Slider__note">
            Please confirm your asset information below.
        </p>
        <div className="Slider__confirm-information">
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Location</div>
                <div className="Slider__confirm-entry-note">
                    {dataObject.userCity === '' ? '[city missing]' : dataObject.userCity}
                    /
                    {dataObject.userCountry === '' ? '[country missing]' : dataObject.userCountry}
                </div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Asset</div>
                <div className="Slider__confirm-entry-note">
                    {dataObject.asset === '' ? '[asset missing]' : dataObject.asset}
                </div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Asset location</div>
                <div className="Slider__confirm-entry-note">
                {dataObject.assetAddress1 === '' ? '[address missing]' : dataObject.assetAddress1}
                {dataObject.assetAddress2 === '' ? '' : `,${dataObject.assetAddress2}`}
                </div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Supporting documents</div>
                <div className="Slider__confirm-entry-note">
                    {
                        dataObject.fileList.length === 0 
                        ? '[files not uploaded]' 
                        : dataObject.fileList.map(file => (
                            <a href="/list-asset" key={file.name} className="Slider__confirm-entry-file">{file.name}</a>
                        ))
                    }
                </div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Management fee</div>
                <div className="Slider__confirm-entry-note">{dataObject.managementFee}%</div>
            </div>
            <div className="Slider__confirm-entry">
                <div className="Slider__confirm-entry-title">Asset collateral</div>
                <div className="Slider__confirm-entry-note">{dataObject.collateralMyb} MYB {dataObject.collateralPercentage}%</div>
            </div>
        </div>
        <div className="Slider__buttons">
            <Button type="primary" className="Slider__buttons-continue" onClick={confirmAsset}>Confirm listing</Button>
        </div>
    </Slide>
)


