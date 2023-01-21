import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
  },
  {
    id: 'definition',
    icon: 'iconsminds-gear',
    label: 'menu.definition',
    to: `${adminRoot}/definition`,
    subs: [
      {
        id: 'def-product',
        label: 'menu.catalog',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.category',
            to: `${adminRoot}/definition/catalog/category`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.product',
            to: `${adminRoot}/definition/catalog/product`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.service',
            to: `${adminRoot}/definition/catalog/service`,
          },
        ],
      },
      {
        id: 'def-curefailure',
        label: 'menu.saleservice',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.cure',
            to: `${adminRoot}/definition/curefailure/failure`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.repairman',
            to: `${adminRoot}/definition/curefailure/repairman`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.saleservice.status',
            to: `${adminRoot}/definition/curefailure/failure`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.product.caliber',
            to: `${adminRoot}/definition/curefailure/caliber`,
          }
        ],
      },
    ]
  },
  {
    id: 'profiles',
    icon: 'iconsminds-project',
    label: 'menu.profiles',
    to: `${adminRoot}/profiles`,
    subs: [
      {
        id: 'def-curefailure',
        label: 'menu.financial',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.box',
            to: `${adminRoot}/definition/financial/box`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.bankaccount',
            to: `${adminRoot}/definition/financial/bankaccount`,
          }
        ],
      },
      {
        id: 'def-curefailure',
        label: 'menu.customer',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.agent',
            to: `${adminRoot}/definition/financial/agent`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.guest',
            to: `${adminRoot}/definition/financial/customer`,
          }
        ],
      },
      {
        id: 'def-curefailure',
        label: 'menu.sale',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.warehouse',
            to: `${adminRoot}/definition/financial/warehouse`,
          }
        ],
      },
    ]
  },
  {
    id: 'factor',
    icon: 'iconsminds-receipt-4',
    label: 'menu.saleservice',
    to: `${adminRoot}/factor`,
    subs: [
      {
        id: 'def-product',
        label: 'menu.servicereceipt',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.servicereceipt',
            to: `${adminRoot}/sheet/saleservice/new`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.list-servicereceipt',
            to: `${adminRoot}/sheet/saleservice/list`,
          }
        ],
      },
      
      {
        id: 'def-product',
        label: 'menu.factor',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.order',
            to: `${adminRoot}/sheet/factor/new`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.list-order',
            to: `${adminRoot}/sheet/factor/list/1/q=`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.list-factor',
            to: `${adminRoot}/sheet/factor/list/10/q=`,
          }
        ],
      },
      
      {
        id: 'def-product',
        label: 'menu.saleservice.ordersegmant',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.ordersegmant.new',
            to: `${adminRoot}/sheet/ordersegmant/new`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.ordersegmant.list',
            to: `${adminRoot}/sheet/ordersegmant/list/1/q=`,
          }
        ],
      },
    ]
  },
  {
    id: 'financial',
    icon: 'iconsminds-bank',
    label: 'menu.financial',
    to: `${adminRoot}/financial`,
    subs: [
      {
        id: 'def-product',
        label: 'menu.receipt',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.receipt',
            to: `${adminRoot}/sheet/receive/new`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.list0-receipt',
            to: `${adminRoot}/sheet/receive/list/1/q=`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.list-receipt',
            to: `${adminRoot}/sheet/receive/list/10/q=`,
          }
        ],
      },
      {
        id: 'def-product',
        label: 'menu.pay',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.pay',
            newWindow: true,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.list-pay',
            newWindow: true,
          }
        ],
      },
    ]
  },
  {
    id: 'pages',
    icon: 'iconsminds-digital-drawing',
    label: 'menu.pages',
    to: `${adminRoot}/pages`,
    subs: [
      {
        id: 'pages-authorization',
        label: 'menu.authorization',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-user-following',
            label: 'menu.login',
            to: '/user/login',
            newWindow: true,
          },
          {
            icon: 'simple-icon-user-follow',
            label: 'menu.register',
            to: '/user/register',
            newWindow: true,
          },
          {
            icon: 'simple-icon-user-following',
            label: 'menu.forgot-password',
            to: '/user/forgot-password',
            newWindow: true,
          },
          {
            icon: 'simple-icon-user-unfollow',
            label: 'menu.reset-password',
            to: '/user/reset-password',
            newWindow: true,
          },
        ],
      },
      {
        id: 'pages-product',
        label: 'menu.product',
        to: `${adminRoot}/pages/product`,
        subs: [
          {
            icon: 'simple-icon-credit-card',
            label: 'menu.data-list',
            to: `${adminRoot}/pages/product/data-list`,
          },
          {
            icon: 'simple-icon-list',
            label: 'menu.thumb-list',
            to: `${adminRoot}/pages/product/thumb-list`,
          },
          {
            icon: 'simple-icon-grid',
            label: 'menu.image-list',
            to: `${adminRoot}/pages/product/image-list`,
          },
          {
            icon: 'simple-icon-picture',
            label: 'menu.details',
            to: `${adminRoot}/pages/product/details`,
          },
          {
            icon: 'simple-icon-book-open',
            label: 'menu.details-alt',
            to: `${adminRoot}/pages/product/details-alt`,
          },
        ],
      },
      {
        id: 'pages-profile',
        label: 'menu.profile',
        to: `${adminRoot}/pages/profile`,
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'menu.social',
            to: `${adminRoot}/pages/profile/social`,
          },
          {
            icon: 'simple-icon-link',
            label: 'menu.portfolio',
            to: `${adminRoot}/pages/profile/portfolio`,
          },
        ],
      },
      {
        id: 'pages-blog',
        label: 'menu.blog',
        to: `${adminRoot}/pages/blog`,
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'menu.blog-list',
            to: `${adminRoot}/pages/blog/blog-list`,
          },
          {
            icon: 'simple-icon-link',
            label: 'menu.blog-detail',
            to: `${adminRoot}/pages/blog/blog-detail`,
          },
        ],
      },
      {
        id: 'pages-miscellaneous',
        label: 'menu.miscellaneous',
        to: `${adminRoot}/pages/miscellaneous`,
        subs: [
          {
            icon: 'simple-icon-question',
            label: 'menu.faq',
            to: `${adminRoot}/pages/miscellaneous/faq`,
          },
          {
            icon: 'simple-icon-graduation',
            label: 'menu.knowledge-base',
            to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
          },

          {
            icon: 'simple-icon-diamond',
            label: 'menu.prices',
            to: `${adminRoot}/pages/miscellaneous/prices`,
          },
          {
            icon: 'simple-icon-magnifier',
            label: 'menu.search',
            to: `${adminRoot}/pages/miscellaneous/search`,
          },
          {
            icon: 'simple-icon-envelope-open',
            label: 'menu.mailing',
            to: `${adminRoot}/pages/miscellaneous/mailing`,
          },
          {
            icon: 'simple-icon-bag',
            label: 'menu.invoice',
            to: `${adminRoot}/pages/miscellaneous/invoice`,
          },

          {
            icon: 'simple-icon-exclamation',
            label: 'menu.error',
            to: '/error',
            newWindow: true,
          },
        ],
      },
    ],
  },
  {
    id: 'ui',
    icon: 'iconsminds-pantone',
    label: 'menu.ui',
    to: `${adminRoot}/ui`,
    subs: [
      {
        id: 'ui-forms',
        label: 'menu.forms',
        to: `${adminRoot}/ui/forms`,
        subs: [
          {
            icon: 'simple-icon-notebook',
            label: 'menu.layouts',
            to: `${adminRoot}/ui/forms/layouts`,
          },
          {
            icon: 'simple-icon-puzzle',
            label: 'menu.components',
            to: `${adminRoot}/ui/forms/components`,
          },
          {
            icon: 'simple-icon-check',
            label: 'menu.validations',
            to: `${adminRoot}/ui/forms/validations`,
          },
          {
            icon: 'simple-icon-magic-wand',
            label: 'menu.wizard',
            to: `${adminRoot}/ui/forms/wizard`,
          },
        ],
      },
      {
        id: 'ui-components',
        label: 'menu.components',
        to: `${adminRoot}/ui/components`,
        subs: [
          {
            icon: 'simple-icon-bell',
            label: 'menu.alerts',
            to: `${adminRoot}/ui/components/alerts`,
          },
          {
            icon: 'simple-icon-badge',
            label: 'menu.badges',
            to: `${adminRoot}/ui/components/badges`,
          },
          {
            icon: 'simple-icon-control-play',
            label: 'menu.buttons',
            to: `${adminRoot}/ui/components/buttons`,
          },
          {
            icon: 'simple-icon-layers',
            label: 'menu.cards',
            to: `${adminRoot}/ui/components/cards`,
          },
          {
            icon: 'simple-icon-picture',
            label: 'menu.carousel',
            to: `${adminRoot}/ui/components/carousel`,
          },
          {
            icon: 'simple-icon-chart',
            label: 'menu.charts',
            to: `${adminRoot}/ui/components/charts`,
          },
          {
            icon: 'simple-icon-arrow-up',
            label: 'menu.collapse',
            to: `${adminRoot}/ui/components/collapse`,
          },
          {
            icon: 'simple-icon-arrow-down',
            label: 'menu.dropdowns',
            to: `${adminRoot}/ui/components/dropdowns`,
          },
          {
            icon: 'simple-icon-book-open',
            label: 'menu.editors',
            to: `${adminRoot}/ui/components/editors`,
          },

          {
            icon: 'simple-icon-star',
            label: 'menu.icons',
            to: `${adminRoot}/ui/components/icons`,
          },
          {
            icon: 'simple-icon-note',
            label: 'menu.input-groups',
            to: `${adminRoot}/ui/components/input-groups`,
          },
          {
            icon: 'simple-icon-screen-desktop',
            label: 'menu.jumbotron',
            to: `${adminRoot}/ui/components/jumbotron`,
          },
          {
            icon: 'simple-icon-map',
            label: 'menu.maps',
            to: `${adminRoot}/ui/components/maps`,
          },
          {
            icon: 'simple-icon-docs',
            label: 'menu.modal',
            to: `${adminRoot}/ui/components/modal`,
          },
          {
            icon: 'simple-icon-cursor',
            label: 'menu.navigation',
            to: `${adminRoot}/ui/components/navigation`,
          },
          {
            icon: 'simple-icon-pin',
            label: 'menu.popover-tooltip',
            to: `${adminRoot}/ui/components/popover-tooltip`,
          },
          {
            icon: 'simple-icon-shuffle',
            label: 'menu.sortable',
            to: `${adminRoot}/ui/components/sortable`,
          },
          {
            icon: 'simple-icon-grid',
            label: 'menu.tables',
            to: `${adminRoot}/ui/components/tables`,
          },
        ],
      },
    ],
  }
];
export default data;
