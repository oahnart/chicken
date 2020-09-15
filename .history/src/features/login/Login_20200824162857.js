import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import cookie from "js-cookie";
import { Button, Form, Input, Spin, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postLogin } from "./actions";
import injectIntl from "../../utils/helpers/intl";
import { actionChangeLang } from "../system/actions";
import ModalRegister from "./ModalRegister";
import { routes, TOKEN, REFRESH_TOKEN } from "../../utils/constants/constant";
import * as image from "../../assets";
import "./Login.scss";

let intervalTimer = null;

const Login = (props) => {
  const { t } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  const _handleVisibleModal = () => {
    setVisibleModal(true);
  };

  const _handleCancel = () => {
    setVisibleModal(false);
  };

  const handleFinish = async (datas) => {
    try {
      const headers = {
        ["X-Device-Identifier"]: "5662149225562",
      };
      const { data } = await postLogin(headers, datas);
      if (data.code === 200001) {
        // no verify email
        console.log("not verify", data);
      } else {
        cookie.set(TOKEN, data.data.accessToken);
        cookie.set(REFRESH_TOKEN, data.data.refreshToken);
        window.location.href = "#/";
      }
    } catch (error) {}
  };
  return (
    <Row>
      <Col span={12} md={12} sm={12} xs={12}>
        <div className="chicken-img">
          <img src={image.chicken} alt="" className="logo-chicken" />
        </div>
      </Col>
      <Col span={12} md={12} sm={12} xs={12}>
        <div className="login-container">
          <div className="header-left">
            <span>
              <span
                className={`${props.locale === "en" ? "active" : "normal"}`}
                onClick={() => {
                  props.actionChangeLang("en");
                }}
              >
                EN
              </span>
              &nbsp;|&nbsp;
              <span
                className={`${props.locale === "vi" ? "active" : "normal"}`}
                onClick={() => {
                  props.actionChangeLang("vi");
                }}
              >
                VI
              </span>
            </span>
          </div>
          <div className="block-logo">
            <img src={image.logo_black} alt="" className="logo-vmsart" />
          </div>
          <div className="err-msg">{errMsg}</div>
          <Form
            colon={false}
            hideRequiredMark
            onFinish={handleFinish}
            className="login-form"
          >
            <Form.Item
              label={t("IDS_DM_USERNAME")}
              name="username"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="IDS_DM_USERNAME_REQUIRED" />,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("IDS_DM_USERNAME")}
                onChange={() => setErrMsg("")}
              />
            </Form.Item>
            <Form.Item
              label={t("IDS_DM_PASSWORD")}
              name="password"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="IDS_DM_PASSWORD_REQUIRED" />,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("IDS_DM_PASSWORD")}
                onChange={() => setErrMsg("")}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <>
              <div className="btn-action">
                <Button type="primary" htmlType="submit" className="login-btn">
                  <FormattedMessage id="IDS_DM_LOGIN" />
                </Button>
              </div>
              <div
                className="fogot-password"
                onClick={() => {
                  props.history.push(routes.FORGOT_PASSWORD);
                }}
              >
                <span>
                  <FormattedMessage id="IDS_DM_FORGOT_PASSWORD" />
                </span>
              </div>
              <div className="btn-action">
                <Button
                  type="primary"
                  className="register-btn"
                  onClick={_handleVisibleModal}
                >
                  <FormattedMessage id="IDS_DM_REGISTER" />
                </Button>
              </div>
              <ModalRegister
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                handleCancel={_handleCancel}
              />
            </>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default connect(
  (state) => ({
    locale: state.systemReducer.locale,
  }),
  { actionChangeLang }
)(withRouter(injectIntl(Login)));
