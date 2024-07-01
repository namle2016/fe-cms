import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LocaleState } from './locale.type';

const initialState: LocaleState = {
    language: 'vi'
};
const localeSlice = createSlice({
    name: 'locale',
    initialState: initialState,
    reducers: {
        setLanguae: (state: LocaleState, action: PayloadAction<string>) => ({
            ...state,
            language: action.payload,
        }),
    },
    extraReducers: (builder) => {

    },
});
export const { setLanguae } = localeSlice.actions;
export default localeSlice.reducer;
