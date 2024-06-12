import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface SearchState {
  predictions: Prediction[];
}

const initialState: SearchState = {
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
});

// Action creators are generated for each case reducer function
export const {clearSearch, setPredictions} = searchSlice.actions;

export const predictionSelector = (state: RootState) =>
  state.search.predictions;

export default searchSlice.reducer;
