import filter from 'leo-profanity';

export const enWords = filter.getDictionary('en');
export const ruWords = filter.getDictionary('ru');

filter.add(enWords);
filter.add(ruWords);
