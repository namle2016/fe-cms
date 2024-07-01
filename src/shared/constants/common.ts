export const CODE_MENU = {
  EVENT: "EVENT",
  WOMEN: "WOMEN",
  MEN: "MEN",
  SHOES: "SHOES",
  WEDD: "WEDD",
  TREND: "TREND",
  JUSTIN: "JUSTIN"
};
export const COMMONS = {
  UUID: "uuid",
  CARTS_STORAGE: "carts_storage",
  LOCALE: "locale",
  USER_STORAGE: "user_storage",
  TOKEN: "token"
};

export const LANGUAGE = {
  VI: "vi",
  EN: "en",
};

export const NAVIGATION = {
  HOME: "/",
  ABOUT_US: "/about-us",
  CART: "/cart",
  CATALOGS: "/catalogs",
  CHECKOUT: "/checkout",
  ABOUTUS: "/about-us",
  LIST_CATALOG: "/list-catalogs",
  MAIN_CATALOG: "/main-catalogs",
};
const path = (root: string, sublink: string) => `${root}${sublink}`;
// client
const ROOTS_CLIENT = '/';

export const CLIENT_PATH = {
  root: ROOTS_CLIENT,
  error: {
    page403: '/403',
    page404: '/404',
    page500: '/500',
  },
};

// admin
const ROOTS_ADMIN = '/admin';

export const ADMIN_PATH = {
  root: ROOTS_ADMIN,
  auth: {
    login: path(ROOTS_ADMIN, '/dang-nhap'),
  },
  dashboard: {
    root: path(ROOTS_ADMIN, '/thong-ke'),
  },
  error: {
    page403: '/403',
    page404: '/404',
    page500: '/500',
  },
};