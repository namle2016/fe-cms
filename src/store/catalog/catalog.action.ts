import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "@/api/httpClient";
import CatalogAPI from "./catalog.api";


const getListCatalogAction = createAsyncThunk("catalog/getListCatalogAction", async (id: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        CatalogAPI.getListCatalog(id)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const saveCatalogAction = createAsyncThunk("catalog/saveCatalogAction", async (body: {}, thunkAPI) => {
    const { isSuccess, data } = await axiosHandler(() =>
        CatalogAPI.saveCatalog(body)
    );
    if (isSuccess) {
        return data;
    }
    return thunkAPI.rejectWithValue({ data: null });
});

const getListCatalogDetailAction = createAsyncThunk("catalog/getListCatalogDetailAction", async (id: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        CatalogAPI.getListCatalogDetail(id)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const saveCatalogDetailAction = createAsyncThunk("catalog/saveCatalogDetailAction", async (body: {}, thunkAPI) => {
    const { isSuccess, data } = await axiosHandler(() =>
        CatalogAPI.saveCatalogDetail(body)
    );
    if (isSuccess) {
        return data;
    }
    return thunkAPI.rejectWithValue({ data: null });
});
export { getListCatalogAction, saveCatalogAction, getListCatalogDetailAction, saveCatalogDetailAction }
