import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Drawer, Avatar } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FormOutlined,
} from "@ant-design/icons";

import { actionGetProfile } from "../../features/system/actions";
import { routes } from "../../utils/constants/constant";
import * as image from "../../assets/index";
import DrawerContent from "./DrawerContent";
import "./Header.scss";

const Header = (props) => {
  console.log(props.profile);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    _fetProfile();
  }, []);

  const _fetProfile = () => {
    props.actionGetProfile();
  };
  return (
    <div className="wp-header">
      <Row className="header">
        <Col md={3}>
          <Link to={routes.HOME} className="wp-logo">
            <img className="logo" alt="Lỗi ảnh" src={image.chicken} />
          </Link>
        </Col>
        <Col md={2}>
          <Link
            to={routes.HOME}
            className={`btn4 ${
              props.location.pathname === routes.HOME && "route-selected"
            }`}
          >
            <CalendarOutlined />
            Mua Sắm
          </Link>
        </Col>
        <Col md={2}>
          <Link
            to={routes.ARENA}
            className={`btn4 ${
              props.location.pathname === routes.ARENA && "route-selected"
            }`}
          >
            <TrophyOutlined />
            Thi Đấu
          </Link>
        </Col>
        <Col md={2}>
          <Link to="home">
            <FormOutlined />
            Đăng Tin
          </Link>
        </Col>
        <Col md={2}>
          <Link to="home">
            <FormOutlined />
            Giao hữu
          </Link>
        </Col>
        <Col md={2}>
          <Link to="home">
            <BellOutlined />
            Thông Báo
          </Link>
        </Col>
        <Col md={2} offset={7}>
          <Link to="home">
            <ShoppingCartOutlined />
            Giỏ Hàng
          </Link>
        </Col>
        <Col md={2} onClick={showDrawer}>
          <Link to="home">
            <UserOutlined />
            Cá nhân
            {/* {props.profile.name} */}
          </Link>
        </Col>
        <Drawer
          title={`${(
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          )}
            ${props.profile.name}
          `}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <DrawerContent />
        </Drawer>
      </Row>
    </div>
  );
};

export default connect(
  (state) => ({
    profile: state.systemReducer.profile,
  }),
  {
    actionGetProfile,
  }
)(withRouter(Header));
