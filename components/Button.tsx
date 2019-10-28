import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button as ButtonElement, ButtonProps } from 'react-native-elements';

interface IProps extends ButtonProps {
  containerStyle?: ViewStyle;
}

const Button: React.FC<IProps> = props => {
  return (
    <View style={StyleSheet.flatten([styles.container, props.containerStyle])}>
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
