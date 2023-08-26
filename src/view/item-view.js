import {createElement} from '../render.js';
import {createItemTemplate} from '../template/item-template.js';

export default class ItemView {
  getTemplate() {
    return createItemTemplate();
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
