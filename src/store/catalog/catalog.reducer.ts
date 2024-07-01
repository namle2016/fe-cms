import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Catalog, CatalogDetail, CatalogState } from './catalog.type';
import { getListCatalogAction, getListCatalogDetailAction } from './catalog.action';

const initialState: CatalogState = {
    listCatalog: {
        data: [] as Catalog[],
        isloading: false,
        error: '',
    },
    listCatalogDetail: {
        data: [] as CatalogDetail[],
        isloading: false,
        error: '',
    },
    listCatalogSelect: [] as Catalog[],
    selectCatalog: {} as Catalog,
    selectCatalogDetail: {} as CatalogDetail,
    catalogDetail: {} as Catalog
};
const catalogSlice = createSlice({
    name: 'catalog',
    initialState: initialState,
    reducers: {
        setSelectCatalog: (state: CatalogState, action: PayloadAction<any>) => ({
            ...state,
            selectCatalog: action.payload,
        }),
        setCatalogDetail: (state: CatalogState, action: PayloadAction<Catalog>) => ({
            ...state,
            catalogDetail: action.payload,
        }),
        setSelectCatalogDetail: (state: CatalogState, action: PayloadAction<CatalogDetail>) => ({
            ...state,
            selectCatalogDetail: action.payload,
        }),
        setListCatalogSelect: (state: CatalogState, action: PayloadAction<Catalog[]>) => ({
            ...state,
            listCatalogSelect: action.payload,
        }),
        setListCatalogDetail: (state: CatalogState, action: PayloadAction<CatalogDetail[]>) => ({
            ...state,
            listCatalogDetail: {
                data: action.payload,
                isloading: false,
                error: '',
            },
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(getListCatalogAction.pending, (state: CatalogState) => ({
            ...state,
            listCatalog: {
                ...state.listCatalog,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListCatalogAction.fulfilled,
            (state: CatalogState, action: PayloadAction<any>) => ({
                ...state,
                listCatalog: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListCatalogAction.rejected, (state: CatalogState) => ({
            ...state,
            listCatalog: {
                data: [] as Catalog[],
                isloading: false,
                error: '',
            },
        }));


        builder.addCase(getListCatalogDetailAction.pending, (state: CatalogState) => ({
            ...state,
            listCatalogDetail: {
                ...state.listCatalogDetail,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListCatalogDetailAction.fulfilled,
            (state: CatalogState, action: PayloadAction<any>) => ({
                ...state,
                listCatalogDetail: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListCatalogDetailAction.rejected, (state: CatalogState) => ({
            ...state,
            listCatalogDetail: {
                data: [] as CatalogDetail[],
                isloading: false,
                error: '',
            },
        }));
    },
});
export const { setSelectCatalog, setCatalogDetail, setSelectCatalogDetail, setListCatalogDetail, setListCatalogSelect } = catalogSlice.actions;
export default catalogSlice.reducer;
