import {setDefaultOptions} from 'date-fns/esm';
import {ptBR} from 'date-fns/locale';
import {LocaleConfig} from 'react-native-calendars';

export const runConfigDate = (): void => {
  setDefaultOptions({locale: ptBR});

  LocaleConfig.locales.pt_BR = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov.',
      'Dez',
    ],
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje',
  };

  LocaleConfig.defaultLocale = 'pt_BR';
};

export const DATE_FORMATS = {
  calendar: 'yyyy-MM-dd',
  title: "MMMM'/'yyyy",
};
