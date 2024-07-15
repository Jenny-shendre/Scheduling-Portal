import React from "react";
import img from "../assets/img.png";
import Logo from "../assets/Logo.png";
import From from "../assets/From.png";
import From1 from "../assets/From1.png";
import From2 from "../assets/From2.png";
import { Link } from "react-router-dom";
import "../home.css";
function Slide() {
  return (
    <div>
      <div className=" opacity-[50%] ">
        <img className=" h-[1000px] fixed w-full " src={img}></img>
      </div>
      <div class=" slidessss opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] ">
        <div class="bg-[#FFFFFF99] bg-opacity-90 p-32 rounded-lg shadow-lg z-[1]  max-h-[614px]  max-w-[564px]">
          <div class="flex flex-col slidesss items-center lg:-mt-20">
            <img src={Logo} alt="Logo" className="logo" />
          </div>

          <h1 class="text-[24px] slides font-semibold lg:w-[500px] lg:relative lg:right-16 font-[Manrope] text-[#42281B]">
            Welcome! to ROF's Self Scheduling Portal
          </h1>

          <div class="grid grid-cols-3 slidess gap-40 mb-6 lg:relative lg:right-[75px] lg:mt-16 cursor-pointer">
            <Link to="/Slide1">
              <div class="flex flex-col items-center shadow-sm p-4 border-2 w-[138px] h-[128px] bg-white  rounded-lg hover:border-[#632E04] transition">
                <img className="max-h-[68px] max-w-[68px] " src={From}></img>
                <span class=" text-[#632E04] text-[12.8px] font-Manrope">
                  Channel partner
                </span>
              </div>
            </Link>

            <Link to="/DirectFrom">
              <div class="flex flex-col items-center  p-4 border-2 w-[138px] h-[128px] bg-white shadow-sm rounded-lg hover:border-[#632E04] transition">
                <img className="max-h-[68px] max-w-[68px] " src={From1}></img>
                <span class=" text-[#632E04] text-[12.8px] font-Manrope">
                  Direct Customer
                </span>
              </div>
            </Link>

            <Link to="/ServiceRequestForm">
              <div class="flex flex-col items-center shadow-red-200 shadow-sm p-4 border-2 w-[138px] h-[128px] bg-white rounded-lg hover:border-[#632E04] transition">
                <img className="max-h-[68px] max-w-[68px] " src={From2}></img>
                <span class=" text-[#632E04] text-[12.8px] font-Manrope">
                  Service Request
                </span>
              </div>
            </Link>
          </div>

          <p class="text-center text-[14px] font-[Manrope] text-[#42281B] slide-font-color">
            Please select options below to proceed further
          </p>
        </div>
      </div>
    </div>
  );
}

export default Slide;
