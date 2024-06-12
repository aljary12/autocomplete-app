import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import api from '../api';
import {Prediction} from '../types/place';

export const searchActions = {
  autocomplete: createAsyncThunk<Prediction[], {input: string}>(
    'search/autocomplete',
    async ({input}, {rejectWithValue}) => {
      if (input.length < 3) {
        return [];
      }

      const response = await api.place.autocomplete({input});
      if (response.data.status === 'ZERO_RESULTS') {
        return rejectWithValue('ZERO_RESULTS');
      }

      return response.data.predictions;
    },
  ),
};

export interface SearchState {
  searching: boolean;
  predictions: Prediction[];
  error: boolean;
}

const initialState: SearchState = {
  searching: false,
  predictions: [],
  error: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: () => initialState,
  },
  extraReducers: builder => {
    builder
      // autocomplete
      .addCase(searchActions.autocomplete.pending, state => {
        state.predictions = [];
        state.searching = true;
        state.error = false;
      })
      .addCase(searchActions.autocomplete.fulfilled, (state, action) => {
        state.predictions = action.payload;
        state.searching = false;
        state.error = false;
      })
      .addCase(searchActions.autocomplete.rejected, state => {
        state.predictions = [];
        state.searching = false;
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {clearSearch} = searchSlice.actions;

export const searchSelector = (state: RootState) => state.search;

export default searchSlice.reducer;
