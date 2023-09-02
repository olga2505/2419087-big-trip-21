const DESTINATION_COUNT = 5;

const OFFER_COUNT = 5;

const POINT_COUNT = 5;

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DEFAULT_TYPE = 'flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const EMPTY_TEXT = {
  everthing: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now',
};

export {
  DESTINATION_COUNT,
  OFFER_COUNT,
  POINT_COUNT,
  TYPES,
  DEFAULT_TYPE,
  POINT_EMPTY,
  EMPTY_TEXT
};
