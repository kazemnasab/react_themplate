import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "SheetStatus",
  },
  Get: ({
    target = null,
    sheet = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&state=${target}` : "";
      url += sheet ? `&sheet=${sheet}` : "";
      return await Api.api_get(url);
    };
  },
  GetAll: () => {
    return async () => {
      return await Api.api_get(Controller.Urls.Main);
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
};

export default Controller;