import AbstractView from '../framework/view/abstract-view.js';
import {createFilterTemplate} from '../template/filter-template.js';

export default class FiltersView extends AbstractView {
  #filters = null;
  // filters - массив, который содержит объекты с описание каждого фильтра
  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
