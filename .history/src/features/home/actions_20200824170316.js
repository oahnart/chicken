import api from "../../utils/helpers/api";

// api
const getMarkets = (params) => {
  return api({
    method: "get",
    url: "/api/v1/market",
    params,
  });
};
