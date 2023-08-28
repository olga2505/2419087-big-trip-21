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

export {
  DESTINATION_COUNT,
  OFFER_COUNT,
  POINT_COUNT,
  TYPES,
  DEFAULT_TYPE,
  POINT_EMPTY
};
