import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = props => {
  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Text style={{ ...styles.title, ...props.titleStyle }}>
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
