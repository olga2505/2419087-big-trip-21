
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
// import ItemView from '../view/item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new ListView();
  pointEditComponent = new PointEditView();
  pointComponent = new PointView();
  // itemComponent = new ItemView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(this.pointEditComponent, this.eventListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      // render(new ItemView(), this.eventListComponent.getElement());
      render(new PointView(), this.eventListComponent.getElement());
    }

  }
}
