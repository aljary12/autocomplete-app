import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';

interface Props extends TextInputProps {
  title?: string;
  formStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export default function InputForm(props: Props) {
  const {title, formStyle, inputStyle, style, ...rest} = props;

  return (
    <View style={[styles.inputContainer, inputStyle]}>
      <TextInput style={[styles.input, style]} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    gap: 12,
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    margin: 0,
    includeFontPadding: false,
  },
});
