import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { showClientPackage } from "api";
import { showPackageCourses } from "api";
import { getCourseDetails } from "api";

// components

export default function UserListCard({
  color,
  onClickEdit,
  onClickRemove,
  data,
  onClickAssign,
  onClickAdd,
  onClickBulk,
}) {
  const [toggleCoursesList, setToggleCoursesList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newArr, setNewArr] = useState([]);
  const handleDeleteTry = (item) => {
    if (window.confirm("Are You Sure")) {
      onClickRemove(item);
    } else {
      toast.warn("You cancelled Delete Action");
    }
  };

  let courseArr = [];
  const setCourseList = async (userId) => {
    setLoading(true);
    setToggleCoursesList(true);
    const response = await showClientPackage(userId);
    const plusData = new FormData();
    plusData.append("package_id", 24);
    const plusResponse = await showPackageCourses(plusData);
    const goldData = new FormData();
    goldData.append("package_id", 25);
    const goldResponse = await showPackageCourses(goldData);
    let yFilter = response?.data?.data.map((itemY) => {
      return itemY?.course_name?.id;
    });
    let plusFilter = plusResponse?.data?.Courses_data.map((itemY) => {
      return itemY?.id;
    });
    let goldFilter = goldResponse?.data?.Courses_data.map((itemY) => {
      return itemY?.id;
    });
    let filteredX = yFilter.filter((item) => !plusFilter.includes(item));
    const res = filteredX.filter((item) => !goldFilter.includes(item));

    console.log("tested filter", filteredX, res);
    for (let index = 0; index < res.length; index++) {
      const courseResponse = await getCourseDetails(res[index]);
      courseArr[index] = courseResponse?.data?.data;
      setNewArr(courseArr);
      console.log("this is from loop function ", courseArr);
    }
    console.log("this is from outside loop", newArr);
    setLoading(false);
  };

  useEffect(() => {
    console.log("course arr", newArr);
  }, [newArr]);

  if (loading) {
    return (
      <div className="flex  relative  z-10  items-center justify-center h-screen rounded-lg text-white font-bold text-4xl bg-black  w-screen">
        Please Wait ....
      </div>
    );
  }

  if (toggleCoursesList) {
    return (
      <>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded pr-4 " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="flex items-center justify-between relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  User / Student List
                </h3>
                <button
                  id="ok-btn"
                  onClick={() => setToggleCoursesList(false)}
                  className="bg-green-500"
                >
                  X
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Course Title
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Author
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    About
                  </th>
                </tr>
              </thead>
              <tbody>
                {newArr.map((item) => (
                  <tr key={item?.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {item?.course_title}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item?.author}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item?.about}
                    </td>

                    <td>
                      {/* {!item?.package_alloted.length <= 0
                      ? item?.package_alloted[0]?.package_name?.course
                      : "No Individual Course Alloted"} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* {newArr.map((val) => {
          console.log("mapped courses", val);
          return <div key={val?.id}>title:{val?.course_title}</div>;
        })} */}

        {/* {courseComponent} */}
        {/* <button
            id="ok-btn"
            onClick={() => setToggleCoursesList(false)}
            className="bg-green-500"
          >
            OK
          </button> */}
      </>
    );
  }
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="flex items-center justify-between relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                User / Student List
              </h3>
              <div>
                {/* <button
                  onClick={onClickBulk}
                  className="mr-4 p-2 bg-red-400 text-white rounded"
                >
                  Add Bulk User
                </button> */}
                <button
                  onClick={onClickAdd}
                  className="mr-4 p-2 bg-red-400 text-white rounded"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Phone No.
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Alloted Package
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>
                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Alloted Courses
                </th> */}

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item?.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {item.first_name + " " + item.last_name}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.phone}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {!item.package_alloted.length <= 0
                      ? item.package_alloted[0].package_name?.name
                      : "No Membership Alloted"}
                  </td>
                  <td className="border-t-0  px-6 self-end border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <div className="flex self-end justify-end  ">
                      <button
                        onClick={() => onClickAssign(item)}
                        className="mr-4 p-2 bg-red-400 text-white rounded"
                      >
                        Allot Membership
                      </button>
                      <svg
                        onClick={() => onClickEdit(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:animate-bounce cursor-pointer "
                        style={{
                          height: 22,
                          width: 22,
                          color: "blue",
                          marginRight: 20,
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      <svg
                        onClick={() => handleDeleteTry(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: 22, width: 22, color: "red" }}
                        className="hover:animate-bounce cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </td>
                  {/* <td>
                    <button
                      className="bg-red-400 text-white rounded text-xs p-2"
                      onClick={() => setCourseList(item?.id)}
                    >
                      View StandAlone Course
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

UserListCard.defaultProps = {
  color: "light",
};

UserListCard.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
