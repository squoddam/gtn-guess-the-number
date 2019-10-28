import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from '../components/Title';
import Button from '../components/Button';
import { NavigationStackProp } from 'react-navigation-stack';

interface IProps {
  navigation: NavigationStackProp;
}

const GameOverScreen: React.FC<IProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title titleStyle={styles.congratsTitle}>Congratulations!</Title>
      <View style={styles.attempts}>
        <Title>And it only took you</Title>
        <Title titleStyle={styles.score}>
          {navigation.getParam('attempts', 'NAN')}
        </Title>
        <Title>attempts!</Title>
      </View>
      <View style={styles.btns}>
        <Button
          title="TRY AGAIN"
          onPress={() => navigation.navigate('GameScreen')}
        />
        <Button
          title="TO MAIN SCREEN"
          onPress={() => navigation.navigate('StartScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsTitle: {
    fontSize: 42,
  },
  attempts: {
    flex: 3,
  },
  score: {
    fontSize: 64,
  },
  btns: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default GameOverScreen;
