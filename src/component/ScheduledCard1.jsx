import React, { useEffect, useState } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import Photh from "../assets/Photh.png";
import Fram from "../assets/Fram.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSlider } from "../features/Data";

function ScheduledCard1() {
  const [servicePersonName, setservicePersonName] = useState({});
  const Slider = useSelector((state) => state);
  const dispatch = useDispatch();

  const datacall = () => {
    setservicePersonName(Slider.Slider);
    console.log("Slider");
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
            alt="Background"
          />
        </div>

        <div className="opacity-100 min-h-screen flex flex-col items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md text-center">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-56 h-44" />{" "}
              {/* Adjusted logo size */}
            </div>

            <p className="text-[#632E04] font-700 text-xl mb-4 font-Manrope">
              Thank you, you have been scheduled
            </p>

            <div className="flex justify-center mb-4">
              <img
                src={Photh}
                alt="Ashok Reddy"
                className="h-24 w-24 object-cover"
              />
            </div>

            <p className="text-[#632E04] font-600 text-lg mb-2 font-Manrope">
              You have been Assigned with "{servicePersonName.attendantName}"
            </p>
            <p className="text-[#632E04] font-600 text-sm font-Manrope">
              kindly wait for few minutes you will be attended shortly.
            </p>
          </div>

          <Link to="/">
            <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
              <img
                className="cursor-pointer"
                src={Fram}
                alt="Back"
                onClick={() => dispatch(removeSlider())}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ScheduledCard1;
