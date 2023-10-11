import React from "react";
import "./Slider.css";
import { useInView } from "react-intersection-observer";
import Img1 from "./img/img1.png";
import Img2 from "./img/img2.jpg";
import Img3 from "./img/img3.jpeg";
import Img4 from "./img/img4.jpg";
import Img5 from "./img/img5.jpg";
import Img6 from "./img/img6.jpeg";

const Slider = ({ imageSrc, title, subtitle, flipped }) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  });

  const renderContent = () => {
    if (!flipped) {
      return (
        <>
          <img src={imageSrc} alt="Travel" className="slider__image" />
          <div className="slider__content">
            <h1 className="slider__title">{title}</h1>
            <p className="slider_text">{subtitle}</p>
          </div>
        </>
      );
    }
    else {
      return (
        <>
          <div className="slider__content">
            <h1 className="slider__title">{title}</h1>
            <p className="slider_text">{subtitle}</p>
          </div>
          <img src={imageSrc} alt="Travel" className="slider__image" />
        </>
      );
    }
  };

  return (
    <div className={inView ? "slider slider--zoom" : "slider"} ref={ref}>
      {renderContent()}
    </div>
  );
};

export default Slider;
