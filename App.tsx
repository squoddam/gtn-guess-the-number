import React from 'react';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const nav = createStackNavigator(
  {
    StartScreen: { screen: StartScreen },
    GameScreen: { screen: GameScreen },
    GameOverScreen: { screen: GameOverScreen },
  },
  {
    initialRouteName: 'StartScreen',
    headerMode: 'none',
  }
);

const Routes = createAppContainer(nav);

export default class App extends React.Component {
  state = {
    isFontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Raleway: require('./assets/fonts/Raleway-Thin.ttf'),
    });

    this.setState({ isFontLoaded: true });
  }

  render() {
    return this.state.isFontLoaded && <Routes />;
  }
}
