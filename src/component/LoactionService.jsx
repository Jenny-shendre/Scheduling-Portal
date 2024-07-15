import React, { useEffect, useState } from "react";
import img from "../assets/img.png";
import Logo from "../assets/Logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import "../home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSlider, removeSlider } from "../features/Data";

function LoactionService() {
  const navigate = useNavigate();
  const Slider = useSelector((state) => state);

  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const [seviceRequest, setseviceRequest] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let object = {
    ...Slider.Slider[0],
    ...formData,
  };

  const onSubmit = async () => {
    // const completeData = { ...data, ...object };
    // console.log("object", completeData);

    console.log("object", object);

    try {
      const response = await axios.post(
        "https://prodictivity-management-tool2.vercel.app/api/seviceRequest",
        { ...object }
      );
      console.log("Your message has been sent", response);
      dispatch(removeSlider());
      dispatch(addSlider(response.data));
      navigate("/ScheduledCard2");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://prodictivity-management-tool2.vercel.app/api/projects"
        );
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    console.log(data);
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://prodictivity-management-tool2.vercel.app/api/services/fetch-all"
        );
        setseviceRequest(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    console.log(data);
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="opacity-[50%]">
          <img className="h-[1000px] fixed w-full" src={img} alt="Background" />
        </div>

        <Link to="/ServiceRequestForm">
          <div className="fixed arrowss bottom-4 left-4">
            <img
              className="lg:mt-[500px] lg:ml-12  cursor-pointer"
              src={Frame}
            />
          </div>
        </Link>
        <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-brown-700 font-Manrope">
                  Type of Service
                </label>
                <select
                  {...register("type", { required: true })}
                  id="type"
                  name="type"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50">
                  <option value="">Choose Services</option>
                  {seviceRequest.map((project) => (
                    <option
                      key={project.serviceType}
                      className="font-Manrope"
                      value={project.serviceType}>
                      {project.serviceType}
                    </option>
                  ))}
                </select>
                {errors.type && <span>This field is required</span>}
              </div>

              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-brown-700 font-Manrope">
                  Project Name
                </label>
                <select
                  {...register("projectName", { required: true })}
                  id="projectName"
                  name="projectName"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50">
                  <option value="">Select a project</option>
                  {data.map((project) => (
                    <option
                      key={project.name}
                      className="font-Manrope"
                      value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {errors.projectName && <span>This field is required</span>}
              </div>

              {/* <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-brown-700 font-Manrope"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2 focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                />
              </div> */}

              <div className="p-5">
                <button
                  type="submit"
                  className="font-Manrope w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                  Assign Service Person
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoactionService;
