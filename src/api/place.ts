import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import * as config from './config';
import Config from 'react-native-config';
import {AutocompleteResponse} from '../types/place';

class Place {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${config.url.map}/place`,
      timeout: config.timeout,
      headers: config.headers,
    });

    this.api.interceptors.request.use(this.interceptor);
  }

  private interceptor(request: InternalAxiosRequestConfig) {
    request.params['key'] = Config.GOOGLE_MAP_API_KEY;
    return request;
  }

  autocomplete(params: {
    input: string;
  }): Promise<AxiosResponse<AutocompleteResponse, any>> {
    return this.api.get('autocomplete/json', {
      params: {...params, components: 'country:my'},
    });
  }

  detail(params: {place_id: string}) {
    return this.api.get('details/json', {
      params: {
        ...params,
        fields: 'id,place_id,name,geometry,formatted_address',
      },
    });
  }
}

export default Place;
