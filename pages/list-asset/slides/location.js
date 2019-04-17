import Geocode from "react-geocode";
import styled from 'styled-components';
import {
  Select,
} from "antd";

import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideColoredSpan,
  CarouselSlideList,
  CarouselSlideInput,
  CarouselSlideSelect,
} from 'components/CarouselSlide/';

import Earth from "static/list-asset/assetList_earth.png";

const Image = styled.img`
  position: relative;
  margin: 10px auto;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
}`

if(typeof window !== 'undefined'){
  Geocode.setApiKey("AIzaSyDA7e9ZbkASeRppui8FUWU-jDNeEYOXjt8");

  navigator.geolocation.getCurrentPosition(location => {
    console.log(location)
    const {
      latitude,
      longitude,
    } = location.coords;
    Geocode.fromLatLng(47.167377, 8.516875).then(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  })
}

export const LocationSlide = ({
  handleInputChange,
  handleSelectChange,
  countries,
  maxWidthDesktop,
}) => {
  return (
    <CarouselSlide>
      <CarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
      What’s your location?
    </CarouselSlideMainTitle>
      <CarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Different assets will be available to fund depending on where you are.
      </CarouselSlideParagraph>
      <Image
        src={Earth}
        alt="Earth"
      />
      <div className="Slider__input-container">
        <CarouselSlideSelect
          isCentered
          showSearch
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
        </CarouselSlideSelect>
        <CarouselSlideInput
          isCentered
          placeholder="City"
          name="userCity"
          onChange={e => handleInputChange(e)}
        />
      </div>
    </CarouselSlide>
  );
};
