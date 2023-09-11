import AbstractView from '../framework/view/abstract-view.js';
import {createSortTemplate} from '../template/sort-template.js';

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #items = null;

  constructor({items, onSortTypeChange}) {
    super();
    this.#items = items;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#items);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    // ?. - optional changing
    this.#handleSortTypeChange?.(evt.target.dataset.sortType);
  };
}
