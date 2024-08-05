import React, { useEffect, useState, useRef } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import Drop from "../../src/assets/Drop.png"; // Import the dropdown icon
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import "../home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSlider, removeSlider } from "../features/Data";

function LocationDirect() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const Slider = useSelector((state) => state);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleProjectChange = (projectName, projectLocation) => {
    setSelectedProject(projectName);
    setProjectLocation(projectLocation);
    setIsDropdownOpen(false);
    clearErrors("projectName"); // Clear errors when an option is selected
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://project-rof.vercel.app/api/projects"
        );
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    if (!selectedProject) {
      setError("projectName", {
        type: "manual",
        message: "This field is required",
      });
      return;
    }
    const userInfo = {
      ProjectName: data.projectName,
      ProjectLocation: data.projectLocation,
    };
    let object = {
      ...Slider.Slider,
      projectName: selectedProject,
      projectLocation: projectLocation,
    };

    console.log("object", object);
    try {
      const response = await axios.post(
        "https://project-rof.vercel.app/api/customers/save",
        {
          ...object,
        }
      );
      console.log("You message has been sent", response);
      dispatch(removeSlider());
      dispatch(addSlider(response.data));
      navigate("/ScheduledCard1");
    } catch (error) {
      console.error("something went wrong");
    }
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

        <Link to="/DirectFrom">
          <div className="fixed arrowss w-[64px] h-[64px] bottom-4 left-4">
            <img
              className=" cursor-pointer"
              src={Frame}
              alt="Back"
            />
          </div>
        </Link>
        <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF60] backdrop-blur-lg  rounded-lg shadow-lg z-[1] px-6 w-[514px] h-fit pb-7 flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-[168px] h-[151px]" /> {/* Adjusted logo size */}
            </div>

            <form className="space-y-4 w-full px-6" onSubmit={handleSubmit(onSubmit)}>
              <div ref={dropdownRef} className="w-full ">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-700 mt-5 text-brown-700 font-Manrope">
                  Project Name
                </label>
                <div
                  className="relative bg-white mt-1 font-Manrope text-[18px] font-500 text-[#000000] block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 p-[12px 24px 12px 24px]"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="cursor-pointer flex justify-between items-center w-[131] h-[25] ">
                    {selectedProject || "Choose project"}
                    <img className="DropIcon ml-2" src={Drop} alt="Dropdown Icon" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute font-Manrope select-menu z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {data.map((project) => (
                        <div
                          key={project.name}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() =>
                            handleProjectChange(project.name, project.location)
                          }
                        >
                          {project.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.projectName && <span className="text-red-700">{errors.projectName.message}</span>}
              </div>

              <div className="w-full">
                <label
                  htmlFor="projectLocation"
                  className="block text-sm  font-700 text-brown-700 font-Manrope">
                  Project Location
                </label>
                <input
                  type="text"
                  id="projectLocation"
                  name="projectLocation"
                  placeholder="123, Street Name, CIty"
                  value={projectLocation}
                  readOnly
                  className="mt-1 p-[12px 24px 12px 24px] w-[378] h-[25] font-Manrope block input-fields text-[18px] font-500 text-[#000000] shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="font-Manrope w-[202] h-[33] ProceedforStep2 mt-6 bg-[#632E04] text-white  hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                  Assign Executive
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationDirect;
