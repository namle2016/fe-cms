export type Footer = {
    id: string
    no: number
    type: string
    name: {
        vn_VN: string
        en_US: string
    }
    footerDetail: FooterDetail[]
    isActive: boolean
    url: string
};

export type FooterDetail = {
    id: string
    code: string
    name: {
        vn_VN: string
        en_US: string
    }
    isActive: boolean
    url: string
};
export type FooterState = {
    listFooter: {
        data: Footer[],
        isloading: boolean
        error: string
    }
};