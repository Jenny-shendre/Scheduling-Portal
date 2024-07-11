import React, { useEffect, useState } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import Fram from "../assets/Fram.png";
import Rectangle from "../../src/assets/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSlider } from "../features/Data";

function ScheduledCard2() {
  const [servicePersonName, setServicePersonName] = useState({});
  const Slider = useSelector((state) => state);
  const dispatch = useDispatch();

  const datacall = () => {
    setServicePersonName(...Slider.Slider);
    console.log("Slider", Slider);
  };

  useEffect(() => {
    datacall();
  }, []);

  console.log("Slider", servicePersonName.servicePersonName);

  return (
    <>
      <div className="opImg" style={{ backgroundColor: 'rgba(218, 203, 187, 0.7)' }}>
        <div>
          <img className="h-full fixed w-full lg:opacity-[25%] md:opacity-[25%] sm:opacity-[40%] sm:bg-[#c49f82] backimg" src={img} alt="Background"></img>
        </div>

        <div className="opacity-100 min-h-screen flex flex-col items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] w-[760px] h-[548px] flex flex-col items-center text-center px-6">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-[174.86px] h-[127.14px]" /> {/* Adjusted logo size */}
            </div>

            <p className="text-[#632E04] font-700 text-[32px] mb-6 font-Manrope">
              Thank you, your service has been scheduled
            </p>

            <div className="flex items-center justify-center">
              <img
                src={Rectangle}
                alt="Ashok Reddy"
                className="h-[192px] w-[192px] object-cover"
              />
            </div>

            <p className="text-[#632E04] text-[24px] mb-2 font-Manrope font-600">
              You have been assigned with "{servicePersonName.servicePersonName}"
            </p>
            <p className="text-[#632E04] text-[16px] font-Manrope font-600">
              Kindly wait for a few minutes, you will be attended shortly.
            </p>
          </div>

          <Link to="/" className="relative z-20">
            <div className="arrowss w-[64px] h-[64px] mt-4">
              <img
                className="cursor-pointer"
                src={Fram}
                onClick={() => dispatch(removeSlider())}
                alt="Back"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ScheduledCard2;
