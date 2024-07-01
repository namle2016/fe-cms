import { axiosHandler } from "@/api/httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import MenuAPI from "./menu.api";

const getListMenuAction = createAsyncThunk("menu/getListMenuAction", async () => {
    const { isSuccess, data } = await axiosHandler(() =>
        MenuAPI.getListMenu()
    );
    if (isSuccess) {
        return data;
    }
    return null;
});
export { getListMenuAction }