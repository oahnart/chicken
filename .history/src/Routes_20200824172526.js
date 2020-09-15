import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import Login from "./features/login/Login";
import Home from "./features/home/Home";
import Loading from "./components/loading/Loading";
import SessionTimeOut from "./components/sessionTimeOut/SessionTimeOut";

import { actionLogout } from "./features/system/actions";
import * as constants from "./utils/constants/constant";
import { store } from "./index";
import "./App.scss";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const isViewFullPage = (pathname) => {
  return (
    pathname === constants.routes.LOGIN ||
    pathname === constants.routes.FORGOT_PASSWORD
  );
};

const Logout = () => {
  store.dispatch(actionLogout());
  return <Redirect to="/login" />;
};
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Redirect exact from="/" to="/home" />
        <PrivateRoute exact path="/home" component={Home} />
        <PublicRoute exact path="/login" component={Login} />
      </Switch>
    );
  }
}

export default Routes;

const PublicRoute = ({ component: Component, passProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div className="app-container">
            <Layout
              style={{ minWidth: "min-content" }}
              className={`${
                isViewFullPage(props.location.pathname) ? "full-page" : ""
              }`}
            >
              <Layout.Content
                className="content-container"
                style={{ minWidth: "min-content" }}
              >
                <Component {...props} {...passProps} />
              </Layout.Content>
            </Layout>
          </div>
        );
      }}
    />
  );
};
const PrivateRoute = ({ component: Component, passProps, ...rest }) => {
  const loggedIn = isAuthenticate();
  return (
    <Route
      {...rest}
      render={(props) => {
        const { role } = store.getState().systemReducer;
        if (!loggedIn) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        if (isRestrict(props.location.pathname, role))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        return (
          // <React.Fragment>
          //   <Loading />
          //   {/* <SessionTimeOut /> */}
          //   <Component {...props} {...passProps} />
          // </React.Fragment>
          <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<LaptopOutlined />}
                    title="subnav 2"
                  >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    icon={<NotificationOutlined />}
                    title="subnav 3"
                  >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  Content
                </Content>
              </Layout>
            </Layout>
          </Layout>
        );
      }}
    />
  );
};

export function isAuthenticate() {
  return !!Cookie.get(constants.TOKEN);
}

export function isRestrict(pathname, role) {
  return ROLE_TABLE[pathname] && ROLE_TABLE[pathname].indexOf(role) === -1;
}

const ROLE_TABLE = {
  "/home": [constants.Roles.ROLE_USER],
  "/admin": [constants.Roles.ROLE_ADMIN, constants.Roles.ROLE_MANAGER],
};
