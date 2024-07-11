import React, { useEffect } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import From from "../assets/From.png";
import From1 from "../assets/From1.png";
import From2 from "../assets/From2.png";
import { Link } from "react-router-dom";
import "../home.css";

function Slide() {
  useEffect(() => {
    const textHoverDivs = document.querySelectorAll('.text-hover');
    textHoverDivs.forEach(div => {
      div.addEventListener('mouseover', () => {
        div.classList.add('hovered'); // Apply hovered class on hover
      });

      div.addEventListener('mouseout', () => {
        div.classList.remove('hovered'); // Remove hovered class on mouseout
      });
    });

    return () => {
      textHoverDivs.forEach(div => {
        div.removeEventListener('mouseover', () => { });
        div.removeEventListener('mouseout', () => { });
      });
    };
  }, []);

  return (
    <div className="opImg" style={{
      backgroundColor: 'rgba(218, 203, 187, 1)'
    }}>
      <div>
        <img className="h-full fixed w-full lg:opacity-[25%] md:opacity-[25%] sm:opacity-[50%] sm:bg-[#c49f82] backimg" src={img} alt="Background"></img>
      </div>
      <div className="slidessss opacity-100 min-h-screen flex items-center justify-center font-['Roboto']">
        <div className="bg-[#FFFFFF99] text-center bg-opacity-90 px-24 py-[48px] rounded-lg shadow-lg z-[1] h-[614px] w-[565px]">
          <div className="flex flex-col slidesss items-center ">
            <img src={Logo} alt="Logo" className="logo w-[234px] h-[186px]" />
          </div>

          <h1 style={{ width: '487px' }} className="text-[24px] text-center slides font-700 lg:relative lg:right-16 font-[Manrope] text-[#42281B]">
            Welcome! to ROF's Self Scheduling Portal
          </h1>

          <div className="grid grid-cols-3 slidess gap-40 mb-3 relative lg:right-[60px] md:right-[60px] sm:right-[60px] lg:mt-10 cursor-pointer">
            <Link to="/Slide1">
              <div className="text-hover flex flex-col items-center shadow-sm p-4 border-2 w-[138px] h-[128px] bg-white rounded-lg hover:border-[#632E04] transition">
                <img className="channel max-h-[68px] max-w-[68px]" src={From} alt="Channel Partner"></img>
                <span className="font-semibold text-[12.8px] font-Manrope">Channel Partner</span>
              </div>
            </Link>

            <Link to="/DirectFrom">
              <div className="text-hover flex flex-col items-center p-4 border-2 w-[138px] h-[128px] bg-white shadow-sm rounded-lg hover:border-[#632E04] transition">
                <img className="direct max-h-[68px] max-w-[68px]" src={From1} alt="Direct Customer"></img>
                <span className=" font-semibold text-[12.8px] font-Manrope">Direct Customer</span>
              </div>
            </Link>

            <Link to="/ServiceRequestForm">
              <div className="text-hover flex flex-col items-center shadow-red-200 shadow-sm p-4 border-2 w-[138px] h-[128px] bg-white rounded-lg hover:border-[#632E04] transition">
                <img className="service max-h-[68px] max-w-[68px]" src={From2} alt="Service Request"></img>
                <span className="font-semibold text-[12.8px] font-Manrope">Service Request</span>
              </div>
            </Link>
          </div>

          <p className="text-center absolute text-[16px] font-[Manrope] mt-6 font-500 text-[#42281b] slide-font-color">
            Please select options below to proceed further
          </p>
        </div>
      </div>
    </div>
  );
}

export default Slide;
