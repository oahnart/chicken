import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { postRegister, verifyEmail } from "./actions";
import Cookie from "js-cookie";

import * as constants from "../../utils/constants/constant";
import "./Login.scss";

const ModalRegister = ({
  props,
  visibleModal,
  setVisibleModal,
  handleCancel,
}) => {
  const [modalVerifyEmail, setModalVerifyEmail] = useState(false);
  const [emailTemp, setEmailTemp] = useState("");
  // const { t } = props;
  const handleFisnish = async (datas) => {
    try {
      const data = {
        email: datas.email,
        name: datas.name,
        username: datas.username,
        password: datas.password,
      };
      const response = await postRegister(data);
      if (response.status === 200) {
        setVisibleModal(false);
        setModalVerifyEmail(true);
        setEmailTemp(datas.email);
      }
      console.log("handleFisnish -> response", response);
    } catch (error) {}
  };
  const handleCancelEmail = () => {
    setModalVerifyEmail(false);
  };

  const handleFisnishEmail = async (datas) => {
    try {
      const dataDTO = {
        email: emailTemp,
        verificationCode: datas.verificationcode,
      };
      const headers = {
        ["X-Device-Identifier"]: "56643566756",
      };
      const { data } = await verifyEmail(headers, dataDTO);
      // set token into cookie
      Cookie.set(constants.JWT, data.data.accessToken);
      window.location.href = "#/";
    } catch (error) {}
  };
  const [errMsg, setErrMsg] = useState("");
  return (
    <div>
      <Modal
        title="Đăng Kí"
        visible={visibleModal}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="common-modal"
        style={{ top: 20 }}
      >
        <Form labelAlign="left" onFinish={handleFisnish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Verify Email"
        visible={modalVerifyEmail}
        // onOk={handleOk}
        onCancel={handleCancelEmail}
        footer={null}
        className="common-modal"
        style={{ top: 20 }}
      >
        <Form onFinish={handleFisnishEmail} labelAlign="left">
          <Form.Item
            label="VerificationCode"
            name="verificationcode"
            rules={[
              {
                required: true,
                message: "Please input your verificationcode!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalRegister;
