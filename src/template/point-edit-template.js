import {createPointEditEventTypeTemplate} from './point-edit-event-type-template.js';
import {createPointEditDestinationsTemplate} from './point-edit-event-destinations-template.js';
import {createPointEditScheduleTemplate} from './point-edit-event-schedule-template.js';
import {createPointEditPriceTemplate} from './point-edit-event-price-template.js';
import {createPointEditControlsTemplate} from './point-edit-event-controls-template.js';
import {createPointEditOffersTemplate} from './point-edit-event-offers-template.js';
import {createPointEditDestinationTemplate} from './point-edit-event-destination-template.js';

function getOffersByType({offers, type}) {
  return offers
    .find((offer) => offer.type === type)
    .offers;
}

function getDestination({destinations, id}) {
  return destinations
    .find((destination) => destination.id === id);
}

function getDetailsTemplate({point, pointDestinations, pointOffers}) {
  const currentOffers = getOffersByType({
    offers: pointOffers,
    type: point.type
  });

  const currentDestination = getDestination({
    destinations: pointDestinations,
    id: point.destination
  });

  if (!currentDestination && !currentOffers.length === 0) {
    return '';
  }

  return `
    <section class="event__details">
      ${(currentOffers.length !== 0) ? createPointEditOffersTemplate({point, pointOffers}) : ''}

      ${(currentDestination) ? createPointEditDestinationTemplate({currentDestination}) : ''}
    </section>
  `;
}

function createPointEditTemplate ({point, pointDestinations, pointOffers}) {
  // const {point} = point;
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createPointEditEventTypeTemplate({point})}

          ${createPointEditDestinationsTemplate({point, pointDestinations})}

          ${createPointEditScheduleTemplate({point})}

          ${createPointEditPriceTemplate({point})}

          ${createPointEditControlsTemplate()}
        </header>

        <section class="event__details">
          ${getDetailsTemplate({point, pointDestinations, pointOffers})}
        </section>
      </form>
    </li>`
  );
}

export {createPointEditTemplate};
