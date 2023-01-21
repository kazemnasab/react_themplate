import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "SaleService",
  },
  Get: ({
    id = null,
    storeId = null,
    stateId = null,
    docNumber = null,
    number = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += id ? `&id=${id}` : "";
      url += storeId ? `&storeId=${storeId}` : "";
      url += stateId ? `&stateId=${stateId}` : "";
      url += docNumber ? `&docNumber=${docNumber}` : "";
      url += number ? `&number=${number}` : "";
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
  GetInfo: (sku, info) => {
    return async () => {
      var url = `${Controller.Urls.Main}/info?d=2`;
      url += `&sku=${sku}`;
      url += `&info=${info}`;
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
