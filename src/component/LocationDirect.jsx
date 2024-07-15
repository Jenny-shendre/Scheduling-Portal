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

const projectLocations = {
  project1: "123 Main St, City A",
  project2: "456 Oak Ave, City B",
  project3: "789 Pine Rd, City C",
};

function LocationDirect() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const Slider = useSelector((state) => state);
  const handleProjectChange = (event) => {
    const projectValue = event.target.value;
    setSelectedProject(projectValue);
    setProjectLocation(projectLocations[projectValue] || "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      ProjectName: data.ProjectName,
      ProjectLocation: data.ProjectLocation,
    };
    let object = {
      ...Slider.Slider[0],
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
    const filteredData = data.filter(
      (project) => selectedProject === project.name
    );
    if (filteredData.length > 0) {
      setProjectLocation(filteredData[0].location);
    } else {
      setProjectLocation("");
    }
  }, [selectedProject, data]);
  return (
    <>
      <div>
        <div className="opacity-[50%]">
          <img className="h-[1000px] fixed w-full" src={img} alt="Background" />
        </div>

        <Link to="/DirectFrom">
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
                  htmlFor="projectName"
                  className="block text-sm font-medium text-brown-700 font-Manrope">
                  Project Name
                </label>
                <select
                  {...register("projectName", { required: true })}
                  id="projectName"
                  name="projectName"
                  value={selectedProject}
                  onChange={handleProjectChange}
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

              <div>
                <label
                  htmlFor="projectLocation"
                  className="block text-sm font-medium text-brown-700 font-Manrope">
                  Project Location
                </label>
                <input
                  // {...register("projectLocation", { required: true })}
                  type="text"
                  id="projectLocation"
                  name="projectLocation"
                  value={projectLocation}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm p-2 focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                />
                {/* {errors.projectLocation && <span>This field is required</span>} */}
              </div>

              <div className="p-5">
                <button
                  type="submit"
                  className="font-Manrope w-full bg-[#632E04] text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
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
