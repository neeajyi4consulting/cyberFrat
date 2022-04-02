import { deleteUser } from "api";
import { getUsersList } from "api";
import React, { useState, useEffect } from "react";
import CardCreateUser from "./components/CardCreateUser";
import UserListCard from "./components/UserListCard";
import { toast } from "react-toastify";
import EditUser from "./components/EditUser";
import { showPackage } from "api";
import { allotPackage } from "api";
import { useLocation } from "react-router";
import CreateBulkUser from "./components/CreateBulkUser";

export default function CreateUser() {
  const [data, setData] = useState([]);
  const [createBulk, setCreateBulk] = useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [userData, setUserData] = useState([]);
  const [assign, setAssign] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [courseID, setCourseID] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleAssignCourse = (item) => {
    setAssign(true);
    setUser(item);
  };

  const handleAllotPackage = async () => {
    if (!courseID) {
      return toast.error("Please Select Package");
    }
    const data = new FormData();
    data.append("package_id", courseID);
    data.append("user_id", user.id);

    allotPackage(data)
      .then((response) => {
        console.log(response);
        toast.success(response.data?.message);
        setAssign(false);
        setUser(null);
        setCourseID(null);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUsersList();

      setData(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (item) => {
    try {
      await deleteUser(item.id);
      toast.success("Successfully Deleted User ");
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPackage = async () => {
    const response = await showPackage();

    setPackageData(response.data?.data);
  };

  // const onClickEdit = (item) => {
  //   // alert("Edited item" + item.id);
  //   setEdit(false);
  //   setUserData(item);
  //   setEdit(true);
  //   console.log("course data item", item);
  // };
  const onClickEdit = (item) => {
    setUserData(item);
    setEdit(true);
    // setAdd(true);
  };

  useEffect(() => {
    fetchUser();
    fetchPackage();
    setEdit(false);
    setAdd(false);
    setAssign(false);
  }, [location.key]);

  useEffect(() => {
    fetchUser();
    setEdit(false);
  }, [user, courseID]);

  if (loading) {
    return (
      <div className="flex  relative  z-10  items-center justify-center h-screen rounded-lg text-white font-bold text-4xl bg-black  w-screen">
        Please Wait ....
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          {add ? (
            <CardCreateUser
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : assign ? (
            <div
              className={
                "relative items-center flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white "
              }
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className={"font-semibold text-lg bg-white "}>
                      Allot Package to {""}
                      <span style={{ color: "green", fontWeight: "900" }}>
                        {user.first_name} {user.last_name}( {user.email})
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="w-full justify-center items-center mb-3  px-4">
                <select
                  onChange={(e) => setCourseID(e.target.value)}
                  value={courseID}
                  className="border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option>Select Package</option>

                  {packageData.map((item) => (
                    <>
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAllotPackage}
                className="mr-4 p-2 mt-4 mb-4   bg-red-400 text-white rounded"
              >
                Allot Package
              </button>
            </div>
          ) : edit ? (
            <EditUser
              submitClose={() => setEdit(false)}
              handleClose={() => setEdit(false)}
              userData={userData}
            />
          ) : createBulk ? (
            <CreateBulkUser
              handleClose={() => setCreateBulk(false)}
              submitClose={() => setCreateBulk(false)}
            />
          ) : (
            <UserListCard
              data={data}
              onClickRemove={removeUser}
              onClickEdit={onClickEdit}
              onClickAssign={handleAssignCourse}
              onClickAdd={() => setAdd(true)}
              onClickBulk={() => setCreateBulk(true)}
            />
          )}
        </div>
        {/* <div className="w-full xl:w-12/12 px-4  ">
          {!edit ? <CardCreateUser /> : <EditUser userData={userData} />}
        </div> */}
      </div>
    </>
  );
}
