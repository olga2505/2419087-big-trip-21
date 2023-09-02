import AbstractView from '../framework/view/abstract-view.js';
import {createTtripInfoTemplate} from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  get template() {
    return createTtripInfoTemplate();
  }
}
