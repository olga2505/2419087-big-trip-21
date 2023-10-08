import {CITIES} from './../mock/const.js';
export const createPointEditDestinationsTemplate = ({point, pointDestinations}) => {

  const currentCity = pointDestinations.find((pointDestination) => pointDestination.id === point.destination).name;

  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentCity}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${CITIES.map((citie) => `
        <option value="${citie}"></option>
        `).join('')}
      </datalist>
    </div>
  `;
};
