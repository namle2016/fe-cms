import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "@/api/httpClient";
import SlideAPI from "./slide.api";


const getListSlideAction = createAsyncThunk("slide/getListSlideAction", async () => {
    const { isSuccess, data } = await axiosHandler(() =>
        SlideAPI.getListSlide()
    );
    if (isSuccess) {
        return data;
    }
    return null;
});
const saveSlideAction = createAsyncThunk("slide/saveSlideAction", async (body: {}, thunkAPI) => {
    const { isSuccess, data } = await axiosHandler(() =>
        SlideAPI.saveSlide(body)
    );
    if (isSuccess) {
        return data;
    }
    return thunkAPI.rejectWithValue({ data: null });
});

export { getListSlideAction, saveSlideAction }