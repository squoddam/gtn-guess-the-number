import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

const NumberBtn = props => (
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

const NumberKeyboard = props => {
  const handleSetNum = useMemo(() => num => () => props.setNum(num));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NumberBtn disabled={props.disabled} num="1" onPress={handleSetNum} />

        <NumberBtn disabled={props.disabled} num="2" onPress={handleSetNum} />

        <NumberBtn disabled={props.disabled} num="3" onPress={handleSetNum} />
      </View>
      <View style={styles.row}>
        <NumberBtn disabled={props.disabled} num="4" onPress={handleSetNum} />

        <NumberBtn disabled={props.disabled} num="5" onPress={handleSetNum} />

        <NumberBtn disabled={props.disabled} num="6" onPress={handleSetNum} />
      </View>
      <View style={styles.row}>
        <NumberBtn disabled={props.disabled} num="7" onPress={handleSetNum} />

        <NumberBtn disabled={props.disabled} num="8" onPress={handleSetNum} />

        <NumberBtn disabled={props.disabled} num="9" onPress={handleSetNum} />
      </View>
      <View style={styles.row}>
        <NumberBtn disabled={props.disabled} num="0" onPress={handleSetNum} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  number: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1
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

export default NumberKeyboard;
