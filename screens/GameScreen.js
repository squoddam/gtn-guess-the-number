import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import Title from '../components/Title';
import Button from '../components/Button';
import NumberKeyboard from '../components/NumberKeyboard';

const GREEN = 'rgba(0, 255, 0, 0.3)';
const RED = 'rgba(255, 0, 0, 0.3)';

const randMinMax = (min, max) => Math.floor(Math.random() * (max - min) + min);

const HistoryEntry = ({ item }) => {
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

const messages = {
  default: {
    common: ['Nope.', 'Try Again!', 'You know how it works, right?'],
    lower: [
      'Take Higher!',
      'Add up!',
      'A little (maybe) higher?',
      'No, not that low!',
    ],
    higher: [
      'Wow, go down!',
      'No, no that high!',
      'You try too high',
      'Get closer to the ground!',
    ],
  },
  special: [
    {
      name: '69',
      messages: [
        'Noice',
        'Cool',
        'Seriously?',
        'Hm, ok',
        'Are you old enough to play this game?',
        'Eh',
      ],
      check: history =>
        history.slice(-3, -1).every(entry => entry.guess === '69'),
    },
    {
      name: 'Madness',
      messages: [
        'Hm',
        "I've already seen this...",
        'What...',
        'Are you even playing?',
        'You think this is funny?',
        'Have you heard a definition of madness?',
        'Yeah, cool, but what about other numbers?',
        'Ha-ha',
        'Funny (not really)',
        '...',
      ],
      check: history =>
        history
          .slice(-3, -1)
          .every(entry => entry.guess === history.slice(-1)[0].guess),
    },
  ],
};

const messagesActions = {
  ['attempt']: (state, action) => {},
};

function messagesReducer(state, action) {}

const initialState = {
  history: [],
  currentSequence: null,
};

const getDefaultMessage = history => {
  const lastEntry = history.slice(-1)[0];
  const isCommon = randMinMax(0, 2) === 1;

  if (isCommon) {
    return messages.default.common[
      randMinMax(0, messages.default.common.length)
    ];
  }

  const type = lastEntry.isLower ? 'lower' : 'higher';

  return messages.default[type][randMinMax(0, messages.default[type].length)];
};

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
