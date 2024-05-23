import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

library.add(faUpload);

export default function SignUp_2() {
  const navigate = useNavigate();
  const location = useLocation();
  const companyName = location.state?.companyName || ""; // Retrieve company name from location state
  const [address, setAddress] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [addressFocused, setAddressFocused] = useState(false);
  const [hasDeliveryDates, setHasDeliveryDates] = useState(false);
  const [selectedWilayas, setSelectedWilayas] = useState([]);
  const wilayas = [
    { value: "01", label: "Adrar" },
    { value: "02", label: "Chlef" },
    { value: "03", label: "Laghouat" },
    { value: "04", label: "Oum El Bouaghi" },
    { value: "05", label: "Batna" },
    { value: "06", label: "Béjaïa" },
    { value: "07", label: "Biskra" },
    { value: "08", label: "Béchar" },
    { value: "09", label: "Blida" },
    { value: "10", label: "Bouira" },
    { value: "11", label: "Tamanrasset" },
    { value: "12", label: "Tébessa" },
    { value: "13", label: "Tlemcen" },
    { value: "14", label: "Tiaret" },
    { value: "15", label: "Tizi Ouzou" },
    { value: "16", label: "Algiers" },
    { value: "17", label: "Djelfa" },
    { value: "18", label: "Jijel" },
    { value: "19", label: "Sétif" },
    { value: "20", label: "Saïda" },
    { value: "21", label: "Skikda" },
    { value: "22", label: "Sidi Bel Abbès" },
    { value: "23", label: "Annaba" },
    { value: "24", label: "Guelma" },
    { value: "25", label: "Constantine" },
    { value: "26", label: "Médéa" },
    { value: "27", label: "Mostaganem" },
    { value: "28", label: "M'Sila" },
    { value: "29", label: "Mascara" },
    { value: "30", label: "Ouargla" },
    { value: "31", label: "Oran" },
    { value: "32", label: "El Bayadh" },
    { value: "33", label: "Illizi" },
    { value: "34", label: "Bordj Bou Arréridj" },
    { value: "35", label: "Boumerdès" },
    { value: "36", label: "El Tarf" },
    { value: "37", label: "Tindouf" },
    { value: "38", label: "Tissemsilt" },
    { value: "39", label: "El Oued" },
    { value: "40", label: "Khenchela" },
    { value: "41", label: "Souk Ahras" },
    { value: "42", label: "Tipaza" },
    { value: "43", label: "Mila" },
    { value: "44", label: "Aïn Defla" },
    { value: "45", label: "Naâma" },
    { value: "46", label: "Aïn Témouchent" },
    { value: "47", label: "Ghardaïa" },
    { value: "48", label: "Relizane" },
  ];

  const handleWilayaChange = (wilaya) => {
    setSelectedWilayas((prevSelectedWilayas) => {
      if (prevSelectedWilayas.includes(wilaya)) {
        return prevSelectedWilayas.filter((item) => item !== wilaya);
      } else {
        return [...prevSelectedWilayas, wilaya];
      }
    });
  };

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("All fields are required");
      return;
    }
    // Additional validation for file types (PDF)
    for (let i = 0; i < selectedFiles.length; i++) {
      if (!selectedFiles[i].name.toLowerCase().endsWith(".pdf")) {
        toast.error("Please upload only PDF files");
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register/company-infos",
        {
          name: companyName,
          address: address,
          fileUrls: [],
          hasDeliveryDate: hasDeliveryDates,
          wilayas: selectedWilayas,
        }
      );
      console.log("Response:", response.data);
      toast.success(
        "Thank you for signing up! Your registration is now in progress. We're working to create your account. Please be patient, and we'll notify you once it's complete."
      );
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("An error occurred while signing up");
      console.error("Error:", error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  // Calculate input height based on number of files
  const inputHeight = 40 + selectedFiles.length * 20; // Assuming each file name occupies 20px height

  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">
          Already have an account ?
        </span>
        <NavLink
          to="/login"
          className="ml-2 font-bold text-supplair-primary font-Raleway"
        >
          Log In
        </NavLink>
      </div>
      <div className="flex">
        <SidePage />

        <div className="flex flex-col items-center justify-center w-full h-screen pb-[12vh]">
          <h1 className="mt-20 mb-6 mr-32 text-3xl text-center">
            Set up your organization profile :
          </h1>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col items-center mt-4 mr-44">
              <div className="mb-6" style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="organizationName"
                  className={`block text-base font-normal mb-1 ${"text-gray-500"}`}
                >
                  Organization Name <span className=" text-red-600">*</span>
                </label>
                <input
                  id="organizationName"
                  className="h-10 py-2 pl-4 border border-gray-300 w-96 max-w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="text"
                  value={companyName}
                  disabled
                />
              </div>
              <div className="mb-10" style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="address"
                  className={`block text-base font-normal mb-1 ${
                    addressFocused ? "text-supplair-primary" : "text-gray-500"
                  }`}
                >
                  Address
                </label>
                <input
                  id="address"
                  className="h-10 py-2 pl-4 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="text"
                  value={address}
                  onFocus={() => setAddressFocused(true)}
                  onBlur={() => setAddressFocused(false)}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Added label for the file input */}
              <div className=" mr-[255px]">
                <label
                  htmlFor="fileInput"
                  className="block text-base font-normal mb-1 text-gray-500"
                >
                  Trade Registry(s) <span className="text-red-600">*</span>
                </label>
              </div>

              <div className="relative flex items-center mb-4">
                <input
                  id="fileInput"
                  className="hidden"
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                />
                <div
                  className="h-auto py-2 pl-10 pr-4 border border-gray-300 w-96 rounded-xl cursor-pointer flex items-center justify-between focus:outline-none focus:border-supplair-primary focus:border-2"
                  style={{ height: inputHeight }}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {selectedFiles.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className=" text-gray-500">
                      Upload Trade Registry
                    </span>
                  )}
                  <FontAwesomeIcon icon="upload" />
                </div>
              </div>

              {/* New Radio Buttons for Delivery Dates */}
              <div
                className="mb-6 flex items-center"
                style={{ alignItems: "flex-start", marginBottom: "1rem" }}
              >
                <label
                  htmlFor="deliveryDates"
                  className="block text-base font-normal mb-1 text-gray-500 mr-4"
                >
                  Does the company have delivery dates?
                </label>
                <div className="flex items-center">
                  <input
                    id="deliveryDatesYes"
                    name="deliveryDates"
                    type="radio"
                    className="h-4 w-4 text-supplair-primary border-gray-300 focus:ring-supplair-primary mr-1"
                    checked={hasDeliveryDates === true}
                    onChange={() => setHasDeliveryDates(true)}
                  />
                  <label
                    htmlFor="deliveryDatesYes"
                    className="text-gray-500 mr-4"
                  >
                    Yes
                  </label>
                  <input
                    id="deliveryDatesNo"
                    name="deliveryDates"
                    type="radio"
                    className="h-4 w-4 text-supplair-primary border-gray-300 focus:ring-supplair-primary mr-1"
                    checked={hasDeliveryDates === false}
                    onChange={() => setHasDeliveryDates(false)}
                  />
                  <label htmlFor="deliveryDatesNo" className="text-gray-500">
                    No
                  </label>
                </div>
              </div>
              {/* New Checkboxes for Wilayas */}
              <div className="mb-6">
                <label className="block text-base font-normal mb-1 text-gray-500">
                  Select Wilayas for Delivery:
                </label>
                <div
                  className="grid grid-cols-1 gap-2 max-h-40 overflow-y-scroll w-96 border border-gray-300 rounded-xl p-2"
                  style={{ height: "100px" }}
                >
                  {wilayas.map((wilaya) => (
                    <div key={wilaya.value} className="flex items-center">
                      <input
                        id={`wilaya-${wilaya.value}`}
                        type="checkbox"
                        className="h-4 w-4 text-supplair-primary border-gray-300 focus:ring-supplair-primary mr-2"
                        checked={selectedWilayas.includes(wilaya.value)}
                        onChange={() => handleWilayaChange(wilaya.value)}
                      />
                      <label
                        htmlFor={`wilaya-${wilaya.value}`}
                        className="text-gray-500"
                      >
                        {wilaya.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="h-10 mt-5 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                type="submit"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
