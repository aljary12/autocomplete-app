import {Flex, Icon, View} from '@ant-design/react-native';
import React, {useCallback} from 'react';
import InputForm from '../components/input-form';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions, searchSelector} from '../stores/search-slice';
import {debounce} from 'lodash';
import {AppDispatch} from '../stores';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
} from 'react-native';
import {Prediction} from '../types/place';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../components/nav-bar';
import {IconFill} from '@ant-design/icons-react-native';

function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const {searching, predictions, error} = useSelector(searchSelector);

  const search = debounce((text: string) => {
    const input = text.trim();

    dispatch(searchActions.autocomplete({input}));
  }, 1000);

  const renderItem: ListRenderItem<Prediction> = useCallback(({item}) => {
    return (
      <Flex align="start" style={{gap: 8}}>
        <IconFill name="environment" size={22} color="#DD2534" />
        <Flex direction="column" align="start" style={{gap: 4, flex: 1}}>
          <Text style={{fontWeight: '600'}}>
            {item.structured_formatting.main_text}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '200'}}>
            {item.structured_formatting.secondary_text}
          </Text>
        </Flex>
      </Flex>
    );
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <NavBar title="Home" />
      <InputForm
        placeholder="Search"
        clearButtonMode="while-editing"
        onChangeText={search}
      />
      <FlatList
        data={predictions}
        renderItem={renderItem}
        keyExtractor={item => item.place_id}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: predictions.length > 0 ? 'flex-start' : 'center',
          gap: 20,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          searching ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Error />
          ) : (
            <Empty />
          )
        }
      />
    </SafeAreaView>
  );
}

const Error = () => {
  return (
    <View style={styles.empty}>
      <Icon name="exclamation-circle" size={72} color="#DD2534" />
      <Text style={styles.emptyBody}>Can't find your location</Text>
    </View>
  );
};

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Icon name="search" size={72} />
      <Text style={styles.emptyBody}>Search your location</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyBody: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});
