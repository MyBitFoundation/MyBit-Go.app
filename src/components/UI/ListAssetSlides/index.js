import React from "react";
import { Link } from 'react-router-dom';
import Button from "antd/lib/button";
import Tooltip from "antd/lib/tooltip";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Select from "antd/lib/select";
import Icon from "antd/lib/icon";
import Upload from "antd/lib/upload";
import Slider from "antd/lib/slider";
import { Slide, IntroList } from "./styledListAssetPage";
import questionTooltip from "../../../images/list-asset/questionTooltip.png";
import Earth from "../../../images/list-asset/assetList_earth.png";
import Coins from "../../../images/list-asset/assetList_coins.png";
import MYB from "../../../images/list-asset/assetList_myb.png";
import SuccessCheckmark from "../../../images/list-asset/success-list-asset.svg";
import SuccessEarth from "../../../images/list-asset/success-list-asset-earth.svg";

import { CivicButton, withCivic } from "../CivicContainer";
import BlockchainInfoContext from '../../BlockchainInfoContext';
import { WithAirtableContext } from '../../Airtable';

const Option = Select.Option;

const SlideButtons = ({
  nextMessage,
  disabledMassage,
  previous,
  next,
  forbidNext
}) => {
  return (
    <div className="Slider__buttons">
      <Button
        type="secondary"
        onClick={previous}
        className="Slider__buttons-back"
      >
        Back
      </Button>
      <Button
        type="primary"
        className="Slider__buttons-continue"
        onClick={next}
        disabled={forbidNext}
      >
        {forbidNext ? disabledMassage : nextMessage}
      </Button>
    </div>
  );
};

export const IntroSlide = withCivic(({ next, civic, dev }) => (
  <Slide>
    <Tooltip
      title="(no preview on figma)"
      overlayClassName="Slider_overlay-tooltip"
    >
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
          Login securely using your Civic account. You can create one{" "}
          <a
            href="https://www.civic.com/app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </div>
      </div>
      <div className="IntroListItem">
        <div className="IntroListItem__title">Location of your asset</div>
        <div className="IntroListItem__note">
          Enter a location. For investors, it's important they know exactly
          where the asset is based.
        </div>
      </div>
      <div className="IntroListItem">
        <div className="IntroListItem__title">Supporting documents</div>
        <div className="IntroListItem__note">
          Additional documents build trust with investors, confirming you have
          the necessary legal and property rights to install the asset.
        </div>
      </div>
      <div className="IntroListItem">
        <div className="IntroListItem__title">
          Calculate your personal management fee
        </div>
        <div className="IntroListItem__note">
          How much will it cost for you to operate the asset? Here, you can
          calculate your fee.
        </div>
      </div>
      <div className="IntroListItem">
        <div className="IntroListItem__title">Asset collateral</div>
        <div className="IntroListItem__note">
          You’ll need some MyBit tokens to put down as collateral for your asset
          and investors.
        </div>
      </div>
    </IntroList>
    <div className="Slider__buttons">
      {(!civic.token && !dev) && <CivicButton onClick={civic.signUp} />}
      {(civic.token || dev) && (
        <Button
          type="primary"
          className="Slider__buttons-continue"
          onClick={next}
        >
          Continue
        </Button>
      )}
    </div>
  </Slide>
));

