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
        "https://prodictivity-management-tool2.vercel.app/api/customers/save",
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
              <img src={Logo} alt="Logo" className="logo w-56 h-44" />{" "}
              {/* Adjusted logo size */}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div ref={dropdownRef}>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-700 text-brown-700 font-Manrope">
                  Project Name
                </label>
                <div
                  className="relative bg-white mt-1 font-Manrope block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div className="cursor-pointer flex justify-between items-center">
                    {selectedProject || "Choose project"}
                    <img
                      className="DropIcon ml-2"
                      src={Drop}
                      alt="Dropdown Icon"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute font-Manrope select-menu z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {data.map((project) => (
                        <div
                          key={project.name}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() =>
                            handleProjectChange(project.name, project.location)
                          }>
                          {project.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.projectName && (
                  <span className="text-red-600">
                    {errors.projectName.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="projectLocation"
                  className="block text-sm font-700 text-brown-700 font-Manrope">
                  Project Location
                </label>
                <input
                  type="text"
                  id="projectLocation"
                  name="projectLocation"
                  value={projectLocation}
                  readOnly
                  className="mt-1 font-Manrope block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2 focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                />
              </div>

              <div className="p-5">
                <button
                  type="submit"
                  className="font-Manrope font-700 w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
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
