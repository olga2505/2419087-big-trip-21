import {RenderPosition, render, replace} from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {EmptyText} from '../const.js';
// import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
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
    // const pointPresenter = new PointPresenter({
    //   pointListContainer: this.#eventListComponent.element
    // });
    // pointPresenter.init(point);
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      pointDestinations: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: () => {
        replaceFormToPoint();
      },
      onFormReset: () => {
        replaceFormToPoint();
      }
    });

    function replacePointToForm () {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint () {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
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
    render(this.#eventListComponent, this.#container);

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
