import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { IHistoryEntry } from '../types';

const GREEN = 'rgba(0, 255, 0, 0.3)';
const RED = 'rgba(255, 0, 0, 0.3)';

interface IProps {
  item: IHistoryEntry;
}

enum Entry {
  Lower = 'Lower',
  Higher = 'Higher',
}

export const HistoryEntry: React.FC<IProps> = ({ item }) => {
  const iconName = `caret${item.isLower ? 'down' : 'up'}`;
  const color = item.isLower ? RED : GREEN;
  const type = item.isLower ? Entry.Lower : Entry.Higher;
  return (
    <View
      style={[
        styles.historyEntryContainer,
        historyEntryStyles.historyEntryContainer(type),
      ]}>
      <Text
        style={[
          styles.historyEntryText,
          historyEntryStyles.historyEntryText(type),
        ]}>
        {item.guess} is {type}
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
  historyEntryText: {
    fontSize: 18,
  },
});

const historyEntryStyles = {
  historyEntryContainer: (type: Entry): { backgroundColor: string } => ({
    backgroundColor:
      type === Entry.Lower ? 'rgba(255, 0, 0, 0.05)' : 'rgba(0, 255, 0, 0.05)',
  }),
  historyEntryText: (type: Entry): { color: string } => ({
    color:
      type === Entry.Lower ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)',
  }),
};
