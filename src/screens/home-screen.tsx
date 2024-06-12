import {View} from '@ant-design/react-native';
import React from 'react';
import InputForm from '../components/input-form';
import {useDispatch, useSelector} from 'react-redux';
import {
  searchActions,
  searchSelector,
  setPredictions,
} from '../stores/search-slice';
import {debounce} from 'lodash';
import {AppDispatch} from '../stores';
import {ActivityIndicator, FlatList, ListRenderItem, Text} from 'react-native';
import {Prediction} from '../types/place';

function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const {searching, predictions} = useSelector(searchSelector);

  const search = debounce((text: string) => {
    const input = text.trim();

    if (input.length < 3) {
      dispatch(setPredictions([]));
      return;
    }

    dispatch(searchActions.autocomplete({input}));
  }, 1000);

  const renderItem: ListRenderItem<Prediction> = ({item}) => {
    return (
      <View style={{backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12}}>
        <Text>{item.structured_formatting.main_text}</Text>
        <Text>{item.structured_formatting.secondary_text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, padding: 24, gap: 20}}>
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
          justifyContent:
            (predictions || []).length > 0 ? 'flex-start' : 'center',
          gap: 20,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          searching ? <ActivityIndicator size="large" /> : <Empty />
        }
      />
    </View>
  );
}

const Empty = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', gap: 12}}>
      <Text>Empty</Text>
      <Text>Search your location</Text>
    </View>
  );
};

export default HomeScreen;
