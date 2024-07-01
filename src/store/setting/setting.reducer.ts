import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingState } from "./setting.type";

const initialState: SettingState = {
    isCollapsedSidebar: false,
    isShowHeader: true
};
const settingSlice = createSlice({
    name: 'setting',
    initialState: initialState,
    reducers: {
        setShowHeader: (state: SettingState, action: PayloadAction<boolean>) => ({
            ...state,
            isShowHeader: action.payload,
        }),
        setIsCollapsedSidebar: (state: SettingState, action: PayloadAction<boolean>) => ({
            ...state,
            isCollapsedSidebar: action.payload,
        }),
    },
    extraReducers: (builder) => {

    },
});
export const { setShowHeader, setIsCollapsedSidebar } = settingSlice.actions;
export default settingSlice.reducer;