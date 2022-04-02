import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import Select from "react-select";
import { getCourse } from "api";
import { editPackage } from "api";
import { showPackageCourses } from "api";

// components

export default function EditPackage({
  color,
  catData,
  submitClose,
  handleClose,
}) {
  const course = JSON.parse(catData.course.replace(/'/g, '"'));
  const [name, setName] = useState(catData.name);
  const [about, setAbout] = useState(catData.about);
  const [image, setImage] = useState();
  const [courses, setCourses] = useState();
  const [courseList, setCourseList] = useState();
  const [price, setPrice] = useState(catData.price);
  const [options, setOptions] = useState([]);
  console.log(catData);

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleEditPackage = async (e) => {
    e.preventDefault();
    console.log(catData.id);
    if (!name || name === "") return toast.error("Please Enter  Name");
    if (!price || price === "") return toast.error("Please Enter Price");
    if (!courseList || courseList === "")
      return toast.error("Please Choose Courses");
    const data = new FormData();
    data.append("id", catData.id);
    data.append("name", name);
    data.append("about", about);
    data.append("price", price);
    data.append("image", image);
    data.append("course", [courseList]);
    // data.append("payment_link", paymentURL);

    editPackage(data)
      .then(function (response) {
        if (response) {
          console.log("Updated Package successfully");
          toast.success("Successfully Updated Package");
          submitClose(submitClose);
          console.log(response);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in update package", err);
        // toast.error("Unable to Update Category");
      });
  };

  const fetchPackageCourse = async (e) => {
    const data = new FormData();
    data.append("package_id", catData.id);

    showPackageCourses(data)
      .then(function (response) {
        if (response.data.Courses_data) {
          setOptions(response.data.Courses_data);
          const courseIds = response.data.Courses_data.map((item) => item.id);
          setCourseList(courseIds);
          console.log("package courses", response);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in update package", err);
        // toast.error("Unable to Update Category");
      });
  };

  const fetchAllCourse = async () => {
    try {
      const response = await getCourse();
      console.log("all curses", response.data?.data);
      setCourses(response.data?.data);

      // var result = [];
      // course.map((item) => {
      //   const matchedObject = response.data?.data.find(
      //     (option) => option.id == item,
      //   );
      //   result.push(matchedObject);

      //   setOptions(result);
      //   setCourseList(result);
      // });

      // console.log("its form data", result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(options);
  const onChangeInput = (value) => {
    console.log(value.map((item) => item.id));
    const item = value.map((item) => item.id);
    setCourseList(item);
    console.log(item);
    setOptions(value);
  };

  useEffect(() => {
    fetchPackageCourse();
    fetchAllCourse();
    console.log(course);
  }, []);

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
              Edit Organisation
            </h6>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Organisation Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  disabled
                  placeholder="Write Package Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  Organisation Price<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Package Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            {/* <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Payment Link
                </label>
                <input
                  type="text"
                  placeholder="Payment URL"
                  value={paymentURL}
                  onChange={(e) => setPaymentURL(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div> */}
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  About
                </label>
                <input
                  type="text"
                  placeholder="Write About Package"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <Select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  getOptionLabel={(option) => option.course_title}
                  getOptionValue={(option) => option.id}
                  placeholder={"Select Package Courses"}
                  isMulti
                  value={options}
                  options={courses}
                  onChange={(value) => onChangeInput(value)}
                />
              </div>
            </div>

            <div className=" w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Organisation Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full flex mt-5 lg:w-12/12 justify-between items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleEditPackage}
              >
                update
              </button>
              <button
                className="bg-red-500 block w-full  h-10 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

EditPackage.defaultProps = {
  color: "light",
};

EditPackage.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
