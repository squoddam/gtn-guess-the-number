export interface IMessages {
  default: IDefaultMessages;
  special: ISpecialMessages[];
}

export interface IDefaultMessages {
  common: string[];
  lower: string[];
  higher: string[];
}

export interface ISpecialMessages {
  name: string;
  messages: string[];
  check: (history: IHistoryEntry[]) => boolean;
}

export interface IHistoryEntry {
  key: string;
  guess: string;
  isLower: boolean;
}
