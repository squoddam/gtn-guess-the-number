import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface IProps {
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const Title: React.FC<IProps> = props => {
  return (
    <View style={StyleSheet.flatten([styles.container, props.containerStyle])}>
      <Text style={StyleSheet.flatten([styles.title, props.titleStyle])}>
        {props.children}
      </Text>
    </View>
  );
};

Title.defaultProps = {
  titleStyle: {},
  containerStyle: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default Title;
