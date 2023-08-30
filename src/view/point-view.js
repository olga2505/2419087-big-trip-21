import AbstractView from '../framework/view/abstract-view.js';
import {createPointTemplate} from '../template/point-template.js';

export default class PointView extends AbstractView{
  constructor({point, pointDestinations, pointOffers}) {
    super();
    this.point = point;
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
  }

  get template() {
    return createPointTemplate({
      point: this.point,
      pointDestinations: this.pointDestinations,
      pointOffers: this.pointOffers

    });
  }
}
