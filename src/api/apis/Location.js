import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "Location",
  },
  Get: ({
    level = null,
    parrent = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += level ? `&level=${level}` : "";
      url += parrent ? `&parrent=${parrent}` : "";
      return await Api.api_get(url);
    };
  }
};

export default Controller;