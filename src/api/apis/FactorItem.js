import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "FactorItem",
  },
  Get: ({
    sheet = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += sheet ? `&sheet=${sheet}` : "";
      return await Api.api_get(url);
    };
  },
  GetById: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/${id}`);
    };
  },
  Post: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
  Delete: (stateId, body) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += stateId ? `&stateId=${stateId}` : "";
      return await Api.api_delete(url, body);
    };
  },
};

export default Controller;