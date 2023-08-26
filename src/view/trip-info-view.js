import {createElement} from '../render.js';
import {createTtripInfoTemplate} from '../template/trip-info-template.js';

export default class TripInfoView {
  getTemplate() {
    return createTtripInfoTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
