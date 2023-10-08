import {createPointEditEventTypeTemplate} from './point-edit-event-type-template.js';
import {createPointEditDestinationsTemplate} from './point-edit-event-destinations-template.js';
import {createPointEditScheduleTemplate} from './point-edit-event-schedule-template.js';
import {createPointEditPriceTemplate} from './point-edit-event-price-template.js';
import {createPointEditControlsTemplate} from './point-edit-event-controls-template.js';
import {createPointEditOffersTemplate} from './point-edit-event-offers-template.js';
import {createPointEditDestinationTemplate} from './point-edit-event-destination-template.js';

function createPointEditTemplate ({point, pointDestinations, pointOffers}) {


  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createPointEditEventTypeTemplate({point})}

          ${createPointEditDestinationsTemplate({point, pointDestinations})}

          ${createPointEditScheduleTemplate()}

          ${createPointEditPriceTemplate()}

          ${createPointEditControlsTemplate()}
        </header>

        <section class="event__details">
          ${createPointEditOffersTemplate({point, pointOffers})}

          ${createPointEditDestinationTemplate()}
        </section>

      </form>
    </li>`
  );
}

export {createPointEditTemplate};
