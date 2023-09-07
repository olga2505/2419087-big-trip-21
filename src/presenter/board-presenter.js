import {RenderPosition, render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {EmptyText} from '../const.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  #sortComponent = new SortView();
  #pointsListContainer = new PointListView();
  #noPointComponent = new ListEmptyView({text: EmptyText.everthing});
  // коллекция презенткров
  #pointPresenters = new Map();

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

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // сюда приходит обновлённая точка
  #handlePointChange = (updatedPoint) => {
    // нужно обновить задачу в #points(все точки, копия задач из модели). Находим в массиве нужную задачу и обновляем. updateItem вернёт обновлённый массив
    this.#points = updateItem(this.#points, updatedPoint);
    // раз данные обновились, нужно заново инициализировать презентер точки. Находим презентер для обновлённой задачи (вызываем у коллекции метод get и пердаём ей ключ по которому хотим найти). Когда нашли презентер, вызываем метод init в который передаём обновлённые данные
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  // Отрисовка точек
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListContainer.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);

    // сохраняем экземпляр PointPresenter
    // set - метод коллекции, который позволяет хранить ключ/значение, передаются 2 значения (ключ, само значение) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  // Отрисовка всех точек
  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    // clear - встроенный метод Map
    this.#pointPresenters.clear();
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
