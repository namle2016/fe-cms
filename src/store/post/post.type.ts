export type PostGroup = {
    id: string,
    index: number,
    url: string,
    slug: string,
    code: string,
    menu_code: string,
    name: {
        "en_US": string,
        "vn_VN": string
    },
    title: {
        vn_VN: string;
        en_US: string;
    };
    isActive: boolean;
    thumbnail: string;
    banner: string
    post: Post[]
    isvideobanner: boolean
};

export type Post = {
    id: string
    code: string
    group_post_code: string
    slug: string
    created_at: string,
    url: string,
    index: number,
    name: {
        en_US: string,
        vn_VN: string
    },
    buttontext: {
        en_US: string,
        vn_VN: string
    },
    thumbnail: string,
    video: string,
    title: {
        en_US: string,
        vn_VN: string
    },
    description: {
        en_US: string,
        vn_VN: string
    },
    content: {
        en_US: string,
        vn_VN: string
    },
    isActive: boolean
    isshowhome: boolean,
    keysearch: string,
    createname: string
};

export type PostState = {
    listPostGroup: {
        data: PostGroup[],
        isloading: boolean
        error: string
    }
    detailPostGroupAdmin: {
        data: PostGroup,
        isloading: boolean
        error: string
    }
    listPost: {
        data: Post[],
        isloading: boolean
        error: string
    }
    detailPostAdmin: {
        data: Post,
        isloading: boolean
        error: string
    }
};