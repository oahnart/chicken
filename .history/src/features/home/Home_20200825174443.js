import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actionGetMarkets } from "./actions";

const params = {
  page: 0,
  size: 10,
  isMyself: false,
};
const Home = (props) => {
  useEffect(() => {
    _getData(params);
  }, []);

  const _getData = (params) => {
    props.actionGetMarkets(params);
  };
  console.log("market", props.market);
  return <div>{props.market.map((data) => data.phoneNumber)}</div>;
};

export default connect(
  (state) => ({
    market: state.homeReducer.market,
    isFetching: state.homeReducer.isFetching,
  }),
  { actionGetMarkets }
)(Home);
