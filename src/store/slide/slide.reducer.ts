import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Slide, SlideState } from './slide.type';
import { getListSlideAction } from './slide.action';

const initialState: SlideState = {
    listSlide: {
        data: [] as Slide[],
        isloading: false,
        error: '',
    },
    detailSlideAdmin: {} as Slide

};
const slideSlice = createSlice({
    name: 'slide',
    initialState: initialState,
    reducers: {
        setDetailSlideAdmin: (state: SlideState, action: PayloadAction<Slide>) => ({
            ...state,
            detailSlideAdmin: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(getListSlideAction.pending, (state: SlideState) => ({
            ...state,
            listSlide: {
                ...state.listSlide,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListSlideAction.fulfilled,
            (state: SlideState, action: PayloadAction<any>) => ({
                ...state,
                listSlide: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListSlideAction.rejected, (state: SlideState) => ({
            ...state,
            listSlide: {
                data: [] as Slide[],
                isloading: false,
                error: '',
            },
        }));


    },
});
export const { setDetailSlideAdmin } = slideSlice.actions;
export default slideSlice.reducer;
