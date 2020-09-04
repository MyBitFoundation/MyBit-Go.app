import React, { useEffect, useState } from 'react';
import {
  Upload,
  Icon,
  message,
} from 'antd';

import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselNextButton,
} from 'components/CarouselSlide/';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export const CoverPictureSlide = ({
  coverPicture,
  handleCoverPicture,
  maxWidthDesktop,
  desktopMode,
  onClick,
  nextButtonDisabled,
}) => {
  const props = {
    name: 'cover-picture',
    // so that the Upload component doesn't attempt to upload the files
    // we're doing that later
    customRequest: () => {},
    coverPicture,
    showUploadList: false,
  };

  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (coverPicture) {
      getBase64(coverPicture.originFileObj || coverPicture.file || coverPicture, data => setImageUrl(data));
    }
  }, [coverPicture]);

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
          Cover Picture
        </React.Fragment>
      </CarouselSlideMainTitle>
      <CarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Upload a clear cover picture reperesenting the asset.
      </CarouselSlideParagraph>
      <Upload.Dragger
        {...props}
        className="Slider__upload-content"
        onChange={handleCoverPicture}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          : (
            <>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Upload a cover picture</p>
              <p className="ant-upload-hint">
            Format .jpg, .png
              </p>
            </>
          )}
      </Upload.Dragger>
      {desktopMode && (
        <CarouselNextButton
          onClick={onClick}
          style={{ marginTop: '40px' }}
          desktopMode={desktopMode}
          disabled={nextButtonDisabled}
        />
      )}
    </CarouselSlide>
  );
};
