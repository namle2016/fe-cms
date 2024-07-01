export type Catalog = {
    id: string
    index: number
    code: string
    slug: string
    name: {
        vn_VN: string
        en_US: string
    }
    url: string
    thumbnail: string
    isActive: boolean
    catalogsdetail: CatalogDetail[]
};
export type CatalogDetail = {
    id: string
    code: string
    slug: string
    name: {
        vn_VN: string
        en_US: string
    }
    url: string
    isActive: boolean
    index: number
};

export type CatalogState = {
    listCatalog: {
        data: Catalog[],
        isloading: boolean
        error: string
    }
    listCatalogDetail: {
        data: CatalogDetail[],
        isloading: boolean
        error: string
    }
    listCatalogSelect: Catalog[],
    selectCatalog: Catalog
    selectCatalogDetail: CatalogDetail
    catalogDetail: Catalog
};