export type Slide = {
    id: string,
    type: string,
    index: number,
    url: string,
    slug: string,
    code: string,
    isvideo: boolean,
    title: {
        vn_VN: string;
        en_US: string;
    };
    isActive: boolean;
    thumbnail: string;
    description: {
        "en_US": string,
        "vn_VN": string
    },
    buttontext: {
        en_US: string,
        vn_VN: string
    },
    groupslide: string
};

export type SlideState = {
    listSlide: {
        data: Slide[],
        isloading: boolean
        error: string
    }
    detailSlideAdmin: Slide
};