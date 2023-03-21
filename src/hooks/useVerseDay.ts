import {useEffect, useState} from 'react';
import {_retrieveVerse, _storeVerse} from 'utils/storage';
import {compareAsc, isSameDay} from 'date-fns';
import axios from 'axios';

const useVerseDay = () => {
  const today = new Date();
  const [verse, setVerse] = useState('');

  const getNewVerse = async () => {
    axios
      .get('https://www.abibliadigital.com.br/api/verses/nvi/random')
      .then(res => {
        const {
          text,
          chapter,
          number,
          book: {name, version},
        } = res.data;
        const versionUppercase = String(version).toUpperCase();
        const newVerse = `${text} \n ${name} - ${chapter}:${number} - ${versionUppercase}`;
        _storeVerse({verse: newVerse, date: new Date().toISOString()});
        setVerse(newVerse);
      });
  };

  useEffect(() => {
    (async () => {
      const verseStore = await _retrieveVerse();
      if (verseStore.verse) {
        if (isSameDay(today, new Date(verseStore.date))) {
          setVerse(verseStore.verse);
        } else {
          await getNewVerse();
        }
      } else {
        await getNewVerse();
      }
    })();
  }, []);

  return verse;
};

export default useVerseDay;
