import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

function formatStringToDateTime(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

function formatStringToShortDate(date) {
  return dayjs(date).format('MMM D');
}

function formatStringToTime(date) {
  return dayjs(date).format('HH:mm');
}

function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

function getPointDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  let pointDuration = 0;

  switch (true) {
    case(timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('D[D] H[H] m[M]');
      break;
    case(timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('H[H] m[M]');
      break;
    case(timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('m[M]');
      break;
  }

  return pointDuration;
}

function getScheduleDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

// прошлые даты
function isDateBefore(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

// настоящее
function isDateSame(dueDate) {
  return dueDate && dayjs().isSame(dueDate, 'D');
}

// будущие даты
function isDateAfter(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

// Сортировка по дате
function sortPointsDate(pointA, pointB) {
  // у dayjs есть метод diff сравнения дат
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsTime(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  if (durationA > durationB) {
    return -1;
  }

  if (durationA < durationB) {
    return 1;
  }

  return 0;
}

function sortPointsPrice(pointA, pointB) {
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }

  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }

  // если цены равны
  return 0;
}

export {
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringToTime,
  capitalize,
  getPointDuration,
  getScheduleDate,
  isDateBefore,
  isDateSame,
  isDateAfter,
  sortPointsDate,
  sortPointsTime,
  sortPointsPrice
};
