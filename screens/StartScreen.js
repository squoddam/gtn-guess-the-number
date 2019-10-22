import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StartScreen;
