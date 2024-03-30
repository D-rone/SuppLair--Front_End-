import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

library.add(faUpload);

export default function SignUp_3() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationNameFocused, setOrganizationNameFocused] = useState(false);
  const [newWilaya, setNewWilaya] = useState({ name: "", deliveryDate: "" });
  const [addedWilayas, setAddedWilayas] = useState([]);
  const [newRegion, setNewRegion] = useState({ name: "", deliveryDate: "" });
  const [addedRegions, setAddedRegions] = useState([]);
  const [newSector, setNewSector] = useState({ name: "", deliveryDate: "" });
  const [addedSectors, setAddedSectors] = useState([]);

  // Function to handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform validation
    if (!organizationName.trim()) {
      toast.error("All fields are required");
      return;
    }
    // Proceed with form submission if all validations pass
    // Your code to handle form submission...
  };

  //  add a new Wilaya
  const handleAddWilaya = () => {
    if (newWilaya.name.trim() && newWilaya.deliveryDate.trim()) {
      setAddedWilayas([...addedWilayas, newWilaya]);
      setNewWilaya({ name: "", deliveryDate: "" });
    } else {
      toast.error("Please enter both name and delivery date");
    }
  };

  //  remove a Wilaya
  const handleRemoveWilaya = (index) => {
    const updatedWilayas = [...addedWilayas];
    updatedWilayas.splice(index, 1);
    setAddedWilayas(updatedWilayas);
  };

  //  add a new Region
  const handleAddRegion = () => {
    if (newRegion.name.trim() && newRegion.deliveryDate.trim()) {
      setAddedRegions([...addedRegions, newRegion]);
      setNewRegion({ name: "", deliveryDate: "" });
    } else {
      toast.error("Please enter both name and delivery date");
    }
  };

  //  remove a Region
  const handleRemoveRegion = (index) => {
    const updatedRegions = [...addedRegions];
    updatedRegions.splice(index, 1);
    setAddedRegions(updatedRegions);
  };

  //  add a new Sector
  const handleAddSector = () => {
    if (newSector.name.trim() && newSector.deliveryDate.trim()) {
      setAddedSectors([...addedSectors, newSector]);
      setNewSector({ name: "", deliveryDate: "" });
    } else {
      toast.error("Please enter both name and delivery date");
    }
  };

  //  remove a Sector
  const handleRemoveSector = (index) => {
    const updatedSectors = [...addedSectors];
    updatedSectors.splice(index, 1);
    setAddedSectors(updatedSectors);
  };

  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">
          {" "}
          Already have an account ?{" "}
        </span>
        <NavLink
          to="/login"
          className="ml-2 font-bold text-supplair-primary font-Raleway"
        >
          {" "}
          Log In{" "}
        </NavLink>
      </div>
      <div className="flex h-screen">
        <SidePage />
        <div className="flex flex-col w-full overflow-y-auto">
          <div className="flex flex-col items-center justify-center flex-grow pb-[12vh]">
            <h1 className="mt-20 mb-6 mr-32 text-3xl text-center">
              {" "}
              Set up your organization profile :{" "}
            </h1>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col items-center mt-0 mr-44">
                <div className="mb-6">
                  <label
                    htmlFor="organizationName"
                    className={`block text-base font-normal mb-1 ${
                      organizationNameFocused
                        ? "text-supplair-primary"
                        : "text-gray-500"
                    }`}
                  >
                    {" "}
                    Organization Name <span className=" text-red-600">*</span>
                  </label>
                  <input
                    id="organizationName"
                    className="h-10 py-2 pl-4 border-2 border-supplair-primary w-96 max-w-96 rounded-xl focus:outline-none focus:border-2"
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <h2 className=" font-medium mb-3">Add new Wilaya</h2>
                  <div className=" ">
                    <input
                      placeholder="Name"
                      className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-0 w-40 rounded-xl focus:outline-none focus:border-2"
                      type="text"
                      value={newWilaya.name}
                      onChange={(e) =>
                        setNewWilaya({ ...newWilaya, name: e.target.value })
                      }
                    />
                    <input
                      placeholder="Delivery Date"
                      className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-7 ml-3 w-40 rounded-xl focus:outline-none focus:border-2"
                      type="text"
                      value={newWilaya.deliveryDate}
                      onFocus={(e) => e.target.setAttribute("type", "date")}
                      onBlur={(e) => e.target.setAttribute("type", "text")}
                      onChange={(e) =>
                        setNewWilaya({
                          ...newWilaya,
                          deliveryDate: e.target.value,
                        })
                      }
                    />
                    <button
                      className="text-supplair-primary font-raleway font-bold hover:underline focus:outline-none mr-0"
                      onClick={handleAddWilaya}
                    >
                      Add
                    </button>
                  </div>
                </div>
                {addedWilayas.length > 0 && (
                  <div className="mb-6">
                    <h2 className=" font-medium mb-3">Wilaya(s)</h2>
                    {addedWilayas.map((wilaya, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-0 w-40 rounded-xl focus:outline-none focus:border-2"
                          type="text"
                          value={wilaya.name}
                          readOnly
                        />
                        <input
                          className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-7 ml-3 w-40 rounded-xl focus:outline-none focus:border-2"
                          type="text"
                          value={wilaya.deliveryDate}
                          readOnly
                        />
                        <button
                          className="text-red-600 font-raleway font-bold hover:underline focus:outline-none mr-0"
                          onClick={() => handleRemoveWilaya(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mb-6">
                  <h2 className=" font-medium mb-3">Add new Region</h2>
                  <div className=" ">
                    <input
                      placeholder="Name"
                      className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-0 w-40 rounded-xl focus:outline-none focus:border-2"
                      type="text"
                      value={newRegion.name}
                      onChange={(e) =>
                        setNewRegion({ ...newRegion, name: e.target.value })
                      }
                    />
                    <input
                      placeholder="Delivery Date"
                      className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-7 ml-3 w-40 rounded-xl focus:outline-none focus:border-2"
                      type="text"
                      value={newRegion.deliveryDate}
                      onFocus={(e) => e.target.setAttribute("type", "date")}
                      onBlur={(e) => e.target.setAttribute("type", "text")}
                      onChange={(e) =>
                        setNewRegion({
                          ...newRegion,
                          deliveryDate: e.target.value,
                        })
                      }
                    />
                    <button
                      className="text-supplair-primary font-raleway font-bold hover:underline focus:outline-none mr-0"
                      onClick={handleAddRegion}
                    >
                      Add
                    </button>
                  </div>
                </div>
                {addedRegions.length > 0 && (
                  <div className="mb-6">
                    <h2 className=" font-medium mb-3">Region(s)</h2>
                    {addedRegions.map((region, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-0 w-40 rounded-xl focus:outline-none focus:border-2"
                          type="text"
                          value={region.name}
                          readOnly
                        />
                        <input
                          className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-7 ml-3 w-40 rounded-xl focus:outline-none focus:border-2"
                          type="text"
                          value={region.deliveryDate}
                          readOnly
                        />
                        <button
                          className="text-red-600 font-raleway font-bold hover:underline focus:outline-none mr-0"
                          onClick={() => handleRemoveRegion(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mb-6">
                  <h2 className=" font-medium mb-3">Add new Sector</h2>
                  <div className=" ">
                    <input
                      placeholder="Name"
                      className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-0 w-40 rounded-xl focus:outline-none focus:border-2"
                      type="text"
                      value={newSector.name}
                      onChange={(e) =>
                        setNewSector({ ...newSector, name: e.target.value })
                      }
                    />
                    <input
                      placeholder="Delivery Date"
                      className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-7 ml-3 w-40 rounded-xl focus:outline-none focus:border-2"
                      type="text"
                      value={newSector.deliveryDate}
                      onFocus={(e) => e.target.setAttribute("type", "date")}
                      onBlur={(e) => e.target.setAttribute("type", "text")}
                      onChange={(e) =>
                        setNewSector({
                          ...newSector,
                          deliveryDate: e.target.value,
                        })
                      }
                    />
                    <button
                      className="text-supplair-primary font-raleway font-bold hover:underline focus:outline-none mr-0"
                      onClick={handleAddSector}
                    >
                      Add
                    </button>
                  </div>
                </div>
                {addedSectors.length > 0 && (
                  <div className="mb-6">
                    <h2 className=" font-medium mb-3">Sector(s)</h2>
                    {addedSectors.map((sector, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-0 w-40 rounded-xl focus:outline-none focus:border-2"
                          type="text"
                          value={sector.name}
                          readOnly
                        />
                        <input
                          className="h-10 py-2 pl-4 border-2 border-supplair-primary mr-7 ml-3 w-40 rounded-xl focus:outline-none focus:border-2"
                          type="text"
                          value={sector.deliveryDate}
                          readOnly
                        />
                        <button
                          className="text-red-600 font-raleway font-bold hover:underline focus:outline-none mr-0"
                          onClick={() => handleRemoveSector(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="h-10 mt-5 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                  type="submit"
                >
                  {" "}
                  Get Started{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
