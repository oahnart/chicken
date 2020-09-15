import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { verifyEmail } from "./actions";
import Cookie from "js-cookie";

import * as constants from "../../utils/constants/constant";
import "./Login.scss";

const ModalVerifyEmail = ({
  props,
  visibleModal,
  setVisibleModal,
  handleCancel,
  emailTemp,
}) => {
  const [modalVerifyEmail, setModalVerifyEmail] = useState(false);

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
      Cookie.set(constants.TOKEN, data.data.accessToken);
      Cookie.set(constants.REFRESH_TOKEN, data.data.refreshToken);
      window.location.href = "#/";
    } catch (error) {}
  };
  return (
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
  );
};

export default ModalVerifyEmail;
