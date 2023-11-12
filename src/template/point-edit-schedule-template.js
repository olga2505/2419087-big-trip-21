import {getScheduleDate} from '../utils/points';

export const createPointEditScheduleTemplate = ({point}) => {
  const scheduleDateFrom = getScheduleDate(point.dateFrom);
  const scheduleDateTo = getScheduleDate(point.dateTom);

  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${scheduleDateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${scheduleDateTo}">
    </div>
  `;
};
