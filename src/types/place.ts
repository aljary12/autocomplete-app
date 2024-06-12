export interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface AutocompleteResponse {
  predictions: Prediction[];
  status: 'OK' | 'ZERO_RESULTS';
}
