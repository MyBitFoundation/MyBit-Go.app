import styled from 'styled-components';
import {
  Upload,
  Icon,
} from "antd";

import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselTooltip,
} from 'components/CarouselSlide/';

export const DocsSlide = ({
  fileList,
  handleFileUpload,
  maxWidthDesktop,
}) => {
  const props = {
    name: "file",
    multiple: true,
    // so that the Upload component doesn't attempt to upload the files
    // we're doing that later
    customRequest: () => {},
    fileList,
  };

  return (
    <StyledCarouselSlide>
      <StyledCarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
      Supporting docs
    </StyledCarouselSlideMainTitle>
      <StyledCarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        While not essential, assets with supporting documents are more likely to
        get funded. A maximum of two files can be uploaded. Each file can have up to 5MB.
      </StyledCarouselSlideParagraph>
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
    </StyledCarouselSlide>
  );
}
