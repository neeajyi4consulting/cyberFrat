import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { addUser } from "api";

export default function CreateBulkUser({ color, handleClose, submitClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!firstName || firstName === "") return toast.error("Please Enter Name");
    if (!email || email === "") return toast.error("Please Enter Email");
    if (!password || password === "" || password.length < 8)
      return toast.error("Please Enter Strong Password");

    const data = new FormData();
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("email", email);
    data.append("phone", phone);
    data.append("password", password);
    data.append("user_role", 3);

    addUser(data)
      .then(function (response) {
        if (response.data?.status === true) {
          console.log("added user successfully");
          toast.success("Successfully Added User");
          submitClose(submitClose);
          console.log(response);
          window.location.reload();
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in add user", err.response);
        toast.error("Unable to Add User");
      });
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="flex-auto px-4 lg:px-5 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Create Bulk Users / Student
            </h6>
            {/* <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone No.
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="Phone No."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  type="password"
                  placeholder="Password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={handleAddUser}
              >
                Create User
              </button>
              <button
                className="bg-red-500 block w-full  h-10 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div> */}
            Coming soon
            <button
              className="bg-red-500 block w-20  h-10 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleClose}
            >
              Go Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

CreateBulkUser.defaultProps = {
  color: "light",
};

CreateBulkUser.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
