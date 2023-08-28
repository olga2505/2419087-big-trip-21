import {createElement} from '../render.js';
import {createPointEditTemplate} from '../template/point-edit-template.js';
import {POINT_EMPTY} from '../const.js';

export default class PointEditView {
  constructor({point = POINT_EMPTY, pointDestinations, pointOffers}) {
    this.point = point;
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createPointEditTemplate({
      point: this.point,
      pointDestinations: this.pointDestinations,
      pointOffers: this.pointOffers,
    });
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
