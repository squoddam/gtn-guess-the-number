import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as ButtonElement } from 'react-native-elements';

const Button = props => {
  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <ButtonElement {...props} titleStyle={styles.btn} type="clear" />
    </View>
  );
};

Button.defaultProps = {
  containerStyle: {},
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  btn: { fontFamily: 'Raleway', fontSize: 26 },
});

export default Button;
