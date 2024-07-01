import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, PostGroup } from "./post.type";
import { axiosHandler } from "@/api/httpClient";
import PostAPI from "./post.api";

const getListPostGroupAction = createAsyncThunk("post/getListPostGroupAction", async (code: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        PostAPI.getListPostGroup(code)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const getPostGroupAction = createAsyncThunk("post/getPostGroupAction", async (id: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        PostAPI.getPostGroup(id)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});
const savePostGroupAction = createAsyncThunk("post/savePostGroupAction", async (body: {}, thunkAPI) => {
    const { isSuccess, data } = await axiosHandler(() =>
        PostAPI.savePostGroup(body)
    );
    if (isSuccess) {
        return data;
    }
    return thunkAPI.rejectWithValue({ data: null });
});

const getListPostAction = createAsyncThunk("post/getListPostAction", async (code: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        PostAPI.getListPost(code)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const getPostAction = createAsyncThunk("post/getPostAction", async (id: string) => {
    const { isSuccess, data } = await axiosHandler(() =>
        PostAPI.getPost(id)
    );
    if (isSuccess) {
        return data;
    }
    return null;
});

const savePostAction = createAsyncThunk("post/savePostAction", async (body: {}, thunkAPI) => {
    const { isSuccess, data } = await axiosHandler(() =>
        PostAPI.savePost(body)
    );
    if (isSuccess) {
        return data;
    }
    return thunkAPI.rejectWithValue({ data: null });
});


export { getListPostGroupAction, getPostGroupAction, savePostGroupAction, getListPostAction, getPostAction, savePostAction }