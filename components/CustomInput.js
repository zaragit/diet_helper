import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CustomInput({name, placeholder, ...rest}, ref) {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={
        <Icon name={name} style={styles.marginRight} size={20} color="black" />
      }
      {...rest}
      ref={ref}
    />
  );
}

const styles = StyleSheet.create({
  marginRight: {
    marginRight: 5,
  },
});

export default React.forwardRef(CustomInput);
