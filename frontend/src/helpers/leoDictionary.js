import filter from 'leo-profanity';
import badWords from '../locales/customBadWords.js';

const enWords = filter.getDictionary('en');
const ruWords = filter.getDictionary('ru');

filter.add(enWords);
filter.add(ruWords);
filter.add(badWords);
