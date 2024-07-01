import { axiosHandler } from "@/api/httpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import FooterAPI from "./footer.api";

const getlistFooterAction = createAsyncThunk("footer/getlistFooterAction", async () => {
    const { isSuccess, data } = await axiosHandler(() =>
        FooterAPI.getFooters()
    );
    if (isSuccess) {
        return data;
    }
    return null;
});
export {getlistFooterAction}