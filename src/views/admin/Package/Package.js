import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

import AddPackage from "./components/AddPackage";
import EditPackage from "./components/EditPackage";
import PackageList from "./components/PackageList";
import { showPackage } from "api";
import { deletePackage } from "api";
import { useLocation } from "react-router";

export default function Package() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [catData, setCatData] = useState();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const location = useLocation();

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const response = await showPackage();
      setData(response.data?.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePackage = async (item) => {
    const data = new FormData();
    data.append("id", item.id);
    try {
      await deletePackage(data);
      fetchPackage();

      toast.success("Successfully Deleted " + item.name);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = (item) => {
    setCatData(item);
    setEdit(true);
  };

  useEffect(() => {
    fetchPackage();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

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
        <div className="w-full h-auto xl:w-12/12 mb-12 xl:mb-0 px-4">
          {/* {loading ? (
            <div className="flex items-center justify-center  w-screen">
              <ReactLoading
                type={"bars"}
                color={"blue"}
                height={200}
                width={200}
              />
            </div>
          ) : ( */}

          {add ? (
            <AddPackage
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
              fetchCategory={fetchPackage}
            />
          ) : edit ? (
            <EditPackage
              submitClose={() => setEdit(false)}
              handleClose={() => setEdit(false)}
              // fetchCategory={fetchCategory}
              catData={catData}
            />
          ) : (
            <PackageList
              data={data}
              onClickRemove={handleDeletePackage}
              onClickEdit={onClickEdit}
              onClickAdd={() => setAdd(true)}
            />
          )}

          {/* )} */}
        </div>
        {/* <div className="w-full xl:w-4/12 px-4  ">
          {!edit ? (
            <CardAddCategory fetchCategory={fetchCategory()} />
          ) : (
            <EditCategory fetchCategory={fetchCategory()} catData={catData} />
          )}
        </div> */}
      </div>
    </>
  );
}
