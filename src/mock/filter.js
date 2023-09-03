import {filter} from '../utils/filter.js';

function generateFilter(tasks) {
  // entries преобразует объект в массив из пар ключ/значение. map - проитерирует массив
  return Object.entries(filter).map(
    // [filterType, filterTasks] - деструктуризация массива, где filterType - тип, filterTasks - функция
    ([filterType, filterTasks]) => ({
      type: filterType,
      count: filterTasks(tasks).length,
    }),
  );
}

export {generateFilter};
