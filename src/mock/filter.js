import {filter} from '../utils/filter.js';

// результатом этой функции будет массив объектов с ключами type и count
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
