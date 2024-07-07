import React from "react";
import Logo from "../assets/Logo.png";
import img from "../assets/img.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import axios from "axios";
import { addSlider } from "../features/Data";
import { useDispatch } from "react-redux";

function DirectForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      ChannelName: data.ChannelName,
      EmailId: data.EmailId,
      MobileNo: data.MobileNo,
    };
    dispatch(addSlider(data));
    console.log(data);
    navigate("/LocationDirect");
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobile", value, { shouldValidate: true });
  };

  const validateFirstLetterCapital = (value) => {
    return /^[A-Z]/.test(value) || "First letter should be capital";
  };

  return (
    <>
      <div>
        <div className="opacity-[50%]">
          <img className="h-full fixed w-full" src={img} alt="Background" />
        </div>
        <Link to="/">
          <div className="fixed arrowss bottom-4 left-4">
            <img
              className="lg:mt-[570px] lg:ml-12 cursor-pointer"
              src={Frame}
              alt="Back"
            />
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
                    htmlFor="mobile"
                    className="block text-sm font-700 text-brown-700 font-Manrope"
                  >
                    Mobile No
                  </label>
                  <input
                    {...register("mobile", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                      onChange: handleMobileInput
                    })}
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="1234567890"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.mobile && (
                    <span className="text-red-500 text-sm">
                      This field is required and must be a 10-digit number
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-700 text-brown-700 font-Manrope"
                  >
                    Customer's Name
                  </label>
                  <input
                    {...register("name", {
                      required: true,
                      validate: validateFirstLetterCapital
                    })}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message || "This field is required"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-700 text-brown-700 font-Manrope"
                  >
                    Email Id
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                    })}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      Please enter a valid email
                    </span>
                  )}
                </div>

                <div className="p-2">
                  <button
                    type="submit"
                    className="font-Manrope font-700 w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
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

export default DirectForm;
