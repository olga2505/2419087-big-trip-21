import {FilterType} from '../const';
import {isDateBefore, isDateSame, isDateAfter} from './points';

const filter = {
  [FilterType.ALL]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateAfter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isDateSame(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isDateBefore(point.dateFrom)),
};

export {filter};
