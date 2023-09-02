import {render, replace} from '../framework/render.js';
// import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {EMPTY_TEXT} from '../const.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...pointsModel.get()];
  }

  init() {
    if (this.#points.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderBoard();
  }

  // Отрисовка точек
  #renderPoint(point) {
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

  // Отрисовка фильтра, соритровки
  #renderBoard() {
    this.#eventListComponent = new EventListView();

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  // когда нет точек маршрута
  #renderEmpty() {
    render(new ListEmptyView({
      text: EMPTY_TEXT.everthing
    }), this.#container);
  }
}
