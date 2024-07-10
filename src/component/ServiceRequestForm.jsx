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
  const [data, setdata] = useState([]);
  const [Number, setNumber] = useState("");
  const [Time, setTime] = useState(0);
  const [name, setname] = useState("");
  const [customerId, setcustomerId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const ACS = {
    mobileNo: "9923110630",
    name: "Shailesh Dnyaneshwar Kale",
    customerId: "ROFC4",
  };

  console.log("ACS", ACS);
  useEffect(() => {
    const numberData = async (mobileNo) => {
      if (data.length === 0) {
        try {
          const res = await axios.put(
            "https://project-rof.vercel.app/api/seviceRequest",
            {
              mobileNo,
            }
          );
          setdata(res.data);
        } catch (error) {
          console.log(error.message);
        }
      }

      console.log("done", data);
    };
    numberData(Number);
  }, [Number.length === 10]);

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(addSlider(data));
    navigate("/LoactionService");
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobileNo", value, { shouldValidate: true });
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
          <div className="fixed bottom-4 left-4 lg:bottom-6 lg:left-6">
            <img className="cursor-pointer" src={Frame} alt="Back" />
          </div>
        </Link>
        <div>
          <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
            <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md">
              <div className="flex flex-col items-center">
                <img src={Logo} alt="Logo" className="logo w-56 h-44" />{" "}
                {/* Adjusted logo size */}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="mobileNo"
                    className="block text-sm font-700 text-brown-700 font-Manrope">
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
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                    onChange={(e) => setNumber(e.target.value)}
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
                    className="block text-sm font-700 text-brown-700 font-Manrope">
                    Customer’s Name*
                  </label>
                  <input
                    {...register("name", {
                      required: true,
                      validate: validateFirstLetterCapital,
                    })}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    onChange={(e) => setname(e.target.value)}
                    value={data.name}
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.name && (
                    <span className="text-green-600 text-sm">
                      {errors.name.message ||
                        "Please review the Customer’s Name and press again to proceed."}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customerId"
                    className="block text-sm font-700 text-brown-700 font-Manrope">
                    Customer ID
                  </label>
                  <input
                    {...register("customerId", { required: true })}
                    type="text"
                    id="customerId"
                    name="customerId"
                    placeholder="ROFC001"
                    onChange={(e) => setcustomerId(e.target.value)}
                    value={data.customerId}
                    className="mt-1 font-Manrope block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.customerId && (
                    <span className="text-green-600 text-sm">
                      Please review the customer ID and press again to proceed.
                    </span>
                  )}
                </div>

                <div className="p-2">
                  <button
                    type="submit"
                    className="font-Manrope font-700 w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
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

export default ServiceRequestForm;
