import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const GREEN = 'rgba(0, 255, 0, 0.3)';
const RED = 'rgba(255, 0, 0, 0.3)';

export const HistoryEntry = ({ item }) => {
  const iconName = `caret${item.isLower ? 'down' : 'up'}`;
  const color = item.isLower ? RED : GREEN;
  const suffix = item.isLower ? 'Lower' : 'Higher';
  return (
    <View
      style={[
        styles.historyEntryContainer,
        styles[`historyEntryContainer${suffix}`],
      ]}>
      <Text
        style={[styles.historyEntryText, styles[`historyEntryText${suffix}`]]}>
        {item.guess} is {suffix}
      </Text>
      <Icon name={iconName} type="antdesign" color={color} size={18} />
    </View>
  );
};

const styles = StyleSheet.create({
  historyEntryContainer: {
    height: 30,
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  historyEntryContainerLower: {
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
  },
  historyEntryContainerHigher: {
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
  },
  historyEntryText: {
    fontSize: 18,
  },
  historyEntryTextLower: {
    color: 'rgba(255, 0, 0, 0.3)',
  },
  historyEntryTextHigher: {
    color: 'rgba(0, 255, 0, 0.3)',
  },
});
