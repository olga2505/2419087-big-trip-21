function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomValue(items) {
  return items[getRandomInteger(0, items.length - 1)];
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateItem(items, update) {
  // итерируемся по массиву, находим нужный элемент по id и вместо него закидываем обновлённый элемент update, если id не совпадает оставляем item (map возвращает новый массив).
  return items.map((item) => item.id === update.id ? update : item);
}

export {
  getRandomInteger,
  getRandomValue,
  getRandomArrayElement,
  updateItem,
};
