import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getlistFooterAction } from './footer.action';
import { Footer, FooterState } from './footer.type';

const initialState: FooterState = {
  listFooter: {
    data: [] as Footer[],
    isloading: false,
    error: '',
  }
};
const footerSlice = createSlice({
  name: 'footer',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getlistFooterAction.pending, (state: FooterState) => ({
      ...state,
      listFooter: {
        ...state.listFooter,
        isloading: true,
        error: ''
      }
    }));

    builder.addCase(
      getlistFooterAction.fulfilled,
      (state: FooterState, action: PayloadAction<any>) => ({
        ...state,
        listFooter: {
          data: action.payload,
          isloading: false,
          error: '',
        },
      }));

    builder.addCase(getlistFooterAction.rejected, (state: FooterState) => ({
      ...state,
      listFooter: {
        data: [] as Footer[],
        isloading: false,
        error: '',
      },
    }));
  },
});

export default footerSlice.reducer;
