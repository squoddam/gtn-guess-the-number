import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Title from '../components/Title';
import Button from '../components/Button';

const StartScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Title>GTN: Guess The Number</Title>
    <View style={{ flex: 1 }}>
      <Button title="START" onPress={() => navigation.navigate('GameScreen')} />
    </View>
  </View>
);

StartScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StartScreen;
