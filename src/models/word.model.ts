export interface ImportWord {
  text: string;
  enTranslation: string;
  zhTranslation: string
  pronunciation: string
  imageUrl: string
  audioSrc: string
  example: string
  extra: string;
}

export interface Word extends ImportWord {
  id: number;
  createdTime: Date;
  updatedTime: Date;
}