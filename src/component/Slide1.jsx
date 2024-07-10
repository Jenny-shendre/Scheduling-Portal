import React from "react";
import Logo from "../assets/Logo.png";
import img from "../assets/img3.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import "../home.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addSlider } from "../features/Data";

function Slide1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      channelPartnerName: data.channelPartnerName,
      channelPartnerCompanyName: data.channelPartnerCompanyName,
      customerName: data.customerName,
      customerMobileLastFour: data.customerMobileLastFour,
    };
    dispatch(addSlider(data));
    try {
      const response = await axios.post("", userInfo);
      console.log("API Response:", response.data);
      navigate("/Slide2");
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      navigate("/Slide2"); // Optionally navigate even on error
    }
  };

  const handleInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    e.target.value = value;
  };

  const validateFirstLetterCapital = (value) => {
    return /^[A-Z]/.test(value) || "First letter should be capital";
  };

  return (
    <>
      <div className="opImg" style={{backgroundColor:'rgba(218, 203, 187, 0.7)'}}>
        <div >
          <img className="h-full fixed w-full lg:opacity-[25%] md:opacity-[25%] sm:opacity-[40%] sm:bg-[#c49f82] backimg" src={img} alt="Background" />
        </div>
        <Link to="/">
          <div className="fixed arrowss bottom-4 left-4">
            <img className="cursor-pointer" src={Frame} alt="Back" />
          </div>
        </Link>
        <div>
          <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
            <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md">
              <div className="flex flex-col items-center">
                <img src={Logo} alt="Logo" className="logo w-56 h-44" /> {/* Adjusted logo size */}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="channelPartnerName"
                    className="block text-sm font-700  text-brown-700 font-[Manrope]"
                  >
                    Channel Partner's Name
                  </label>
                  <input
                    {...register("channelPartnerName", {
                      required: true,
                      validate: validateFirstLetterCapital
                    })}
                    type="text"
                    id="channelPartnerName"
                    name="channelPartnerName"
                    placeholder="John Doe"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.channelPartnerName && (
                    <span className="text-red-500 text-sm">
                      {errors.channelPartnerName.message || "This field is required"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="channelPartnerCompanyName"
                    className="block text-sm font-700  text-brown-700 font-Manrope"
                  >
                    Channel Partner's Company Name
                  </label>
                  <input
                    {...register("channelPartnerCompanyName", {
                      required: true,
                    })}
                    type="text"
                    id="channelPartnerCompanyName"
                    name="channelPartnerCompanyName"
                    placeholder="Acme Realtors"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.channelPartnerCompanyName && (
                    <span className="text-red-500 text-sm">This field is required</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-700  text-brown-700 font-Manrope"
                  >
                    Customer Name
                  </label>
                  <input
                    {...register("customerName", {
                      required: true,
                      validate: validateFirstLetterCapital
                    })}
                    type="text"
                    id="customerName"
                    name="customerName"
                    placeholder="John Doe"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.customerName && (
                    <span className="text-red-500 text-sm">
                      {errors.customerName.message || "This field is required"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customerMobileLastFour"
                    className="block text-sm font-700  text-brown-700 font-Manrope"
                  >
                    Last four digits of Customer Mobile Number
                  </label>
                  <input
                    {...register("customerMobileLastFour", {
                      required: true,
                      maxLength: 4,
                      pattern: /^[0-9]{4}$/,
                    })}
                    type="text"
                    id="customerMobileLastFour"
                    name="customerMobileLastFour"
                    placeholder="1234"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                    onInput={handleInput}
                  />
                  {errors.customerMobileLastFour && (
                    <span className="text-red-500 text-sm">
                      This field is required and must be 4 digits
                    </span>
                  )}
                </div>

                <div className="p-2">
                  <button
                    type="submit"
                    className="font-Manrope font-700  w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                  >
                    Proceed for Step 2
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slide1;
