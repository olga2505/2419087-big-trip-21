import AbstractView from '../framework/view/abstract-view.js';
import {createPointTemplate} from '../template/point-template.js';

export default class PointView extends AbstractView{
  #handleEditClick = null;
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;

  constructor({point, pointDestinations, pointOffers, onEditClick}) {
    super();
    this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers

    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
