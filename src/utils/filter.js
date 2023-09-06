import {FilterType} from '../const';
import {isDateBefore, isDateSame, isDateAfter} from './points';

const filter = {
  // в квадратных скобках, для того, чтобы создать ключ [FilterType.ALL] -> 'Everything'
  [FilterType.ALL]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateAfter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isDateSame(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isDateBefore(point.dateFrom)),
};

export {filter};
