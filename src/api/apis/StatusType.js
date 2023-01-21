import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "StatusType",
  },
  Get: ({
    target = null,
    name = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&state=${target}` : "";
      url += name ? `&name=${name}` : "";
      return await Api.api_get(url);
    };
  },
  Post: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
};

export default Controller;