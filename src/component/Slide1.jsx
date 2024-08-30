import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import img from "../assets/img3.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Frame from "../assets/Frame.png";
import "../home.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addSlider } from "../features/Data";
import Drop from "../../src/assets/Drop.png";

function Slide1() {
  const [inputChar1, setInputChar1] = useState("");
  const [inputChar2, setInputChar2] = useState("");
  const [inputChar3, setInputChar3] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [channelIDs, setchannelIDs] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      channelPartnerName: data.channelPartnerName,
      channelPartnerCompanyName: selectedCompany,
      customerName: data.customerName,
      customerMobileLastFour: data.customerMobileLastFour,
      channelID: channelIDs,
    };
    dispatch(addSlider(userInfo));
    console.log("userInfo", userInfo);
    try {
      const response = await axios.post("", userInfo);
      console.log("API Response:", response.data);
      navigate("/Slide2");
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      navigate("/Slide2");
    }
  };

  const [cname, setCname] = useState([]);
  const fetchData = async () => {
    await axios
      .get("https://project-rof.vercel.app/api/channels")
      .then((res) => setCname(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    e.target.value = value;
  };

  const validateFirstLetterCapital = (value) => {
    return /^[A-Z]/.test(value) || "First letter should be capital";
  };

  const validateNoNumbersOrSpecialChars = (value) => {
    return /^[A-Za-z\s]+$/.test(value) || "Please enter a valid name";
  };

  const handleChar = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setInputChar1(value);
    }
  };

  const handleChar2 = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setInputChar2(value);
    }
  };

  const handleChar3 = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setInputChar3(value);
    }
  };

  const handleDropdownSelect = (value) => {
    setSelectedCompany(value);
    setDropdownOpen(false);
  };

  const filteredCompanies = cname.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="fixed arrowss w-[64px] h-[64px] bottom-4 left-4">
            <img className="cursor-pointer" src={Frame} alt="Back" />
          </div>
        </Link>
        <div>
          <div className="opacity-100 min-h-screen flex items-center justify-center font-['Roboto'] bg-[#DACBBB]">
            <div className="bg-[#FFFFFF60] backdrop-blur-lg bg-opacity-90 rounded-lg shadow-lg z-[1] px-6 py-6 w-[514px] h-auto flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="logo w-[168px] h-[151px]"
                />{" "}
                {/* Adjusted logo size */}
              </div>

              <form
                className="space-y-4 w-full px-6"
                onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="channelPartnerName"
                    className="block input-fonts font-[Manrope]"
                    style={{
                      width: "210px",
                      height: "25px",
                      lineHeight: "24.59px",
                    }}>
                    Channel Partner's Name
                  </label>
                  <input
                    {...register("channelPartnerName", {
                      required: true,
                      validate: {
                        firstLetterCapital: validateFirstLetterCapital,
                        noNumbersOrSpecialChars:
                          validateNoNumbersOrSpecialChars,
                      },
                    })}
                    type="text"
                    value={inputChar1}
                    onChange={handleChar}
                    id="channelPartnerName"
                    name="channelPartnerName"
                    placeholder="John Doe"
                    className="mt-1 input-fields block input-fields rounded-md shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24.59px",
                    }}
                  />
                  {errors.channelPartnerName && (
                    <span className="text-red-500 text-sm">
                      {errors.channelPartnerName.message ||
                        "This field is required"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="channelPartnerCompanyName"
                    className="block input-fonts font-Manrope"
                    style={{
                      width: "297px",
                      height: "25px",
                      lineHeight: "24.59px",
                    }}>
                    Channel Partner's Company Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search and select a company"
                      className="mt-1 font-Manrope input-fields block rounded-md shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50 w-full"
                      style={{ fontWeight: "700" }}
                      value={selectedCompany || searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedCompany(""); // Clear selected company when searching
                        setDropdownOpen(true); // Open dropdown when typing
                      }}
                      onClick={() => setDropdownOpen(true)} // Open dropdown on click
                    />
                    {dropdownOpen && (
                      <div
                        className="absolute font-Manrope select-menu z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
                        style={{ left: 0, right: 0 }}>
                        {filteredCompanies.map((data) => (
                          <div
                            key={data.name}
                            onClick={() => {
                              handleDropdownSelect(data.name);
                              setchannelIDs(data.channelID);
                              setSearchTerm("");
                            }}
                            className="p-2 cursor-pointer hover:bg-gray-200 w-full">
                            {data.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.channelPartnerCompanyName && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customerName"
                    className="block input-fonts font-Manrope"
                    style={{
                      width: "141px",
                      height: "25px",
                      lineHeight: "24.59px",
                      fontWeight: "700",
                    }}>
                    Customer Name
                  </label>
                  <input
                    {...register("customerName", {
                      required: true,
                      validate: {
                        firstLetterCapital: validateFirstLetterCapital,
                        noNumbersOrSpecialChars:
                          validateNoNumbersOrSpecialChars,
                      },
                    })}
                    type="text"
                    value={inputChar3}
                    onChange={handleChar3}
                    id="customerName"
                    name="customerName"
                    placeholder="John Doe"
                    className="mt-1 font-Manrope input-fields block rounded-md shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24.59px",
                    }}
                  />
                  {errors.customerName && (
                    <span className="text-red-500 text-sm">
                      {errors.customerName.message || "This field is required"}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customerMobileLastFour"
                    className="block input-fonts font-[Manrope]"
                    style={{
                      width: "297px",
                      height: "25px",
                      lineHeight: "24.59px",
                    }}>
                    Customer Mobile Last 4 Digits
                  </label>
                  <input
                    {...register("customerMobileLastFour", { required: true })}
                    onInput={handleInput}
                    id="customerMobileLastFour"
                    name="customerMobileLastFour"
                    placeholder="XXXX"
                    className="mt-1 font-Manrope input-fields block rounded-md shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24.59px",
                    }}
                  />
                  {errors.customerMobileLastFour && (
                    <span className="text-red-500 text-sm">
                      {errors.customerMobileLastFour.message ||
                        "This field is required"}
                    </span>
                  )}
                </div>

                <div className="flex justify-center pt-5">
                  <button
                    type="submit"
                    className="w-[169px] h-[45px] bg-[#693806] text-white rounded-md shadow-lg font-semibold hover:bg-[#472304]"
                    style={{ fontFamily: "Manrope", fontWeight: "400" }}>
                    Next
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

export default Slide1;
