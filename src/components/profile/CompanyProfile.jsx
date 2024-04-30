import React, { useReducer, useState } from "react";
import _editIcon from "../../assets/images/editIcon.svg";
import _doneIcon from "../../assets/images/doneIcon.svg";
import _changeProfilePic from "../../assets/images/plusSign.svg";
import { toast } from "react-toastify";
import { useUserContext } from "../../pages/HomePage";

function CompanyProfile() {
  const { userData, setUserData } = useUserContext();

  const [companyName, setCompanyName] = useState(userData.companyName);
  const [website, setWebsite] = useState(userData.website);
  const [address, setAddress] = useState(userData.address);
  const [phone, setPhone] = useState(userData.phone);

  const [edit, setEdit] = useState("");

  const handleUpdate = (field) => {
    setEdit("");
    if (field == "companyName") {
      if (companyName != userData.companyName) {
        if (companyName.trim().length < 3) {
          toast.error("Company Name length should be >= 3");
          setCompanyName(userData.companyName);
        } else {
          setUserData((old) => ({ ...old, companyName: companyName }));
          toast.success(`Filed ${field} can be updated`);
        }
      }
    } else if (field == "website") {
      if (website != userData.website) {
        const websiteRegex = /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        if (!websiteRegex.test(website.trim())) {
          toast.error("Invalid Website !");
          setWebsite(userData.website);
        } else {
          setUserData((old) => ({ ...old, website: website }));
          toast.success(`Filed ${field} can be updated`);
        }
      }
    } else if (field == "address") {
      if (address != userData.address) {
        if (address.trim().length < 3) {
          toast.error("Invalid Address");
          setAddress(userData.address);
        } else {
          setUserData((old) => ({ ...old, address: address }));
          toast.success(`Filed ${field} can be updated`);
        }
      }
    } else if (field == "phone") {
      if (phone != userData.phone) {
        const phoneRegex = /^^[0-9+\-_]{10,}$/;
        if (!phoneRegex.test(phone.trim())) {
          toast.error("Invalid phone !");
          setPhone(userData.phone);
        } else {
          setUserData((old) => ({ ...old, phone: phone }));
          toast.success(`Filed ${field} can be updated`);
        }
      }
    }
  };

  const [hovered, setHovered] = useState(false);
  const [companyPic, setCompanyPic] = useState(userData.companyPic);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const loadNewCompanyPic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateNewPic = () => {
    setUserData((old) => ({ ...old, companyPic: companyPic }));
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [newWilaya, setNewWilaya] = useReducer(updateReducer, { name: "", deliveryDate: "" });
  const [addedWilayas, setAddedWilayas] = useReducer(updateReducer, userData.wilayas);
  const [newRegion, setNewRegion] = useReducer(updateReducer, { name: "", deliveryDate: "" });
  const [addedRegions, setAddedRegions] = useReducer(updateReducer, userData.regions);
  const [newSector, setNewSector] = useReducer(updateReducer, { name: "", deliveryDate: "" });
  const [addedSectors, setAddedSectors] = useReducer(updateReducer, userData.sectors);

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

  const saveUpdates = () => {
    if (updated) {
      setUserData((old) => ({
        ...old,
        wilayas: addedWilayas,
        regions: addedRegions,
        sectors: addedSectors,
      }));
      toast.success("Updates Saved Succesfully");
      setUpdated(false);
    }
  };

  return (
    <div className="h-full max-w-[1000px] w-full mt-14">
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-1/3 pt-3">
          <div
            className="relative inline-block rounded-full size-44"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={companyPic} alt="Profile Picture" className="rounded-full size-44" />
            {hovered && (
              <div className="absolute top-0 left-0 bg-black rounded-full size-full bg-opacity-30">
                <input type="file" className="hidden" />
                <input
                  type="file"
                  className="rounded-full opacity-0 size-44 hover:cursor-pointer"
                  onChange={loadNewCompanyPic}
                />
                <img
                  src={_changeProfilePic}
                  className="absolute size-14 left-[35%] pointer-events-none top-[36%]"
                />
              </div>
            )}
            <div>
              {companyPic != userData.companyPic ? (
                <div className="relative flex gap-4 mt-5 right-2">
                  <button
                    className="cancelBtn min-w-[90px]"
                    onClick={() => {
                      setCompanyPic(userData.companyPic);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="approveBtn min-w-[90px]" onClick={updateNewPic}>
                    Update
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Company Name</span>

            <div className="w-2/3">
              {edit == "companyName" ? (
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("companyName");
                    }
                  }}
                />
              ) : (
                <span className="font-semibold ">{companyName}</span>
              )}
            </div>
            <span>
              {edit == "companyName" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("companyName");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("companyName");
                  }}
                />
              )}
            </span>
          </div>

          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Website</span>
            <div className="w-2/3">
              {edit == "website" ? (
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("website");
                    }
                  }}
                />
              ) : (
                <span className="font-semibold "> {website}</span>
              )}
            </div>
            <span>
              {edit == "website" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("website");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("website");
                  }}
                />
              )}
            </span>
          </div>

          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Address</span>

            <div className="w-2/3">
              {edit == "address" ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("address");
                    }
                  }}
                />
              ) : (
                <span className="font-semibold ">{address}</span>
              )}
            </div>
            <span>
              {edit == "address" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("address");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("address");
                  }}
                />
              )}
            </span>
          </div>

          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3">Phone</span>
            <div className="w-2/3">
              {edit == "phone" ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("phone");
                    }
                  }}
                />
              ) : (
                <span className="font-semibold "> {phone}</span>
              )}
            </div>
            <span>
              {edit == "phone" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("phone");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("phone");
                  }}
                />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <div className="flex flex-col w-full overflow-y-auto">
          <div className="flex flex-col items-center justify-center flex-grow pb-[12vh]">
            <div className="flex flex-col items-center mt-0">
              <div className="mb-6">
                <h2 className="mb-3 font-medium ">Add new Wilaya</h2>
                <div className="">
                  <input
                    placeholder="Name"
                    className="w-40 h-10 py-2 pl-4 mr-0 border-[1px] border-supplair-primary rounded-xl focus:outline-none focus:border-2"
                    type="text"
                    value={newWilaya.name}
                    onChange={(e) => setNewWilaya({ ...newWilaya, name: e.target.value })}
                  />
                  <input
                    placeholder="Delivery Date"
                    className="w-40 pr-2 h-10 py-2 pl-4 ml-3 border-[1px] border-supplair-primary mr-7 rounded-xl focus:outline-none focus:border-2"
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
                    className="mr-0 font-bold text-supplair-primary font-raleway hover:underline focus:outline-none"
                    onClick={handleAddWilaya}
                  >
                    Add
                  </button>
                </div>
              </div>
              {addedWilayas.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 font-medium">Wilaya(s)</h2>
                  {addedWilayas.map((wilaya, index) => (
                    <div
                      key={index}
                      className="flex items-center mb-2 border-b-2 border-supplair-primary"
                    >
                      <input
                        className="w-40 h-10 py-2 pl-4 mr-0"
                        type="text"
                        value={wilaya.name}
                        readOnly
                      />
                      <input
                        className="w-40 h-10 py-2 pl-4 pr-2 ml-3 mr-7"
                        type="text"
                        value={wilaya.deliveryDate}
                        readOnly
                      />
                      <button
                        className="mr-0 font-bold text-red-600 font-raleway hover:underline focus:outline-none"
                        onClick={() => handleRemoveWilaya(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-6">
                <h2 className="mb-3 font-medium ">Add new Region</h2>
                <div className="">
                  <input
                    placeholder="Name"
                    className="w-40 h-10 py-2 pl-4 mr-0 border-[1px] border-supplair-primary rounded-xl focus:outline-none focus:border-2"
                    type="text"
                    value={newRegion.name}
                    onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
                  />
                  <input
                    placeholder="Delivery Date"
                    className="w-40 pr-2 h-10 py-2 pl-4 ml-3 border-[1px] border-supplair-primary mr-7 rounded-xl focus:outline-none focus:border-2"
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
                    className="mr-0 font-bold text-supplair-primary font-raleway hover:underline focus:outline-none"
                    onClick={handleAddRegion}
                  >
                    Add
                  </button>
                </div>
              </div>
              {addedRegions.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 font-medium ">Region(s)</h2>
                  {addedRegions.map((region, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        className="w-40 h-10 py-2 pl-4 mr-0 border-[1px] border-supplair-primary rounded-xl focus:outline-none focus:border-2"
                        type="text"
                        value={region.name}
                        readOnly
                      />
                      <input
                        className="w-40 pr-2 h-10 py-2 pl-4 ml-3 border-[1px] border-supplair-primary mr-7 rounded-xl focus:outline-none focus:border-2"
                        type="text"
                        value={region.deliveryDate}
                        readOnly
                      />
                      <button
                        className="mr-0 font-bold text-red-600 font-raleway hover:underline focus:outline-none"
                        onClick={() => handleRemoveRegion(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-6">
                <h2 className="mb-3 font-medium ">Add new Sector</h2>
                <div className="">
                  <input
                    placeholder="Name"
                    className="w-40 h-10 py-2 pl-4 mr-0 border-[1px] border-supplair-primary rounded-xl focus:outline-none focus:border-2"
                    type="text"
                    value={newSector.name}
                    onChange={(e) => setNewSector({ ...newSector, name: e.target.value })}
                  />
                  <input
                    placeholder="Delivery Date"
                    className="w-40 pr-2 h-10 py-2 pl-4 ml-3 border-[1px] border-supplair-primary mr-7 rounded-xl focus:outline-none focus:border-2"
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
                    className="mr-0 font-bold text-supplair-primary font-raleway hover:underline focus:outline-none"
                    onClick={handleAddSector}
                  >
                    Add
                  </button>
                </div>
              </div>
              {addedSectors.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 font-medium ">Sector(s)</h2>
                  {addedSectors.map((sector, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        className="w-40 h-10 py-2 pl-4 mr-0 border-[1px] border-supplair-primary rounded-xl focus:outline-none focus:border-2"
                        type="text"
                        value={sector.name}
                        readOnly
                      />
                      <input
                        className="w-40 pr-2 h-10 py-2 pl-4 ml-3 border-[1px] border-supplair-primary mr-7 rounded-xl focus:outline-none focus:border-2"
                        type="text"
                        value={sector.deliveryDate}
                        readOnly
                      />
                      <button
                        className="mr-0 font-bold text-red-600 font-raleway hover:underline focus:outline-none"
                        onClick={() => handleRemoveSector(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={saveUpdates}
                className="w-full h-12 text-white bg-supplair-primary rounded-xl max-w-[400px] disabled:bg-gray-500"
                disabled={!updated}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
