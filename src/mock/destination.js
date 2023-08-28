import {getRandomValue} from '../utils';
import {CITIES, DESCRIPTION} from './const';

function generateDestination () {
  const city = getRandomValue(CITIES);

  return {
    id: crypto.randomUUID(), // crypto.randomUUID - позволяет получить уникальный идентификатор
    name: city,
    description: DESCRIPTION,
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'desctiption': `${city} description`
      }
    ]
  };
}

export{generateDestination};
