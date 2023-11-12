export const createPointEditOffersTemplate = ({point, pointOffers}) => {
  const {type} = point;
  const offers = pointOffers.find(() => point.type === type).offers;

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map(({ id, title, price }) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${title}">
          <label class="event__offer-label" for="event-offer-${id}">
            <span class="event__offer-title">Add ${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`).join('')}
      </div>
    </section>
  `;
};

// function createPointEditOfferTemplate({point, offer}) {
//   return `
//     <div class="event__offer-selector">
//       <input
//         class="event__offer-checkbox visually-hidden"
//         id="event-offer-${point.type}--${offer.id}"
//         type="checkbox"
//         name="event-offer-${offer.title}"
//         data-offer-id=${offer.id}
//         ${(point.offers.includes(offer.id)) ? 'checked' : ''}
//       >
//       <label
//         class="event__offer-label"
//         for="event-offer-${point.type}--${offer.id}"
//       >
//         <span class="event__offer-title">Add ${offer.title}</span>
//         &plus;&euro;&nbsp;
//         <span class="event__offer-price">
//           ${offer.price}
//         </span>
//       </label>
//     </div>
//   `;
// }

// const createPointEditOffersTemplate = ({point, currentOffers}) => `
//     <section class="event__section  event__section--offers">
//       <h3 class="event__section-title  event__section-title--offers">Offers</h3>

//       <div class="event__available-offers">

//         ${currentOffers.map((currentOffer) => createPointEditOfferTemplate({point, currentOffer}))}

//       </div>
//     </section>
//   `;

// export {createPointEditOffersTemplate};
