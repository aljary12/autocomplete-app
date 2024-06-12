export interface AutocompleteResponse {
  predictions: Prediction[];
  status: 'OK' | 'ZERO_RESULTS';
}

export interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}
export interface DetailResponse {
  result: Detail;
  status: string;
}

export interface Detail {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: Geometry;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}
