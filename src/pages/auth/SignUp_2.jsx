import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
library.add(faUpload);

export default function SignUp_2() {
  const [organizationName, setOrganizationName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [organizationNameFocused, setOrganizationNameFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);

  // Function to handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform validation
    if (
      !organizationName.trim() ||
      !address.trim() ||
      selectedFiles.length === 0
    ) {
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
    // Proceed with form submission if all validations pass
    // Your code to handle form submission...
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
              <div className="mb-6">
                <label
                  htmlFor="organizationName"
                  className={`block text-base font-normal mb-1 ${
                    organizationNameFocused
                      ? "text-supplair-primary"
                      : "text-gray-500"
                  }`}
                >
                  Organization Name <span className=" text-red-600">*</span>
                </label>
                <input
                  id="organizationName"
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 max-w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="text"
                  value={organizationName}
                  onFocus={() => setOrganizationNameFocused(true)}
                  onBlur={() => setOrganizationNameFocused(false)}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
              </div>
              <div className="mb-10">
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
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
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
