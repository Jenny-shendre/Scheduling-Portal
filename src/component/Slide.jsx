import React, { useEffect } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import From from "../assets/From.png";
import From1 from "../assets/From1.png";
import From2 from "../assets/From2.png";
import Cheque from "../assets/Cheque.png";
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
    <div className="opImg" style={{ backgroundColor: 'rgba(218, 203, 187, 1)' }}>
      <div>
        <img className="h-full fixed w-full lg:opacity-[25%] md:opacity-[25%] sm:opacity-[50%] sm:bg-[#c49f82] backimg" src={img} alt="Background"></img>
      </div>
      <div className="slidessss self-center bg-grey-100 min-h-screen flex items-center justify-center font-['Roboto']">
        <div className="hero-section bg-[#FFFFFF60] backdrop-blur-lg self-center text-center bg-opacity-60 p-[12px] w-[662px] h-[614px] rounded-lg shadow-lg z-[1] relative flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-4">
            <img src={Logo} alt="Logo"style={{width:"234px", height:"186px"}} />
          </div>

          <h1 className="text-[24px] text-center slides font-700 font-[Manrope] text-[#42281B]">
            Welcome! to ROF's Self Scheduling Portal
          </h1>

          <div className="flex justify-center w-full mt-10">
            <div className="card-section flex justify-evenly w-full mb-3 cursor-pointer">
              <Link to="/Slide1">
                <div className="card text-hover flex flex-col items-center shadow-sm p-3 border-2 w-[133px] h-[118px] bg-white rounded-lg hover:border-[#632E04] transition">
                  <img className="channel max-h-[68px] max-w-[68px]" src={From} alt="Channel Partner"></img>
                  <span className="font-semibold text-[12.8px] mt-2 font-Manrope">Channel Partner</span>
                </div>
              </Link>

              <Link to="/DirectFrom">
                <div className="card text-hover flex flex-col items-center p-3 border-2 w-[133px] h-[118px] bg-white shadow-sm rounded-lg hover:border-[#632E04] transition">
                  <img className="direct max-h-[68px] max-w-[68px]" src={From1} alt="Direct Customer"></img>
                  <span className="font-semibold text-[12.8px] mt-2 font-Manrope">Direct Customer</span>
                </div>
              </Link>

              <Link to="/ServiceRequestForm">
                <div className="card text-hover flex flex-col items-center shadow-red-200 shadow-sm p-3 border-2 w-[133px] h-[118px] bg-white rounded-lg hover:border-[#632E04] transition">
                  <img className="service max-h-[68px] max-w-[68px]" src={From2} alt="Service Request"></img>
                  <span className="font-semibold text-[12.8px] mt-2 font-Manrope">Service Request</span>
                </div>
              </Link>

              <Link to="/Cheque1">
                <div className="card text-hover flex flex-col items-center p-3 border-2 w-[133px] h-[118px] bg-white shadow-sm rounded-lg hover:border-[#632E04] transition">
                  <img className="cheque max-h-[68px] max-w-[68px]" src={Cheque} alt="Cheque"></img>
                  <span className="font-semibold text-[12.8px] mt-2 font-Manrope">Upload Cheque</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex justify-center w-full mt-6">
            <p className="text-center text-[16px] font-[Manrope] font-500 text-[#42281b] slide-font-color">
              Please select options above to proceed further
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
