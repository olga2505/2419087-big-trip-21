import dayjs from 'dayjs';
import {getRandomInteger} from '../utils';
import {DURATION} from './const';

let date = dayjs().subtract(getRandomInteger(0, DURATION.DAY), 'day').toDate(); // subtract - разница дат. В резудбтате рандомная дата

function getDate({next}) {
  const minsGap = getRandomInteger(0, DURATION.MIN);
  const hoursGap = getRandomInteger(0, DURATION.HOUR);
  const daysGap = getRandomInteger(0, DURATION.DAY);

  if (next) {
    date = dayjs(date) // по умолчанию dayjs равен текущей дате. Если педедать дату, то все манипуляции будут от переданной даты
      .add(minsGap, 'minute') // прибавляет к переданной дате минуты, часы, дни
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate(); // возвращает нормальную дату
  }
  return date;
}

export {getDate};
