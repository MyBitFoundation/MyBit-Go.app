import styled from 'styled-components';
import { Checkbox } from 'antd';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselNextButton,
} from 'components/CarouselSlide/';
import TextAreaWithLabel from 'ui/TextAreaWithLabel';
import {
  DEFAULT_TOKEN,
} from 'constants/app';
import NumericInput from 'ui/NumericInput';

const TextAreaWrapper = styled.div`
  margin-bottom: 10px;
`
const Label = styled.div`
  font-weight: 500;
  display: block;
  color: ${({theme}) => theme.colors.grayBase};
`

const GeneralDescriptionSlide = ({
  maxWidthDesktop,
  handleInputChange,
  desktopMode,
  onClick,
  nextButtonDisabled,
  formData,
  handleSelectChange,
}) => {
  const {
    hasAdditionalCosts,
    additionalCosts,
  } = formData;

  return (
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
      hasBoxShadow={desktopMode}
      desktopMode={desktopMode}
    >
      <CarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        <React.Fragment>
          General Description
        </React.Fragment>
      </CarouselSlideMainTitle>
      <CarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Tell the community about the project. Why do you think it will work? Provide financial details and the associated risks.
      </CarouselSlideParagraph>
      <TextAreaWrapper>
        <TextAreaWithLabel
          label="About"
          placeholder="Tell us about the asset and why you think it will work."
          textAreaName="about"
          onChange={handleInputChange}
          value={formData.about}
          rows={5}
        />
      </TextAreaWrapper>
      <TextAreaWrapper>
        <TextAreaWithLabel
          label="Financials"
          placeholder="Describe financial details, estimated ROI, etc."
          textAreaName="financials"
          onChange={handleInputChange}
          value={formData.financials}
          rows={5}
        />
      </TextAreaWrapper>
      <TextAreaWrapper>
        <TextAreaWithLabel
          label="Risks"
          placeholder="Describe what the associated risks are."
          textAreaName="risks"
          onChange={handleInputChange}
          value={formData.risks}
          rows={5}
        />
      </TextAreaWrapper>
      <Checkbox
        checked={hasAdditionalCosts}
        onChange={(e) => handleSelectChange(e.target.checked, 'hasAdditionalCosts')}
        style={{marginBottom: '10px'}}
      >
        Has additional costs
      </Checkbox>
      {hasAdditionalCosts && (
        <React.Fragment>
          <Label>
            Additional Costs
          </Label>
          <NumericInput
            value={additionalCosts}
            label={DEFAULT_TOKEN}
            onChange={value => handleSelectChange(value, 'additionalCosts')}
            min={1}
            decimalPlaces={2}
            step={1}
            style={{width: '167px'}}
          />
          <TextAreaWrapper style={{marginTop: '10px'}}>
            <TextAreaWithLabel
              label="What do you need the money for?"
              placeholder="If there are any extra costs you will incur in please detail them below.
              These fees will be added to the base asset cost. Please note this breakdown will be displayed in the Asset Page for investors."
              textAreaName="fees"
              onChange={handleInputChange}
              value={formData.fees}
              rows={5}
            />
          </TextAreaWrapper>
        </React.Fragment>
      )}
      {desktopMode && (
        <CarouselNextButton
          onClick={onClick}
          disabled={nextButtonDisabled}
          style={{marginTop: '20px'}}
          desktopMode={desktopMode}
        />
      )}
    </CarouselSlide>
  )
};

export default GeneralDescriptionSlide;
