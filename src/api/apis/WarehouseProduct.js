import * as Api from "api/core";

const Controller = {
  Urls: {
    Main: "WarehouseProduct",
  },
  Get: ({
    warehouse = null,
    product = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += warehouse ? `&warehouse=${warehouse}` : "";
      url += product ? `&product=${product}` : "";
      return await Api.api_get(url);
    };
  },
  GetInStock: ({
    warehouse = null,
    product = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}/stock?d=2`;
      url += warehouse ? `&warehouse=${warehouse}` : "";
      url += product ? `&product=${product}` : "";
      return await Api.api_get(url);
    };
  }
};

export default Controller;