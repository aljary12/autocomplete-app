import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import api from '../api';
import {Prediction} from '../types/place';

export const searchActions = {
  autocomplete: createAsyncThunk<Prediction[], {input: string}>(
    'search/autocomplete',
    async ({input}) => {
      const response = await api.place.autocomplete({input});
      return response.data.predictions;
    },
  ),
};

export interface SearchState {
  searching: boolean;
  predictions: Prediction[];
}

const initialState: SearchState = {
  searching: false,
  predictions: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: () => initialState,
    setPredictions: (state, action: PayloadAction<Prediction[]>) => {
      state.predictions = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // autocomplete
      .addCase(searchActions.autocomplete.pending, state => {
        state.searching = true;
      })
      .addCase(searchActions.autocomplete.fulfilled, (state, {payload}) => {
        state.predictions = payload;
        state.searching = false;
      })
      .addCase(searchActions.autocomplete.rejected, state => {
        state.predictions = [];
        state.searching = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {clearSearch, setPredictions} = searchSlice.actions;

export const searchSelector = (state: RootState) => state.search;

export default searchSlice.reducer;
