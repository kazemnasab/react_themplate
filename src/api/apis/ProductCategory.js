import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "ProductCategory",
  },
  Get: ({
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
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
  Delete: ( body) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      return await Api.api_delete(url, body);
    };
  },
};

export default Controller;