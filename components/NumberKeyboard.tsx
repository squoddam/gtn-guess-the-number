import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { NumberBtn } from './NumberBtn';

interface IProps {
  disabled: boolean;
  setNum: (num: string) => void;
}

const NumberKeyboard: React.FC<IProps> = props => {
  const handleSetNum = useMemo(() => (num: string) => () => props.setNum(num), [
    props.setNum,
  ]);

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
});

export default NumberKeyboard;
