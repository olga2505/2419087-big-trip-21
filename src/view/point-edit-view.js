// import AbstractView from '../framework/view/abstract-view.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {createPointEditTemplate} from '../template/point-edit-template.js';
import {POINT_EMPTY} from '../const.js';

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleFormReset = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onFormReset, onFormSubmit}) {
    super();
    this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;

    this._restoreHandlers();
  }


  get template() {
    return createPointEditTemplate({
      point: this.#point,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
    });
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('form')
      .addEventListener('reset', this.#formResetHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formResetHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset();
  };
}
