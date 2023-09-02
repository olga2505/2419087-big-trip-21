import AbstractView from '../framework/view/abstract-view.js';
import {createLiistEmptyPoint} from '../template/liist-empty-point.js';

export default class ListEmptyView extends AbstractView {
  #text = null;

  constructor({text}) {
    super();
    this.#text = text;
  }

  get template() {
    return createLiistEmptyPoint({
      text: this.#text,
    });
  }
}
