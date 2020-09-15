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
import {
  routes,
  TOKEN,
  REFRESH_TOKEN,
  EXPIRED_REFRESH_TOKEN,
} from "../../utils/constants/constant";
import * as image from "../../assets";
import "./Login.scss";

let intervalTimer = null;

const Login = (props) => {
  const { t } = props;
  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  // const { getFieldDecorator, validateFields } = form;
  const [errMsg, setErrMsg] = useState("");
  const [blockLogin, setBlockLogin] = useState(false);
  const [minutes, setMinutes] = useState("05");
  const [seconds, setSeconds] = useState("00");
  const [processing, setProcessing] = useState(false);

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

  const startTimer = (duration) => {
    clearInterval(intervalTimer);
    let timeLeft = duration;

    intervalTimer = setInterval(() => {
      let minute = parseInt(timeLeft / 60, 10);
      let second = parseInt(timeLeft % 60, 10);
      setMinutes(minute < 10 ? "0" + minute : minute);
      setSeconds(second < 10 ? "0" + second : second);
      if (!blockLogin) {
        setBlockLogin(true);
        setProcessing(false);
      }
      if (--timeLeft < 0) {
        clearInterval(intervalTimer);
        setBlockLogin(false);
      }
    }, 1000);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (blockLogin) {
  //     return;
  //   }
  //   form.validateFields(async (err, values) => {
  //     if (!err) {
  //       try {
  //         setProcessing(true);
  //         const headers = {
  //           ["X-Device-Identifier"]: "56643566756",
  //         };
  //         const { data } = await postLogin(headers, values);
  //         cookie.set(TOKEN, data.data.accessToken);
  //         cookie.set(REFRESH_TOKEN, data.data.refreshToken);
  //         window.location.href = "#/";
  //         // props.actionGetProfile(t);
  //         setProcessing(false);
  //       } catch (error) {
  //         console.log(error);
  //         const { data } = error;
  //         const { error_code, metadata } = data || {};
  //         if (
  //           error_code === 300061 ||
  //           (error_code === 300040 && (metadata || {}).numberOfLoginFail >= 5)
  //         ) {
  //           startTimer(metadata.blockedTimeLeft || 300);
  //         } else {
  //           setBlockLogin(false);
  //           setErrMsg(t("IDS_DM_INCORRECT_USERNAME_OR_PASSWORD"));
  //           setProcessing(false);
  //         }
  //       }
  //     }
  //   });
  // };

  const handleFinish = async (datas) => {
    try {
      const dataDTO = {
        username: datas.username,
        password: datas.password,
      };
      const headers = {
        ["X-Device-Identifier"]: "5662149225562",
      };
      const { data } = await postLogin(headers, dataDTO);
      if (data.code === 200001) {
        // no verify email
      } else {
        cookie.set(TOKEN, data.data.accessToken);
        cookie.set(REFRESH_TOKEN, data.data.refreshToken);
        window.location.href = "#/";
      }
    } catch (error) {
      // if (datas.code === 403002) {
      //   showErrorToast("Tài khoản đăng nhập không tồn tại !");
      // } else if (data.code === 403007) {
      //   showErrorToast("Mật khẩu không chính xác !");
      // } else if (datas.code === 403008) {
      //   showErrorToast("Tài khoản đăng nhập hoặc mật khẩu không chính xác !");
      // }
    }
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
          <Spin spinning={processing}>
            {/* <Form.Item
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
            <Input.Password
              placeholder={t("IDS_DM_PASSWORD")}
              onChange={() => setErrMsg("")}
            />
          </Form.Item> */}
            <Form
              colon={false}
              hideRequiredMark
              // onSubmit={handleSubmit}
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
              {!blockLogin && (
                <>
                  <div className="btn-action">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-btn"
                    >
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
              )}
            </Form>
          </Spin>
          {blockLogin && (
            <div className="block-info">
              <div>
                <FormattedMessage id="IDS_DM_LOGGED_MORE_THAN_5_TIMES" />
              </div>
              <div>
                <span>
                  <FormattedMessage id="IDS_DM_YOU_CAN_LOG_AGAIN" />
                </span>
                <span className="time">
                  <span className="minute">{minutes}</span>:
                  <span className="second">{seconds}</span>
                </span>
              </div>
            </div>
          )}
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
