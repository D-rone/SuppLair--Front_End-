import React, { useEffect, useReducer, useState } from "react";
import _editIcon from "../../assets/images/editIcon.svg";
import _doneIcon from "../../assets/images/doneIcon.svg";
import _changeProfilePic from "../../assets/images/plusSign.svg";
import { toast } from "react-toastify";
import { useUserContext } from "../../pages/HomePage";
import defaultProfilePic from "../../assets/images/noProfilePic.png";
import axios from "axios";
import Cookies from "universal-cookie";

function CompanyProfile({
  setUpdatedData,
  UpdatedData,
  hundleSave,
  setUserData,
  userData,
  setReload,
}) {
  const [edit, setEdit] = useState("");
  const [companyName, setCompanyName] = useState(userData.companyName);
  const [address, setAddress] = useState(userData.address);
  const [phone, setPhone] = useState(userData.number || "");
  const [hasDeliveryDates, setHasDeliveryDates] = useState(
    userData.hasDeliveryDate
  );
  const [email, setEmail] = useState(userData.companyEmail || "");
  const [description, setDescription] = useState(userData.description || "");
  const [selectedWilayas, setSelectedWilayas] = useState(
    userData.wilayas || []
  );

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

  useEffect(() => {
    setUpdatedData((old) => ({ ...old, wilayas: selectedWilayas }));
  }, [selectedWilayas, hasDeliveryDates]);

  useEffect(() => {
    if (!hasDeliveryDates) {
      setUpdatedData((old) => ({ ...old, wilayas: [] }));
      setSelectedWilayas([]);
    }
  }, [hasDeliveryDates]);

  const handleWilayaChange = (wilaya) => {
    setSelectedWilayas((selectedWilayas) => {
      if (selectedWilayas.includes(wilaya)) {
        return selectedWilayas.filter((item) => item !== wilaya);
      } else {
        return [...selectedWilayas, wilaya];
      }
    });
  };

  const handleUpdate = (field) => {
    setEdit("");
    toast.dismiss();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field == "companyName") {
      if (companyName != userData.companyName) {
        if (companyName.trim().length < 3) {
          toast.error("Company Name length should be >= 3", {
            autoClose: false,
          });
          setCompanyName(userData.companyName);
        } else {
          toast.success(`Filed ${field} can be updated`);
          setUpdatedData((old) => ({ ...old, companyName: companyName }));
        }
      }
    } else if (field == "description") {
      if (description != userData.description) {
        if (description == "") {
          toast.error("Description is empty", { autoClose: false });
          setDescription(userData.description);
        } else {
          toast.success(`Filed ${field} can be updated`);
          setUpdatedData((old) => ({ ...old, description: description }));
        }
      }
    } else if (field == "email") {
      if (email != userData.companyEmail) {
        if (!emailRegex.test(email.trim())) {
          toast.error("Please enter a valid email address", {
            autoClose: false,
          });
          setEmail(userData.companyEmail);
          return;
        } else {
          toast.success(`Filed ${field} can be updated`);
          setUpdatedData((old) => ({ ...old, companyEmail: email }));
        }
      }
    } else if (field == "address") {
      if (address != userData.address) {
        if (address.trim().length < 3) {
          toast.error("Invalid Address", { autoClose: false });
          setAddress(userData.address);
        } else {
          toast.success(`Filed ${field} can be updated`);
          setUpdatedData((old) => ({ ...old, adress: address }));
        }
      }
    } else if (field == "phone") {
      if (phone != userData.phone) {
        const phoneRegex = /^^[0-9+\-_]{10,}$/;
        if (!phoneRegex.test(phone.trim())) {
          toast.error("Invalid phone !", { autoClose: false });
          setPhone(userData.number);
        } else {
          toast.success(`Filed ${field} can be updated`);
          setUpdatedData((old) => ({ ...old, number: phone }));
        }
      }
    } else if (field == "hasDeliveryDates") {
      setHasDeliveryDates(!hasDeliveryDates);
      toast.success(`Filed ${field} can be updated`);
      setUpdatedData((old) => ({
        ...old,
        hasDeliveryDates: !hasDeliveryDates,
      }));
    }
  };

  const [hovered, setHovered] = useState(false);
  const [companyPic, setCompanyPic] = useState(defaultProfilePic);

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

  return (
    <div className="h-full max-w-[1000px] w-full ">
      <form className="flex justify-center">
        <div className="flex flex-col items-center w-1/3 pt-3">
          <div
            className="relative inline-block rounded-full size-44"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={companyPic}
              alt="Profile Picture"
              className="rounded-full size-44"
            />
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
          </div>
        </div>

        <div className="w-2/3">
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3" style={{ fontWeight: "700" }}>
              Company Name
            </span>

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
                <span className="font-medium ">{companyName}</span>
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
            <span className="w-1/3" style={{ fontWeight: "700" }}>
              Address
            </span>

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
                <span className="font-medium ">{address}</span>
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
            <span className="w-1/3" style={{ fontWeight: "700" }}>
              Phone
            </span>
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
                <span className="font-medium "> {phone}</span>
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
          {/* New Radio Buttons for Delivery Dates */}
          <div
            className="flex px-8 py-4 border-b-2 border-gray-300"
            style={{ alignItems: "flex-start", marginBottom: "1rem" }}
          >
            <span className="w-4/6" style={{ fontWeight: "700" }}>
              Does the company have delivery dates?
            </span>
            <div className="w-2/6">
              <input
                id="deliveryDatesYes"
                name="deliveryDates"
                type="radio"
                className="h-4 w-4 text-supplair-primary border-gray-300 focus:ring-supplair-primary mr-1"
                checked={hasDeliveryDates === true}
                onChange={() => {
                  handleUpdate("hasDeliveryDates");
                }}
              />
              <label htmlFor="deliveryDatesYes" className="text-gray-500 mr-4">
                Yes
              </label>
              <input
                id="deliveryDatesNo"
                name="deliveryDates"
                type="radio"
                className="h-4 w-4 text-supplair-primary border-gray-300 focus:ring-supplair-primary mr-1"
                checked={hasDeliveryDates === false}
                onChange={() => {
                  handleUpdate("hasDeliveryDates");
                }}
              />
              <label htmlFor="deliveryDatesNo" className="text-gray-500">
                No
              </label>
            </div>
          </div>
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3" style={{ fontWeight: "700" }}>
              Company email
            </span>

            <div className="w-2/3">
              {edit == "email" ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleUpdate("email");
                    }
                  }}
                />
              ) : (
                <span className="font-medium ">{email}</span>
              )}
            </div>
            <span>
              {edit == "email" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("email");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("email");
                  }}
                />
              )}
            </span>
          </div>
          {/* */}
          <div className="flex px-8 py-4 border-b-2 border-gray-300">
            <span className="w-1/3" style={{ fontWeight: "700" }}>
              Description
            </span>

            <div className="w-2/3">
              {edit === "description" ? (
                <textarea
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-2 border-gray-400 rounded"
                  style={{ width: "90%" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdate("description");
                    }
                  }}
                  value={description}
                />
              ) : (
                <textarea
                  disabled
                  className="font-medium"
                  style={{ width: "90%", height: "100px" }}
                  value={description}
                />
              )}
            </div>

            <span>
              {edit == "description" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("description");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("description");
                  }}
                />
              )}
            </span>
          </div>
          {/* New Checkboxes for Wilayas */}
          <div className="flex px-8 py-4 border-b-2 border-gray-300 ">
            <label style={{ fontWeight: "700" }} className="w-5/12">
              Select Wilayas for Delivery:
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-scroll w-7/12">
              <div
                className="overflow-y-scroll border border-gray-300 rounded-xl p-2"
                style={{ height: "100px", width: "95%" }}
              >
                {wilayas.map((wilaya) => (
                  <div key={wilaya.value} className="flex items-center w-12/12">
                    <input
                      id={`wilaya-${wilaya.value}`}
                      type="checkbox"
                      disabled={edit !== "wilayas" || !hasDeliveryDates}
                      className="h-4 w-4 text-supplair-primary border-gray-300 focus:ring-supplair-primary mr-2"
                      checked={selectedWilayas.includes(wilaya.label)}
                      onChange={() => {
                        console.log(wilaya.label);
                        handleWilayaChange(wilaya.label);
                      }}
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
            <span>
              {edit == "wilayas" ? (
                <img
                  src={_doneIcon}
                  className="h-6 hover:cursor-pointer"
                  onClick={() => {
                    handleUpdate("wilayas");
                  }}
                />
              ) : (
                <img
                  src={_editIcon}
                  className=" hover:cursor-pointer"
                  onClick={() => {
                    setEdit("wilayas");
                  }}
                />
              )}
            </span>
          </div>
          <div className="flex px-8 py-4 justify-end">
            <button
              className="cancelBtn mr-2"
              type="button"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button
              onClick={hundleSave}
              className="hover:cursor-pointer approveBtn"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <div style={{ paddingBottom: "100px" }}></div>
    </div>
  );
}

export default CompanyProfile;
