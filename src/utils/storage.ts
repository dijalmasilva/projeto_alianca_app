import AsyncStorage from '@react-native-community/async-storage';

const IPA_TOKEN_KEY = '@IPAToken';
const IPA_VERSE_KEY = '@IPAVerse';

export const _storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(IPA_TOKEN_KEY, token);
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveToken = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(IPA_TOKEN_KEY);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }

  return '';
};

type VerseStore = {date: string; verse: string};

export const _storeVerse = async (verse: VerseStore) => {
  try {
    await AsyncStorage.setItem(IPA_VERSE_KEY, JSON.stringify(verse));
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveVerse = async (): Promise<VerseStore> => {
  try {
    const value = await AsyncStorage.getItem(IPA_VERSE_KEY);
    if (value !== null) {
      return JSON.parse(value) as VerseStore;
    }
  } catch (error) {
    // Error retrieving data
  }

  return {date: new Date().toLocaleDateString(), verse: ''};
};
