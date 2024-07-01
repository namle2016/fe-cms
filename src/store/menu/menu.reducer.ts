import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Menu, MenuState } from './menu.type';
import { getListMenuAction } from './menu.action';

const initialState: MenuState = {
    listMenu: {
        data: [] as Menu[],
        isloading: false,
        error: '',
    },
    isShowMenu: true,
    detailMenuAdmin: {} as Menu,
    selectMenuPostGroup: {} as Menu,
    selectMenuPost: {} as Menu,
    selectMenuCatalog: {} as Menu,
    selectMenuCatalogDetail: {} as Menu,
};
const menuSlice = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {
        setShowMenu: (state: MenuState, action: PayloadAction<boolean>) => ({
            ...state,
            isShowMenu: action.payload
        }),
        setDetailMenuAdmin: (state: MenuState, action: PayloadAction<Menu>) => ({
            ...state,
            detailMenu: { data: action.payload, isShow: true }
        }),
        setSelectMenuPostGroup: (state: MenuState, action: PayloadAction<Menu>) => ({
            ...state,
            selectMenuPostGroup: action.payload
        }),
        setSelectMenuPost: (state: MenuState, action: PayloadAction<Menu>) => ({
            ...state,
            selectMenuPost: action.payload
        }),
        setSelectMenuCatalog: (state: MenuState, action: PayloadAction<Menu>) => ({
            ...state,
            selectMenuCatalog: action.payload
        }),
        setSelectMenuCatalogDetail: (state: MenuState, action: PayloadAction<Menu>) => ({
            ...state,
            selectMenuCatalogDetail: action.payload
        }),

    },

    extraReducers: (builder) => {
        builder.addCase(getListMenuAction.pending, (state: MenuState) => ({
            ...state,
            listMenu: {
                ...state.listMenu,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListMenuAction.fulfilled,
            (state: MenuState, action: PayloadAction<any>) => ({
                ...state,
                listMenu: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListMenuAction.rejected, (state: MenuState) => ({
            ...state,
            listMenu: {
                data: [] as Menu[],
                isloading: false,
                error: '',
            },
        }));
    },
});
export const { setShowMenu, setDetailMenuAdmin, setSelectMenuPostGroup, setSelectMenuPost, setSelectMenuCatalog, setSelectMenuCatalogDetail } = menuSlice.actions;
export default menuSlice.reducer;
