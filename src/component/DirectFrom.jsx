import React from "react";
import Logo from "../assets/Logo.png";
import img from "../assets/img3.png";
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

  const validateNoNumbersOrSpecialChars = (value) => {
    return /^[A-Za-z\s]+$/.test(value) || "Please enter a valid name";
  };

  return (
    <>
      <div className="opImg" style={{ backgroundColor: 'rgba(218, 203, 187, 0.7)' }}>
        <div>
          <img className="h-full fixed w-full lg:opacity-[25%] md:opacity-[25%] sm:opacity-[40%] sm:bg-[#c49f82] backimg" src={img} alt="Background" />
        </div>
        <Link to="/">
          <div className="fixed arrowss w-[64px] h-[64px] bottom-4 left-4">
            <img className="cursor-pointer" src={Frame} alt="Back" />
          </div>
        </Link>

        <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] px-6 py-6 w-[514px] h-auto flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-[168px] h-[151px]" /> {/* Adjusted logo size */}
            </div>

            <form className="space-y-4 w-full px-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="mobile"
                  className="block input-fonts font-Manrope"
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
                  className="mt-1 font-Manrope block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
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
                  className="block input-fonts font-Manrope"
                >
                  Customer's Name
                </label>
                <input
                  {...register("name", {
                    required: true,
                    validate: {
                      firstLetterCapital: validateFirstLetterCapital,
                      noNumbersOrSpecialChars: validateNoNumbersOrSpecialChars
                    }
                  })}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="mt-1 font-Manrope block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
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
                  className="block input-fonts font-Manrope"
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
                  className="mt-1 font-Manrope block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 "
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Please enter a valid email
                  </span>
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="font-Manrope ProceedforStep2 mt-2 bg-[#632E04] text-white rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                  Proceed for Step 2
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DirectForm;
