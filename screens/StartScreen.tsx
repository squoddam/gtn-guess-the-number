import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import Title from '../components/Title';
import Button from '../components/Button';

interface IProps {
  navigation: NavigationStackProp;
}

const StartScreen: React.FC<IProps> = ({ navigation }) => (
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
