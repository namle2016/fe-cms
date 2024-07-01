import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product, ProductState } from './product.type';
import { getListProductAction, getProductAction } from './product.action';

const initialState: ProductState = {
    listProduct: {
        data: [] as Product[],
        isloading: false,
        error: '',
    },
    detailProductAdmin: {
        data: {} as Product,
        isloading: false,
        error: '',
    },

};
const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setDetailProductAdmin: (state: ProductState, action: PayloadAction<Product>) => ({
            ...state,
            detailProductAdmin: {
                data: action.payload,
                isloading: false,
                error: '',
            },
        }),

    },

    extraReducers: (builder) => {
        builder.addCase(getListProductAction.pending, (state: ProductState) => ({
            ...state,
            listProduct: {
                ...state.listProduct,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getListProductAction.fulfilled,
            (state: ProductState, action: PayloadAction<any>) => ({
                ...state,
                listProduct: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getListProductAction.rejected, (state: ProductState) => ({
            ...state,
            listProduct: {
                data: [] as Product[],
                isloading: false,
                error: '',
            },
        }));


        builder.addCase(getProductAction.pending, (state: ProductState) => ({
            ...state,
            detailProductAdmin: {
                ...state.detailProductAdmin,
                isloading: true,
                error: ''
            }
        }));

        builder.addCase(
            getProductAction.fulfilled,
            (state: ProductState, action: PayloadAction<any>) => ({
                ...state,
                detailProductAdmin: {
                    data: action.payload,
                    isloading: false,
                    error: '',
                },
            }));

        builder.addCase(getProductAction.rejected, (state: ProductState) => ({
            ...state,
            detailProductAdmin: {
                data: {} as Product,
                isloading: false,
                error: '',
            },
        }));
    },
});
export const { setDetailProductAdmin } = productSlice.actions;
export default productSlice.reducer;
