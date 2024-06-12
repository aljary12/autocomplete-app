import {LatLng} from 'react-native-maps';
import {Location} from '../types/place';

export function convertLocToLatLng(location: Location): LatLng {
  return {latitude: location.lat, longitude: location.lng};
}
