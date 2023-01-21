import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "User",
  },
  Login: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
  Register: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
};

export default Controller;