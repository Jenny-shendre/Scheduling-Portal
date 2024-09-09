import React, { useEffect, useState, useRef } from "react";
import img from "../assets/img3.png";
import Logo from "../assets/Logo.png";
import Drop from "../../src/assets/Drop.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import CaptureIcon from "../assets/CaptureIcon.png";
import UploadIcon from "../assets/UploadIcon.png";
import "../home.css";
import axios from "axios";
import { useSelector } from "react-redux";

function UploadCheque() {
  const navigate = useNavigate();
  const Slider = useSelector((state) => state);
  const [selectedProject, setSelectedProject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const dropdownRef = useRef(null);
  const captureInputRef = useRef(null);
  const uploadInputRef = useRef(null);
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleProjectChange = (projectName) => {
    setSelectedProject(projectName);
    setIsDropdownOpen(false);
    clearErrors("projectName");
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

  const onSubmit = async () => {
    if (!selectedProject) {
      setError("projectName", {
        type: "manual",
        message: "This field is required",
      });
      return;
    }

    const formData = new FormData();
    formData.append("mobileNo", Slider.Slider.mobileNo);
    formData.append("name", Slider.Slider.name);
    formData.append("customerId", Slider.Slider.customerId);
    formData.append("selectedProject", selectedProject);
    formData.append(
      "chequeImage",
      capturedImage
        ? dataURLtoFile(capturedImage, "cheque.png")
        : dataURLtoFile(uploadedImage, "cheque.png")
    );

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/chequeImage/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res", res);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCaptureClick = () => {
    captureInputRef.current.click();
    uploadInputRef.current.disabled = true;
  };

  const handleUploadClick = () => {
    uploadInputRef.current.click();
    captureInputRef.current.disabled = true;
  };

  const handleCaptureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        setUploadedImage(null);
        uploadInputRef.current.disabled = true;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setCapturedImage(null);
        captureInputRef.current.disabled = true;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCapturedImage(null);
    setUploadedImage(null);
    uploadInputRef.current.disabled = false;
    captureInputRef.current.disabled = false;
  };

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

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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

        <Link to="/Cheque1">
          <div className="fixed arrowss w-[64px] h-[64px] bottom-4 left-4">
            <img className="cursor-pointer" src={Frame} alt="Back" />
          </div>
        </Link>
        <div className="opacity-100 min-h-screen flex justify-center items-center font-['Roboto'] bg-[#DACBBB]">
          <div className="bg-[#FFFFFF60] backdrop-blur-lg mt-[54px] bg-opacity-90 rounded-lg shadow-lg z-[1] px-6 w-[514px] h-fit pb-7 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="Logo" className="logo w-[168px] h-[151px]" />
            </div>

            <form
              className="space-y-4 w-full px-6"
              onSubmit={handleSubmit(onSubmit)}>
              <div ref={dropdownRef}>
                <label
                  htmlFor="projectName"
                  className="block input-fonts font-Manrope">
                  Project Name
                </label>
                <div
                  className="relative bg-white mt-1 font-Manrope text-[18px] font-500 text-[#000000] block input-fields shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div className="cursor-pointer flex justify-between items-center">
                    {selectedProject || "Choose Project"}
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
                          onClick={() => handleProjectChange(project.name)}>
                          {project.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.projectName && (
                  <span className="text-red-700">
                    {errors.projectName.message}
                  </span>
                )}
              </div>
              <label
                htmlFor="projectName"
                className="block input-fonts font-Manrope">
                {capturedImage ? "Captured Cheque" : "Upload Cheque"}
              </label>
              <div className="w-[426px] flex justify-between gap-[10px]">
                <div
                  className={`Capture-Cheque w-[210px] h-[129px] border-2 border-[#9F9F9F] bg-white border-dashed rounded-md px-[12px] py-[26px] flex flex-col items-center justify-center cursor-pointer ${
                    uploadedImage ? "blur-sm cursor-not-allowed" : ""
                  }`}
                  onClick={!capturedImage ? handleCaptureClick : undefined}>
                  {capturedImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={capturedImage}
                        alt="Captured Cheque"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px]">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={CaptureIcon}
                        alt="Capture Cheque"
                        className="w-10 h-10 mb-2"
                      />
                      <span className="font-Manrope text-[16px] font-[400]">
                        Capture Cheque Image
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={captureInputRef}
                    onChange={handleCaptureChange}
                    className="hidden"
                  />
                </div>
                <div
                  className={`Upload-Cheque w-[210px] h-[129px] border-2 border-[#9F9F9F] bg-white border-dashed rounded-md px-[12px] py-[26px] flex flex-col items-center justify-center cursor-pointer ${
                    capturedImage ? "blur-sm cursor-not-allowed" : ""
                  }`}
                  onClick={!uploadedImage ? handleUploadClick : undefined}>
                  {uploadedImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={uploadedImage}
                        alt="Uploaded Cheque"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px]">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={UploadIcon}
                        alt="Upload Cheque"
                        className="w-10 h-10 mb-2"
                      />
                      <span className="font-Manrope text-[16px] font-[400]">
                        Upload Image
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={uploadInputRef}
                    onChange={handleUploadChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="font-Manrope ProceedforStep2 mt-6 p-[10px] bg-[#632E04] text-white hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadCheque;
