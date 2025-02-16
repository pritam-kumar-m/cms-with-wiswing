"use client";

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        right: '10px',
        zIndex: 1,
        // eslint-disable-next-line no-dupe-keys
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="24px"
        height="24px"
      >
      </svg>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        left: '10px',
        zIndex: 1,
        // eslint-disable-next-line no-dupe-keys
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="24px"
        height="24px"
      >
      </svg>
    </div>
  );
};

const SliderPlugin = ({ images, settings }) => {
  // Default settings for the slider
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
    ...settings, 
  };

  return (
    <div className="slider-plugin" style={{ maxWidth: '100%', margin: '0 auto', padding: '0 20px' }}>
      <Slider {...defaultSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderPlugin;