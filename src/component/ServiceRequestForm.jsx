import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import img from "../assets/img3.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import { useDispatch } from "react-redux";
import { addSlider } from "../features/Data";
import axios from "axios";

function ServiceRequestForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    mobileNo: "",
    name: "",
    customerId: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobileNo", value, { shouldValidate: true });
    if (value.length === 10) {
      fetchCustomerData(value);
    }
  };

  const fetchCustomerData = async (mobileNo) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/seviceRequest`,
        { mobileNo }
      );
      if (res.data) {
        setData(res.data);
        setValue("name", res.data.name);
        setValue("customerId", res.data.customerId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = (formData) => {
    dispatch(addSlider(formData));
    navigate("/LoactionService");
  };

  const validateFirstLetterCapital = (value) => {
    return (
      /^[A-Z]/.test(value) ||
      "Please Review your Name and press again to proceed"
    );
  };

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
        <Link to="/">
          <div className="fixed bottom-4 w-[64px] h-[64px] left-4 lg:bottom-6 lg:left-6">
            <img className="cursor-pointer" src={Frame} alt="Back" />
          </div>
        </Link>
        <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF60] backdrop-blur-lg bg-opacity-90 rounded-lg shadow-lg z-[1] px-6 w-[514px] h-auto py-6 flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-[168px] h-[151px]" />{" "}
              {/* Adjusted logo size */}
            </div>
            <form
              className="space-y-4 w-full px-6"
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="mobileNo"
                  className="block input-fonts font-Manrope w-[99px] h-[25px] ">
                  Mobile No *
                </label>
                <input
                  {...register("mobileNo", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                    onChange: handleMobileInput,
                  })}
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="8669711028"
                  className="mt-1 font-Manrope block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                />
                {errors.mobileNo && (
                  <span className="text-red-500 text-sm">
                    This field is required and must be a 10-digit number
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block input-fonts font-Manrope w-[168px] h-[25px] ">
                  Customer’s Name*
                </label>
                <input
                  {...register("name", {
                    required: true,
                    validate: validateFirstLetterCapital,
                  })}
                  type="text"
                  readOnly
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={data.name}
                  className="mt-1 font-Manrope block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 "
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message || "This field is required"}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="customerId"
                  className="block input-fonts font-Manrope  ">
                  Customer ID
                </label>
                <input
                  {...register("customerId", { required: true })}
                  type="text"
                  readOnly
                  id="customerId"
                  name="customerId"
                  placeholder="ROFC001"
                  value={data.customerId}
                  className="mt-1 font-Manrope block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 "
                />
                {errors.customerId && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="font-Manrope w-[217] h-[33] mt-2 ProceedforStep2 bg-[#632E04] text-white rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
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

export default ServiceRequestForm;
