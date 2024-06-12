import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Flex, Icon} from '@ant-design/react-native';

interface Props {
  back?: boolean;
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}
export default function NavBar(props: Props) {
  const navigation = useNavigation();
  const {back, title, containerStyle, titleStyle} = props;

  return (
    <Flex style={[styles.container, containerStyle]}>
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});
