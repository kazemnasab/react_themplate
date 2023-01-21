
const urls = [
  {
    id: "action",
    title: ["app.saleservice.action"],
    subs: [
      {
        type: "simple",
        title: ["app.saleservice.sheet"],
        icon: "bx bx-edit",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        modal: {
          page: "SaleServiceEdit",
          title: ["app.saleservice.sheet"],
          size: "lg",
        },
      },
      {
        type: "simple",
        title: ["app.saleservice.sheet.kardex"],
        icon: "bx bx-edit",
        url: "/app/saleservice/kardex",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.saleservice.sheet.actions"],
        icon: "bx bx-edit",
        url: "/app/saleservice/action/new",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.saleservice.ordersegmant"],
        icon: "bx bx-edit",
        url: "/app/saleservice/ordersegmant/new",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
    ],
  },
  {
    id: "action",
    title: ["app.saleservice.list"],
    subs: [
      {
        type: "simple",
        title: ["app.saleservice.sheet"],
        icon: "bx bx-edit",
        url: "/app/saleservice/sheet",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.sale.sheet.orderfactor"],
        icon: "bx bx-edit",
        url: "/app/saleservice/factor/orderfactor",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.sale.sheet.factor"],
        icon: "bx bx-edit",
        url: "/app/saleservice/factor/factor",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.saleservice.ordersegmant"],
        icon: "bx bx-edit",
        url: "/app/saleservice/ordersegmant",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
    ],
  },
];
export default urls;
