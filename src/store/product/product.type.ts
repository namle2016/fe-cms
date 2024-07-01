export type Product = {
    id: string
    no: string
    index: number
    code: string
    catalog_detail: string
    slug: string
    promotion: string
    ribbons: string
    question: string
    thumbnail: string
    images: string
    favorite: string
    size: string
    weight: number
    mix: string
    meta_keywords_en: string
    meta_keywords_vn: string
    title_meta_seo: string
    description_meta_seo: string
    name: {
        en_US: string,
        vn_VN: string
    },
    description: {
        en_US: string,
        vn_VN: string
    },
    amount: {
        en_US: number,
        vn_VN: number
    },
    isActive: boolean
    isshowhome: boolean
    createby: string
};

export type ProductState = {
    listProduct: {
        data: Product[],
        isloading: boolean
        error: string
    }
    detailProductAdmin: {
        data: Product,
        isloading: boolean
        error: string
    }
};