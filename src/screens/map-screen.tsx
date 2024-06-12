import {StyleSheet} from 'react-native';
import MapView, {MapMarker, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../components/nav-bar';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootParamList} from '../navigator/root-navigator';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {placeActions, placeSelector} from '../stores/place-slice';
import {AppDispatch} from '../stores';
import {convertLocToLatLng} from '../util/convert-location';

type Route = RouteProp<RootParamList, 'map'>;

// KL coordinates
const initialRegion = {
  latitude: 3.152815,
  longitude: 101.703651,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

function MapScreen() {
  const route = useRoute<Route>();
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker>(null);

  const dispatch = useDispatch<AppDispatch>();
  const {detail} = useSelector(placeSelector);

  useEffect(() => {
    if (detail) {
      markerRef.current?.showCallout();
    }
  }, [detail]);

  const onMapReady = async () => {
    const {placeId} = route.params;

    const detail = await dispatch(
      placeActions.getDetail({place_id: placeId}),
    ).unwrap();

    const region = {
      ...convertLocToLatLng(detail.geometry.location),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(region, 500);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <NavBar title="Map" back containerStyle={styles.header} />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        onMapReady={onMapReady}
        loadingEnabled
        initialRegion={initialRegion}
        style={{flex: 1}}>
        <Marker
          ref={markerRef}
          coordinate={
            detail?.geometry?.location
              ? convertLocToLatLng(detail?.geometry?.location)
              : initialRegion
          }
          title={detail?.name}
          description={detail?.formatted_address}
        />
      </MapView>
    </SafeAreaView>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
});
