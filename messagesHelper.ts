import { randMinMax } from './screens/utils';
import { IMessages, IHistoryEntry } from './types';

export const messages: IMessages = {
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
      check: history => history.slice(-3).every(entry => entry.guess === '69'),
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
          .slice(-3)
          .every(entry => entry.guess === history.slice(-1)[0].guess),
    },
  ],
};

export const getDefaultMessage = (history: IHistoryEntry[]): string => {
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
