

import React, { useEffect, useState } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import photo from "../assets/account_circle.png";
import Fram from "../assets/Fram.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSlider } from "../features/Data";

function SlideNew() {
  const [servicePersonName, setservicePersonName] = useState({});
  const Slider = useSelector((state) => state);
  const dispatch = useDispatch();

  const datacall = () => {
    setservicePersonName(Slider.Slider);
    console.log("Slider", servicePersonName);
  };

  useEffect(() => {
    datacall();
  }, []);

  return (
    <>
      <div
        className="opImg"
        style={{ backgroundColor: "rgba(218, 203, 187, 0.7)" }}>
        <div>
          <img
            className="h-full fixed w-full lg:opacity-[25%] md:opacity-[25%] sm:opacity-[40%] sm:bg-[#c49f82] backimg"
            src={img}
            alt="Background"></img>
        </div>

        <div className="opacity-100 min-h-screen flex flex-col items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF60] backdrop-blur-lg bg-opacity-90 rounded-lg shadow-lg z-[1] w-[614px] h-[548px] flex flex-col items-center text-center px-6">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-[139px] h-[127.15px]" /> {/* Adjusted logo size */}
            </div>

            <p className="text-[#353535] font-700 text-[24px] mb-6 font-Manrope w-[566px] h-[85px]"  > 
            We're currently busy. Thanks for your request. We'll assign a new sales rep soon
            </p>
            <div className="flex items-center justify-center pt-4 ">
            {/* // style={{ border:"1px solid red"}} > */}
              <img
                src={photo}
                alt="Ashok Reddy"
                className="h-[194px] w-[194px] object-cover "
                // style={{ border:"1px solid red"}}
              />
            </div>

            <p className="text-[#632E04] text-[24px] mb-2 font-Manrope font-500"
            style={{width:"501px",height:"33px"}}>
              {/* You have been Assigned with <span className="font-bold">"{servicePersonName.attendantName}"</span> */}
            
            </p>
            <p className="text-[#353535] text-[16px] font-Manrope font-600 w-[501px] h-[33px]">
            {/* style={{width:"418px",height:"22px"}}   */}
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

export default SlideNew;


