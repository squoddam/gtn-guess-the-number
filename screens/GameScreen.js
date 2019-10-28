import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Title from '../components/Title';
import Button from '../components/Button';
import NumberKeyboard from '../components/NumberKeyboard';

import { HistoryEntry } from './../components/HistoryEntry';

import { randMinMax } from './utils';
import { messages, getDefaultMessage } from '../messagesHelper';

const GameScreen = ({ navigation }) => {
  const listRef = useRef();

  const randomNumber = useRef(String(Math.floor(Math.random() * 100)));
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState([]);
  const [msgMode, setMsgMode] = useState('common');

  useEffect(() => listRef.current.scrollToEnd(), [history]);

  const setNum = num => setGuess(state => `${state}${num}`);

  const handleReset = () => setGuess('');
  const handleTry = () => {
    setHistory([
      ...history,
      {
        key: String(Date.now()),
        guess,
        isLower: Number(guess) < Number(randomNumber.current),
      },
    ]);

    if (guess === randomNumber.current) {
      navigation.navigate('GameOverScreen', { attempts: history.length + 1 });
      setHistory([]);
      randomNumber.current = String(Math.floor(Math.random() * 100));
    }

    setGuess('');
  };

  const getMessage = useCallback(() => {
    let currentMsgMode = null;

    if (msgMode) {
      const modeConf = messages.special.find(mode => mode.name === msgMode);

      if (modeConf && modeConf.check(history)) {
        currentMsgMode = msgMode;
      }
    } else {
      const currentMsgModeConf = messages.special.find(mode =>
        mode.check(history)
      );

      if (currentMsgModeConf) {
        currentMsgMode = currentMsgModeConf.name;
      }
    }

    if (currentMsgMode !== msgMode) setMsgMode(currentMsgMode);

    if (currentMsgMode) {
      const specialIndex = messages.special.findIndex(
        s => s.name === currentMsgMode
      );
      const specialMessages = messages.special[specialIndex].messages;

      return specialMessages[randMinMax(0, specialMessages.length)];
    }

    return getDefaultMessage(history);
  }, [history]);

  const commentMessage = useMemo(
    () => (history.length === 0 ? "What's your guess?" : getMessage()),
    [history]
  );

  return (
    <View style={styles.container}>
      <Title>{commentMessage}</Title>
      <Title
        titleStyle={styles.guessText}
        containerStyle={styles.guessContainer}>
        {guess}
      </Title>

      <FlatList
        ref={listRef}
        inverted
        style={styles.historyContainer}
        data={history}
        renderItem={HistoryEntry}
        getItemLayout={(data, index) => ({
          length: 30,
          offset: 30 * index,
          index,
        })}
      />
      <NumberKeyboard setNum={setNum} disabled={guess.length == 2} />
      <View style={styles.btnsContainer}>
        <Button
          title="RESET"
          onPress={handleReset}
          containerStyle={styles.btn}
        />
        <Button title="TRY" onPress={handleTry} containerStyle={styles.btn} />
        <Button
          title="BACK"
          onPress={() => navigation.navigate('StartScreen')}
          containerStyle={styles.btn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guessContainer: {
    flex: 0,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    width: '100%',
  },
  guessText: {
    fontFamily: 'Raleway',
    fontSize: 36,
  },
  historyContainer: {
    width: '100%',
    flex: 0,
    height: 30 * 5,
    flexGrow: 0,
  },
  btnsContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  btn: {
    flexBasis: '50%',
  },
});

export default GameScreen;
