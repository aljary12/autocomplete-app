import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import api from '../api';
import {Detail} from '../types/place';

export const placeActions = {
  getDetail: createAsyncThunk<Detail, {place_id: string}>(
    'place/getDetail',
    async ({place_id}) => {
      const response = await api.place.detail({place_id});
      return response.data.result;
    },
  ),
};

export interface PlaceState {
  fetching: boolean;
  detail?: Detail;
  error: boolean;
}

const initialState: PlaceState = {
  fetching: false,
  detail: undefined,
  error: false,
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // getDetail
      .addCase(placeActions.getDetail.pending, state => {
        state.detail = undefined;
        state.fetching = true;
        state.error = false;
      })
      .addCase(placeActions.getDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.fetching = false;
        state.error = false;
      })
      .addCase(placeActions.getDetail.rejected, state => {
        state.detail = undefined;
        state.fetching = false;
        state.error = true;
      });
  },
});

export const placeSelector = (state: RootState) => state.place;

export default placeSlice.reducer;
