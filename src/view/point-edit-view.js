// import AbstractView from '../framework/view/abstract-view.js';
import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {createPointEditTemplate} from '../template/point-edit-template.js';
import {POINT_EMPTY} from '../const.js';

import 'flatpickr/dist/flatpickr.css';

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleResetClick = null;
  #handleFormSubmit = null;
  #handleFormReset = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onFormReset, onFormSubmit}) {
    super();
    this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;

    this._setState(PointEditView.parsePointToState({point}));

    this._restoreHandlers();
  }


  get template() {
    return createPointEditTemplate({
      state: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
    });
  }

  reset = (point) => this.updateElement({point});

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formResetHandler);

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    // this.element.querySelector('form')
    //   .addEventListener('reset', this.#formResetHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    // this.element.querySelector('.event__available-offers')
    //   .addEventListener('change', this.#offerChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  }

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateForm,
        onClose: this.#dateFormCloseHandler,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.point.dateFrom
      }
    );
  };

  #dateFormCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset();
  };

  // тип
  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        // извлекает выбранный тип
        type: evt.target.value,
        // очищает офферы
        offers: []
      }
    });
  };

  // Имя направления
  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointDestinations
      // извлекает введёглн имя направления
      .find((pointDestination) => pointDestination.name === evt.target.value);

    // если такое напрвление есть, запоминает его id
    const selectedDestinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    // updateElement из AbstractStatefulView
    this.updateElement({
      point: {
        ...this._state.point, // передаём те данные кот. были в точке раньше
        destination: selectedDestinationId // передаём новый id направления
      }
    });
  };

  // Офферы
  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point, // передаём те данные кот. были в точке раньше
        offers: checkedBoxes.map((element) => element.dataset.offerId) // записываем id офферов, которые выбрали
      }
    });
  };

  // Цена
  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point, // передаём те данные кот. были в точке раньше
        basePrice: evt.target.valueAsNumber // записываем цену
      }
    });
  };

  static parsePointToState = ({point}) => ({point});

  static parseStateToPoint = (state) => state.point;
}
