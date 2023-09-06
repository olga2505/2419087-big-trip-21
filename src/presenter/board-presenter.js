import {RenderPosition, render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {EmptyText} from '../const.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  #sortComponent = new SortView();
  #pointsListContainer = new PointListView();
  #noPointComponent = new ListEmptyView({text: EmptyText.everthing});

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    // this.#points = [...#pointsModel.points];
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  // Отрисовка точек
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListContainer.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });
    pointPresenter.init(point);
  }

  // Отрисовка всех точек
  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  // Отрисовка соритровки
  #renderSort() {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    render(this.#pointsListContainer, this.#container);

    if (this.#points.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderPoints();
    this.#renderSort();
  }

  // когда нет точек маршрута
  #renderEmpty() {
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }
}
