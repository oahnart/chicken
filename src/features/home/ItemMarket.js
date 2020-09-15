import React from "react";
import { BASE_URL } from "../../utils/constants/constant";
import { Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const ItemMarket = (datas) => {
  const imgChicken = datas.data.animal.images[0];
  return (
    <Col span={6} md={6} xs={8} key={datas.data.animal.id}>
      <div className="img-body">
        <img
          className="img-big"
          alt="oke"
          src={`${BASE_URL}api/v1/file/image/${imgChicken.referenceName}`}
        />
      </div>
      <div className="title">{datas.data.animal.name}</div>
      <div className="price-regular">
        {datas.data.animal.originalPrice.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </div>
      <div>
        <EnvironmentOutlined /> {datas.data.province.name}
      </div>
      <div>
        Nặng: {datas.data.animal.weight} kg, cao: {datas.data.animal.height} cm
      </div>
    </Col>
  );
};

export default ItemMarket;
