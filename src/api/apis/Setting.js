import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "Setting",
  },
  Get: ({
    target = null,
    typeId = null,
    parrentId = null,
    storeId = null,
    stateId = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&state=${target}` : "";
      url += typeId ? `&typeId=${typeId}` : "";
      url += parrentId ? `&parrentId=${parrentId}` : "";
      url += storeId ? `&storeId=${storeId}` : "";
      url += stateId ? `&stateId=${stateId}` : "";
      //console.log(url);
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