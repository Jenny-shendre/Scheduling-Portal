import React, { useEffect, useState, useRef } from "react";
import img from "../assets/img.png";
import Logo from "../assets/Logo.png";
import Drop from "../../src/assets/Drop.png"; // Import the dropdown icon
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
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const typeDropdownRef = useRef(null);
  const projectDropdownRef = useRef(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
    setIsTypeDropdownOpen(false);
    clearErrors("type"); // Clear errors when an option is selected
  };

  const handleProjectChange = (projectName) => {
    setFormData({ ...formData, projectName });
    setIsProjectDropdownOpen(false);
    clearErrors("projectName"); // Clear errors when an option is selected
  };

  const handleClickOutside = (event) => {
    if (
      typeDropdownRef.current &&
      !typeDropdownRef.current.contains(event.target)
    ) {
      setIsTypeDropdownOpen(false);
    }
    if (
      projectDropdownRef.current &&
      !projectDropdownRef.current.contains(event.target)
    ) {
      setIsProjectDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = async () => {
    if (!formData.type) {
      setError("type", { type: "manual", message: "This field is required" });
    }
    if (!formData.projectName) {
      setError("projectName", { type: "manual", message: "This field is required" });
    }
    if (!formData.type || !formData.projectName) {
      return;
    }

    const completeData = { ...data, ...formData, ...Slider.Slider[0] };
    console.log("object", completeData);

    try {
      const response = await axios.post(
        "https://prodictivity-management-tool2.vercel.app/api/seviceRequest",
        completeData
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
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="opacity-[50%]">
          <img className="h-full fixed w-full" src={img} alt="Background" />
        </div>

        <Link to="/ServiceRequestForm">
          <div className="fixed arrowss bottom-4 left-4">
            <img
              className="lg:mt-[500px] lg:ml-12 cursor-pointer"
              src={Frame}
              alt="Back"
            />
          </div>
        </Link>
        <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF99] bg-opacity-90 rounded-lg shadow-lg z-[1] p-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-56 h-44" /> {/* Adjusted logo size */}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div ref={typeDropdownRef}>
                <label
                  htmlFor="type"
                  className="block text-sm font-700 text-brown-700 font-Manrope">
                  Type of Service
                </label>
                <div
                  className="relative bg-white mt-1 font-Manrope block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                >
                  <div className="cursor-pointer flex justify-between items-center">
                    {formData.type || "Choose Services"}
                    <img className="DropIcon ml-2" src={Drop} alt="Dropdown Icon" />
                  </div>
                  {isTypeDropdownOpen && (
                    <div className="absolute font-Manrope select-menu z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {seviceRequest.map((service) => (
                        <div
                          key={service.serviceType}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleTypeChange(service.serviceType)}
                        >
                          {service.serviceType}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.type && <span className="text-red-600">{errors.type.message}</span>}
              </div>

              <div ref={projectDropdownRef}>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-700 text-brown-700 font-Manrope">
                  Project Name
                </label>
                <div
                  className="relative bg-white mt-1 font-Manrope block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                >
                  <div className="cursor-pointer flex justify-between items-center">
                    {formData.projectName || "Select a project"}
                    <img className="DropIcon  ml-2" src={Drop} alt="Dropdown Icon" />
                  </div>
                  {isProjectDropdownOpen && (
                    <div className="absolute font-Manrope select-menu z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {data.map((project) => (
                        <div
                          key={project.name}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProjectChange(project.name)}
                        >
                          {project.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.projectName && <span className="text-red-600">{errors.projectName.message}</span>}
              </div>

              <div className="p-5">
                <button
                  type="submit"
                  className="font-Manrope font-700 w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
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
