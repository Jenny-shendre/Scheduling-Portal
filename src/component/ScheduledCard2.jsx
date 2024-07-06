import React, { useEffect, useState } from "react";
import img from "../assets/img.png";
import Logo from "../assets/Logo.png";
import Fram from "../assets/Fram.png";
import Rectangle from "../../src/assets/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSlider } from "../features/Data";

function ScheduledCard2() {
  const [servicePersonName, setservicePersonName] = useState({});
  const Slider = useSelector((state) => state);
  const dispatch = useDispatch();

  const datacall = () => {
    setservicePersonName(...Slider.Slider);
    console.log("Slider", Slider);
  };

  useEffect(() => {
    datacall();
  }, []);

  console.log("Slider", servicePersonName.servicePersonName);

  return (
    <>
      <div>
        <div className="opacity-[50%]">
          <img className="h-[1000px] fixed w-full" src={img} alt="Background"></img>
        </div>

        <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-5 w-full max-w-md text-center">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-44 h-44" /> {/* Adjusted size */}
            </div>

            <p className="text-[#632E04] font-700 text-lg mb-4 font-Manrope">
              Thank you, your service have been scheduled
            </p>

            <div className="flex justify-center ">
              <img
                src={Rectangle}
                alt="Ashok Reddy"
                className="h-28 w-28 object-cover"
              />
            </div>

            <p className="text-[#632E04] text-lg font-bold mb-2 font-Manrope">
              You have been Assigned with "{servicePersonName.servicePersonName}"
            </p>
            <p className="text-[#632E04] text-sm font-bold font-Manrope">
              kindly wait for few minutes you will be attended shortly.
            </p>
          </div>
        </div>

        <Link to="/">
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
            <img
              className="cursor-pointer"
              src={Fram}
              onClick={() => dispatch(removeSlider())}
              alt="Back"
            />
          </div>
        </Link>
      </div>
    </>
  );
}

export default ScheduledCard2;
