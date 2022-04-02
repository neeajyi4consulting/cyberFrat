import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views

import Dashboard from "../views/admin/Dashboard/Dashboard.js";

import CreateCategory from "../views/admin/Category/CreateCategory";
import CreateCourse from "../views/admin/Courses/CreateCourse";
import CreateChapter from "../views/admin/Chapters/CreateChapter";
import UploadCourse from "../views/admin/UploadCourse";
import CreateUser from "../views/admin/Users/CreateUser";

import SendEmail from "../views/admin/Email/SendEmail";
import Settings from "../views/admin/Profile/Settings";
import Package from "../views/admin/Package/Package";
import Quiz from "../views/admin/Quiz/Quiz";
import Banner from "../views/admin/Banner/Banner";
import Event from "../views/admin/Event/Event";
import Query from "../views/admin/Queries/Query";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -mt-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />

            <Route path="/admin/profile" exact component={Settings} />
            <Route
              path="/admin/createCategory"
              exact
              component={CreateCategory}
            />
            <Route path="/admin/course" exact component={CreateCourse} />
            <Route path="/admin/chapter" exact component={CreateChapter} />
            <Route path="/admin/quiz" exact component={Quiz} />
            <Route path="/admin/banner" exact component={Banner} />
            {/* <Route path="/admin/services" exact component={Services} /> */}
            <Route path="/admin/event" exact component={Event} />
            <Route path="/admin/organisation" exact component={Package} />
            <Route path="/admin/uploadCourse" exact component={UploadCourse} />
            <Route path="/admin/user" exact component={CreateUser} />

            <Route path="/admin/sendEmail" exact component={SendEmail} />
            <Route path="/admin/query" exact component={Query} />

            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>

          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
