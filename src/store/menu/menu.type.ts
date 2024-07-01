import { Catalog } from "../catalog/catalog.type";

export type Menu = {
    id: string;
    code: string;
    slug: string;
    name: {
        vn_VN: string;
        en_US: string;
    };
    url: string,
    thumbnail: string
    ismainmenu: boolean
    isActive: boolean
    index: number
    catalogs: Catalog[]
};

export type MenuState = {
    isShowMenu: boolean
    listMenu: {
        data: Menu[],
        isloading: boolean
        error: string
    }
    detailMenuAdmin: Menu
    selectMenuPostGroup: Menu
    selectMenuPost: Menu
    selectMenuCatalog: Menu
    selectMenuCatalogDetail: Menu
};