import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "antd/dist/antd.css";

import { Layout } from "antd";
import Dashboard from "../src/components/admin/Dashboard/Dashboard";
import User from "../src/containers/admin/User/User";
import Home from "../src/containers/admin/Home/Home";
import Site from "../src/containers/admin/Site/Site";
import Login from "../src/components/Authentication/Login";
import AdminHeader from "../src/components/admin/Header/Header";
import AdminFooter from "../src/components/admin/Footer/Footer";
import AdminContent from "../src/components/admin/Content/Content";

import * as actions from "./store/actions/index";
import FrontSite from "./containers/front-site";

function App() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  let routes = (
    <Switch>
      <Route path="/_admin_/login" component={Login} />
      <Route path="/home" exact component={FrontSite} />
      <Redirect to="/home" />
    </Switch>
  );

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, []);

  if (isAuthenticated) {
    routes = (
      <Layout>
        <Dashboard>
          <AdminHeader />
          <AdminContent>
            <Switch>
              <Route path="/_admin_/user" component={User} />
              <Route path="/_admin_/site" component={Site} />
              <Route path="/_admin_/home" exact component={Home} />
              <Redirect to="/_admin_/home" />
            </Switch>
          </AdminContent>
          <AdminFooter />
        </Dashboard>
        <Route path="/_admin_/login" component={Login} />
      </Layout>
    );
  }
  return (
    <>
      {routes}
      {/* {!isAuthenticated ? <Redirect to="/home" /> : null} */}
    </>
  );
}

export default withRouter(App);
