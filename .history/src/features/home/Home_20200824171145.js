import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actionGetMarkets } from "./actions";

const params = {
  page: 0,
  size: 10,
  isMyself: false,
};
const Home = () => {
  useEffect(() => {
    _getData(params);
  }, []);

  const _getData = (params) => {};

  return <div>Home Page</div>;
};

export default connect((state) => ({}), {})(Home);
