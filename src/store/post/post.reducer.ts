import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostGroup, Post, PostState } from './post.type';
import { getListPostAction, getListPostGroupAction, getPostAction, getPostGroupAction } from './post.action';

const initialState: PostState = {
    listPostGroup: {
        data: [] as PostGroup[],
        isloading: false,
        error: '',
    },
    detailPostGroupAdmin: {
        data: {} as PostGroup,
        isloading: false,
        error: '',
    },
    listPost: {
        data: [] as Post[],
        isloading: false,
        error: '',
    },
    detailPostAdmin: {
        data: {} as Post,
        isloading: false,
        error: '',
    },
};
const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        // setDetailPostGroupAdmin: (state: PostState, action: PayloadAction<PostGroup>) => ({
        //     ...state,
        //     detailPostGroupAdmin: action.payload
        // }),
        // setDetailPostAdmin: (state: PostState, action: PayloadAction<Post>) => ({
        //     ...state,
        //     detailPostAdmin: action.payload
        // }),
    },
    extraReducers: (builder) => {
        builder.addCase(getListPostGroupAction.pending, (state: PostState) => ({
            ...state,
            listPostGroup: {
                ...state.listPostGroup,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListPostGroupAction.fulfilled,
            (state: PostState, action: PayloadAction<any>) => ({
                ...state,
                listPostGroup: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListPostGroupAction.rejected, (state: PostState) => ({
            ...state,
            listPostGroup: {
                data: [] as PostGroup[],
                isloading: false,
                error: '',
            },
        }));

        builder.addCase(getPostGroupAction.pending, (state: PostState) => ({
            ...state,
            detailPostGroupAdmin: {
                ...state.detailPostGroupAdmin,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getPostGroupAction.fulfilled,
            (state: PostState, action: PayloadAction<any>) => ({
                ...state,
                detailPostGroupAdmin: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));
        builder.addCase(getPostGroupAction.rejected, (state: PostState) => ({
            ...state,
            detailPostGroupAdmin: {
                data: {} as PostGroup,
                isloading: false,
                error: '',
            },
        }));


        builder.addCase(getListPostAction.pending, (state: PostState) => ({
            ...state,
            listPost: {
                ...state.listPost,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListPostAction.fulfilled,
            (state: PostState, action: PayloadAction<any>) => ({
                ...state,
                listPost: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListPostAction.rejected, (state: PostState) => ({
            ...state,
            listPost: {
                data: [] as Post[],
                isloading: false,
                error: '',
            },
        }));


        builder.addCase(getPostAction.pending, (state: PostState) => ({
            ...state,
            detailPostAdmin: {
                ...state.detailPostAdmin,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getPostAction.fulfilled,
            (state: PostState, action: PayloadAction<any>) => ({
                ...state,
                detailPostAdmin: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));
        builder.addCase(getPostAction.rejected, (state: PostState) => ({
            ...state,
            detailPostAdmin: {
                data: {} as Post,
                isloading: false,
                error: '',
            },
        }));
    },
});
export const { } = postSlice.actions;
export default postSlice.reducer;
