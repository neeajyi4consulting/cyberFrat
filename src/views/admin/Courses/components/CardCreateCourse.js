import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCategory } from "api";
import { toast } from "react-toastify";
import { addCourse } from "api";

// components

export default function CardCreateCourse({ color, handleClose, submitClose }) {
  const [categoryData, setCategoryData] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState();

  const [author, setAuthor] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
  );

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (!courseTitle || courseTitle === "")
      return toast.error("Please Enter Course Name");
    if (!about || about === "") return toast.error("Please Enter About");
    if (!image || image === "") return toast.error("Please select image");
    if (!previewURL || previewURL === "" || !regex.test(previewURL))
      return toast.error("Please Enter Valid URL");

    const data = new FormData();
    data.append("course_title", courseTitle);
    data.append("about", about);
    data.append("author", author);
    data.append("course_file", image);
    data.append("link", previewURL);
    data.append("selling_price", sellingPrice);

    addCourse(data)
      .then(function (response) {
        if (response.data?.status === true) {
          console.log("added course successfully");
          toast.success("Successfully Added Course");
          window.location.reload();
          submitClose(submitClose);
          console.log(response);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in add course", err.response);
        toast.error("Unable to Add course");
      });
  };

  const fetchCategory = async () => {
    const { data } = await getCategory();
    setCategoryData(data?.data);
    console.log(categoryData);
  };
  useEffect(() => {
    fetchCategory();
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
              Create Course
            </h6>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Course Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
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
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Write author name ..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
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
                  Selling Price
                </label>
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full  px-4">
              <div className="relative h-auto w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  About Course<span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Discription"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Course Preview / Trailer URL (Youtube, Vimeo)
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="URL"
                  value={previewURL}
                  onChange={(e) => setPreviewURL(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className=" w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Course Image<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  onChange={handleImage}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAddCourse}
              >
                Create Course
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

CardCreateCourse.defaultProps = {
  color: "light",
};

CardCreateCourse.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
