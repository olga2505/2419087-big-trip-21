import AbstractView from '../framework/view/abstract-view.js';
import {createListTemplate} from '../template/list-template.js';

export default class PointListView extends AbstractView {
  get template() {
    return createListTemplate();
  }
}
