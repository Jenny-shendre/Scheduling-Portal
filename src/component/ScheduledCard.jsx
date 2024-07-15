import React, { useEffect, useState } from "react";
import img from "../assets/img.png";
import Logo from "../assets/Logo.png";
import Photh from "../assets/Photh.png";
import Fram from "../assets/Fram.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSlider } from "../features/Data";

function ScheduledCard() {
  const [servicePersonName, setservicePersonName] = useState({});
  const Slider = useSelector((state) => state);
  const dispatch = useDispatch();

  const datacall = () => {
    setservicePersonName(...Slider.Slider);
    console.log("Slider", servicePersonName);
  };
  useEffect(() => {
    datacall();
  }, []);
  return (
    <>
      <div>
        <div className=" opacity-[50%] ">
          <img className=" h-[1000px] fixed w-full " src={img}></img>
        </div>

        <div className="opacity-100 min-h-screen flex flex-col items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md text-center mb-4">
            <div class="flex flex-col items-center ">
              <img src={Logo} alt="Logo" className="logo" />
            </div>

            <p className="text-[#632E04] font-semibold text-xl mb-4 font-Manrope">
              Thank you, you have been scheduled
            </p>

            <div className="flex justify-center mb-4">
              <img
                src={Photh}
                alt="Ashok Reddy"
                className=" h-24 w-24 object-cover"
              />
            </div>

            <p className="text-[#632E04] text-lg mb-2 font-Manrope">
              You have been Assigned with "{servicePersonName.attendantName}"
            </p>
            <p className="text-[#632E04] text-sm font-Manrope">
              kindly wait for few minutes you will be attended shortly.
            </p>
          </div>

          <Link to="/" className="relative z-20 mt-4">
            <div className="arrowss mt-4">
              <img
                className="cursor-pointer"
                src={Fram}
                onClick={() => dispatch(removeSlider())}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ScheduledCard;
