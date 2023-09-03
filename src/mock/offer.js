import {getRandomInteger} from '../utils/common';
import {PRICE} from './const';

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `Order ${type}`,
    price: getRandomInteger(PRICE.MIN, (PRICE.MAX / 10))
  };
}

export {generateOffer};
