import React from "react";
import Logo from "../assets/Logo.png";
import img from "../assets/img.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import { useDispatch } from "react-redux";
import { addSlider } from "../features/Data";

function ServiceRequestForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(addSlider(data));
    navigate('/LoactionService');

  };

  return (
    <>
      <div>
        <div className="opacity-[50%]">
          <img className="h-[1000px] fixed w-full" src={img} alt="Background" />
        </div>
        <Link to='/'>
          <div className="fixed arrowss">
            <img className="lg:mt-[570px] lg:ml-12  cursor-pointer" src={Frame} />
          </div>
        </Link>
        <div>
          <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
            <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md">
              <div className="flex flex-col items-center">
                <img src={Logo} alt="Logo" className="logo" />
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="channelName"
                    className="block text-sm font-medium text-brown-700 font-Manrope"
                  >
                    Customer’s Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.CustomerName && <span>This field is required</span>}
                </div>

                <div>
                  <label
                    htmlFor="mobileNo"
                    className="block text-sm font-medium text-brown-700 font-Manrope"
                  >
                    Mobile No *
                  </label>
                  <input
                    {...register("mobileNo", { required: true })}
                    type="text"
                    id="mobileNo"
                    name="mobileNo"
                    placeholder="8669711028"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.mobileNo && <span>This field is required</span>}
                </div>

                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-medium text-brown-700 font-Manrope"
                  >
                    Customer ID
                  </label>
                  <input
                    {...register("customerId", { required: true })}
                    type="text"
                    id="customerId"
                    name="customerId"
                    placeholder="ROFC001"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-2"
                  />
                  {errors.MobileNoName && <span>This field is required</span>}
                </div>

                <div className="p-2">
                  <button
                    type="submit"
                    className="font-Manrope w-full bg-red-950 text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
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

export default ServiceRequestForm;