export const LocationSlide = ({
  next,
  previous,
  handleInputChange,
  handleSelectChange,
  formData,
  countries
}) => {
  const { userCity, userCountry } = formData;
  let forbidNext = userCity !== "" && userCountry !== "" ? false : true;
  return (
    <Slide>
      <h1 className="Slider__header">What’s your location?</h1>
      <p className="Slider__note">
        Different assets will be available to fund depending on where you are.
      </p>
      <img
        src={Earth}
        className="Slider__img"
        alt="Earth"
        width="120px"
        height="120px"
      />
      <div className="Slider__input-container">
        <Select
          showSearch
          style={{ width: "100%", marginTop: "10px" }}
          placeholder="Country"
          optionFilterProp="children"
          onChange={value => handleSelectChange(value, "userCountry")}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {countries.map(country => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="City"
          name="userCity"
          onChange={e => handleInputChange(e)}
        />
      </div>
      <SlideButtons
        nextMessage="Next"
        disabledMassage="All fields are required"
        previous={previous}
        next={next}
        forbidNext={forbidNext}
      />
    </Slide>
  );
};

export const AvailableAssetsSlide = WithAirtableContext(({
  next,
  previous,
  handleSelectChange,
  formData,
  history,
  airtableContext,
}) => {
  const { category, asset } = formData;
  const {
    assetsAirTable,
    categoriesAirTable,
    getCategoriesForAssets,
  } = airtableContext;

  let forbidNext = category !== "" && asset !== "" ? false : true;
  if(!assetsAirTable || !categoriesAirTable){
    return null;
  }
  const categories = getCategoriesForAssets(formData.userCountry, formData.userCity);
  const assetValue = !asset ? 0 : assetsAirTable.filter(assetTmp => assetTmp.name === asset)[0].amountToBeRaisedInUSDAirtable;
  return (
    <Slide>
      <Tooltip
        title="More assets will become available in the future."
        overlayClassName="Slider_overlay-tooltip"
      >
        <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
      </Tooltip>
      {categories.length !== 0 ? (
        <div>
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
              onChange={value => handleSelectChange(value, "category")}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.map(cat => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
            </Select>
            <Select
              showSearch
              style={{ width: "100%", marginTop: "10px" }}
              placeholder="Available Assets"
              optionFilterProp="children"
              onChange={value => handleSelectChange({name: value, assetsAirTable}, "asset")}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {assetsAirTable.filter(asset => asset.category === category).map(asset => {
                return (
                  <Option key={asset.name} value={asset.name}>
                    {asset.name}
                  </Option>
                )}
              )}
            </Select>
            <div className="Slider__input-label">Selected Asset value: </div>
            <InputNumber
              disabled
              placeholder="Funding Goal"
              name="assetValue"
              value={assetValue}
              formatter={value =>
               `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              onChange={value => handleSelectChange(value, "assetValue")}
            />
          </div>
          <SlideButtons
            nextMessage="Next"
            disabledMassage="All fields are required"
            previous={previous}
            next={next}
            forbidNext={forbidNext}
          />
        </div>
      ) : (
        <div>
          <h1 className="Slider__header">No assets</h1>
          <p className="Slider__note">
            No assets have been found in your country.
          </p>
          <div className="Slider__buttons">
            <Button
              type="secondary"
              className="Slider__buttons-centered"
              onClick={() => history.push("/explore")}
            >
              Go to Explore page
            </Button>
          </div>
        </div>
      )}
    </Slide>
  );
});

export const AssetLocationSlide = ({
  next,
  previous,
  handleInputChange,
  handleSelectChange,
  formData,
  countries
}) => {
  const {
    assetCountry,
    assetAddress1,
    assetCity,
    assetProvince,
    assetPostalCode
  } = formData;
  let forbidNext =
    assetCountry !== "" &&
    assetAddress1 !== "" &&
    assetCity !== "" &&
    assetProvince !== "" &&
    assetPostalCode !== ""
      ? false
      : true;
  return (
    <Slide>
      <h1 className="Slider__header">Asset location?</h1>
      <p className="Slider__note">
        This is where your asset is going to be once fully funded.
      </p>
      <div className="Slider__input-container">
        <Input
          placeholder="Address Line 1"
          name="assetAddress1"
          onChange={e => handleInputChange(e)}
        />
        <Input
          placeholder="Address Line 2"
          name="assetAddress2"
          onChange={e => handleInputChange(e)}
        />
        <Input
          placeholder="City/Town"
          name="assetCity"
          onChange={e => handleInputChange(e)}
        />
        <Select
          showSearch
          value={assetCountry}
          disabled={true}
          optionFilterProp="children"
          // onChange={value => handleSelectChange(value, "assetCountry")}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {countries.map(country => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Province/Region"
          name="assetProvince"
          onChange={e => handleInputChange(e)}
        />
        <Input
          placeholder="Postal Code"
          name="assetPostalCode"
          onChange={e => handleInputChange(e)}
        />
      </div>
      <SlideButtons
        nextMessage="Next"
        disabledMassage="All fields are required"
        previous={previous}
        next={next}
        forbidNext={forbidNext}
      />
    </Slide>
  );
};

export const UploadSlide = ({ next, previous, handleFileUpload, fileList }) => {
  const props = {
    name: "file",
    multiple: true,
    // so that the Upload component doesn't attempt to upload the files
    // we're doing that later
    customRequest: () => {},
    fileList,
  };
  return (
    <Slide>
      <Tooltip
        title="Supporting documents build trust with investors, confirming that you have
                 the required documents to install the asset in its stated location."
        overlayClassName="Slider_overlay-tooltip"
      >
        <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
      </Tooltip>
      <h1 className="Slider__header">Supporting docs</h1>
      <p className="Slider__note">
        While not essential, assets with supporting documents are more likely to
        get funded. A maximum of two files can be uploaded., each file can have up to 5MB.
      </p>
      <div className="Slider__upload-container">
        <Upload.Dragger
          {...props}
          className="Slider__upload-content"
          onChange={handleFileUpload}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Upload your docs here</p>
          <p className="ant-upload-hint">
            Format .rar .zip .doc .docx .pdf .jpg...
          </p>
        </Upload.Dragger>
      </div>
      <SlideButtons
        nextMessage="Next"
        disabledMassage="All fields are required"
        previous={previous}
        next={next}
        forbidNext={false}
      />
    </Slide>
  );
};

export const FeeSlide = ({
  next,
  previous,
  handleSelectChange,
  managementFee
}) => {
  let forbidNext = managementFee !== 0 ? false : true;
  return (
    <Slide>
      <Tooltip
        title="Management fees are paid out every month from profits generated by the asset."
        overlayClassName="Slider_overlay-tooltip"
      >
        <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
      </Tooltip>
      <h1 className="Slider__header">Management fee</h1>
      <p className="Slider__note">
        Here you can calculate your fee for managing the asset. This fee should
        include any financial costs you expect to incur in order to keep the
        asset maintained and in full working order.
      </p>
      <img
        src={Coins}
        className="Slider__img"
        alt="Coins"
        width="83px"
        height="100px"
      />
      <div className="Slider__input-fee">
        <Slider
          min={1}
          max={100}
          value={managementFee}
          onChange={value => handleSelectChange(value, "managementFee")}
          defaultValue={managementFee}
        />
        <InputNumber
          defaultValue={managementFee}
          min={1}
          max={100}
          value={managementFee}
          formatter={value => `${value}%`}
          parser={value => value.replace("%", "")}
          onChange={value => handleSelectChange(value, "managementFee")}
        />
      </div>
      <SlideButtons
        nextMessage="Next"
        disabledMassage="All fields are required"
        previous={previous}
        next={next}
        forbidNext={forbidNext}
      />
    </Slide>
  );
};

export const CollateralSlide = ({
  next,
  previous,
  handleCollateralChange,
  collateralPercentage,
  collateralMyb,
  collateralDollar,
  constraints,
  formData
}) => {
  return (
    <BlockchainInfoContext.Consumer>
       {({ prices }) => (
    <Slide>
      <Tooltip
        title="Assets with a high collateral are more likely to get funded."
        overlayClassName="Slider_overlay-tooltip"
      >
        <img className="Slider__tooltip" alt="Tooltip" src={questionTooltip} />
      </Tooltip>
      <h1 className="Slider__header">Asset collateral </h1>
      <p className="Slider__note">
        MYB is used as an insurance mechanism, much like a deposit to protect
        investors' funds and incentivise proper behaviour. In this version of Go you are
        not required to deposit MYB but you will still be able to withdraw the collateral.
      </p>
      <img
        src={MYB}
        className="Slider__img--myb"
        alt="MYB"
        width="90px"
        heght="65px"
      />
      <div className="Slider__input-collateral">
        <Slider
          min={0}
          max={constraints.max_percentage}
          defaultValue={collateralPercentage}
          value={collateralPercentage}
          onChange={value => handleCollateralChange({selectedAmount: value, mybPrice: prices.mybit.price}, "percentage")}
        />
        <div>{`${collateralPercentage}%`}</div>
        <InputNumber
          defaultValue={collateralMyb}
          value={collateralMyb}
          step={0.1}
          precision={2}
          min={constraints.min_myb}
          max={constraints.max_myb}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          onChange={value => handleCollateralChange({selectedAmount: value, mybPrice: prices.mybit.price}, "myb")}
        />
        <span>=</span>
        <InputNumber
          defaultValue={collateralDollar}
          value={collateralDollar}
          step={0.1}
          precision={2}
          min={constraints.min_dollars}
          max={constraints.max_dollars}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          onChange={value => handleCollateralChange({selectedAmount: value, mybPrice: prices.mybit.price}, "dollar")}
        />
      </div>
      <SlideButtons
        nextMessage="Next"
        disabledMassage="All fields are required"
        previous={previous}
        next={next}
        forbidNext={false}
      />
    </Slide>
  )}
  </BlockchainInfoContext.Consumer>
)};

const listedAssetSuccessfuly = (assetId) => {
  return (
    <React.Fragment>
      <h1 className="Slider__header">Listing confirmed</h1>
      <p className="Slider__note">Your asset has been succesfully listed. <br />You can access it
        <Link
          href={`/explore/${assetId}`}
          to={`/explore/${assetId}`}
        >{' '}here</Link>.</p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
        }}>
          <SuccessCheckmark style={{marginBottom: '10px'}}/>
          <SuccessEarth />
        </div>
        <div className="Slider__buttons">
          <Link
            href="/explore"
            to="/explore"
            style={{
              width: 'max-content',
              textAlign: 'center',
              display: 'block',
              margin: '0 auto',
            }}
          >
            <Button
              type="primary"
              className="Slider__buttons-continue"
            >
              Go to Explore
            </Button>
          </Link>
        </div>
    </React.Fragment>
  )
}

export const ConfirmAsset = ({ next, formData, isUserListingAsset, setUserListingAsset, listedAssetId }) => (
  <BlockchainInfoContext.Consumer>
    {({ handleListAsset }) =>
    <Slide>
      {listedAssetId ? listedAssetSuccessfuly(listedAssetId) : (
        <React.Fragment>
          <h1 className="Slider__header">Confirm information</h1>
          <p className="Slider__note">Please confirm your asset information below.</p>
          <div className="Slider__confirm-information">
            <div className="Slider__confirm-entry">
              <div className="Slider__confirm-entry-title">Location</div>
              <div className="Slider__confirm-entry-note">
                {formData.userCity === "" ? "[city missing]" : formData.userCity}/
                {formData.userCountry === ""
                  ? "[country missing]"
                  : formData.userCountry}
              </div>
            </div>
            <div className="Slider__confirm-entry">
              <div className="Slider__confirm-entry-title">Asset</div>
              <div className="Slider__confirm-entry-note">
                {formData.asset === "" ? "[asset missing]" : formData.asset}
              </div>
            </div>
            <div className="Slider__confirm-entry">
              <div className="Slider__confirm-entry-title">Asset location</div>
              <div className="Slider__confirm-entry-note">
                {formData.assetAddress1 === ""
                  ? "[address missing]"
                  : formData.assetAddress1}
                {formData.assetAddress2 === "" ? "" : `,${formData.assetAddress2}`}
              </div>
            </div>
            <div className="Slider__confirm-entry">
              <div className="Slider__confirm-entry-title">Supporting documents</div>
              <div className="Slider__confirm-entry-note">
                {formData.fileList.length === 0
                  ? "[files not uploaded]"
                  : formData.fileList.map(file => (
                      <span
                        key={file.name}
                        className="Slider__confirm-entry-file"
                      >
                        {file.name}
                      </span>
                    ))}
              </div>
            </div>
            <div className="Slider__confirm-entry">
              <div className="Slider__confirm-entry-title">Management fee</div>
              <div className="Slider__confirm-entry-note">
                {formData.managementFee}%
              </div>
            </div>
            <div className="Slider__confirm-entry">
              <div className="Slider__confirm-entry-title">Asset collateral</div>
              <div className="Slider__confirm-entry-note">
                {formData.collateralMyb.toFixed(2)} MYB{" "}
                {formData.collateralPercentage}%
              </div>
            </div>
          </div>
          <div className="Slider__buttons">
            <Button
              loading={isUserListingAsset}
              type="primary"
              className="Slider__buttons-continue"
              onClick={() => {
                setUserListingAsset(true);
                handleListAsset(formData, setUserListingAsset);
              }}
            >
              {isUserListingAsset ? 'Confirming listing' : 'Confirm Listing'}
            </Button>
          </div>
        </React.Fragment>
      )}
    </Slide>
  }
  </BlockchainInfoContext.Consumer>
);
