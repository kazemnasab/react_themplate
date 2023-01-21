const urls = [
  {
    id: "action",
    title: ["app.financial.receive"],
    subs: [
      {
        type: "simple",
        title: ["app.financial.receive", "app.financial.box"],
        icon: "bx bx-edit",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        modal: {
          page: "ReceiveEdit",
          title: ["app.financial.receive", "app.financial.box"],
          size: "md",
          targets: ["Box"],
          typeId: 7,
        },
      },
      /*{
        type: "simple",
        title: ["app.financial.receive", "app.financial.cheque"],
        icon: "bx bx-edit",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        modal: {
          page: "ReceiveEdit",
          title: ["app.financial.receive", "app.financial.cheque"],
          size: "md",
          targets: ["BankAccount"],
          typeId: 5,
        },
      },*/
      {
        type: "simple",
        title: ["app.financial.receive", "app.financial.pos"],
        icon: "bx bx-edit",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        modal: {
          page: "ReceiveEdit",
          title: ["app.financial.receive", "app.financial.pos"],
          size: "md",
          targets: ["BankAccount"],
          typeId: 6,
        },
      },
      {
        type: "simple",
        title: ["app.financial.receive", "app.financial.havale"],
        icon: "bx bx-edit",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        modal: {
          page: "ReceiveEdit",
          title: ["app.financial.receive", "app.financial.havale"],
          size: "md",
          targets: ["BankAccount"],
          typeId: 8,
        }
      },
      {
        type: "simple",
        title: ["app.financial.list", "app.financial.receive"],
        icon: "bx bx-edit",
        url: "/app/financial/receive/list",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
    ],
  },
  {
    id: "action",
    title: ["app.financial.pay"],
    subs: [
      {
        type: "simple",
        title: ["app.financial.pay", "app.financial.box"],
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
        title: ["app.financial.pay", "app.financial.cheque"],
        icon: "bx bx-edit",
        url: "/app/saleservice/kardex",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.financial.pay", "app.financial.pos"],
        icon: "bx bx-edit",
        url: "/app/saleservice/action/new",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.financial.pay", "app.financial.havale"],
        icon: "bx bx-edit",
        url: "/app/saleservice/ordersegmant/new",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.financial.list", "app.financial.pay"],
        icon: "bx bx-edit",
        url: "/app/financial/pay/list",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
    ],
  },
];
export default urls;
