import AbstractView from '../framework/view/abstract-view.js';
import {createPointEditTemplate} from '../template/point-edit-template.js';
import {POINT_EMPTY} from '../const.js';

export default class PointEditView extends AbstractView {
  constructor({point = POINT_EMPTY, pointDestinations, pointOffers}) {
    super();
    this.point = point;
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
  }

  get template() {
    return createPointEditTemplate({
      point: this.point,
      pointDestinations: this.pointDestinations,
      pointOffers: this.pointOffers,
    });
  }
}
