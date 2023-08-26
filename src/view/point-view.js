import {createElement} from '../render.js';
import {cteatePointTemplate} from '../template/point-template.js';

export default class PointView {
  getTemplate() {
    return cteatePointTemplate();
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
