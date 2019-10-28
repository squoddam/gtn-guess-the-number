import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const NumberBtn = props => (
  <Button
    title={props.num}
    containerStyle={styles.number}
    buttonStyle={styles.numberBtn}
    titleStyle={styles.numberText}
    onPress={props.onPress(props.num)}
    type="outline"
    disabled={props.disabled}
  />
);

const styles = StyleSheet.create({
  number: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  numberBtn: {
    flex: 1,
  },
  numberText: {
    flex: 1,
    fontFamily: 'Raleway',
    fontSize: 20,
  },
});
