import {RenderPosition, render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {EmptyText, SortType} from '../const.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortPointTime, sortPointPrice} from '../utils/points.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  #sortComponent = null;
  #pointsListContainer = new PointListView();
  #noPointComponent = new ListEmptyView({text: EmptyText.everthing});
  // коллекция презенторов
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  // копия всех точек в изначальном порядке
  #sourcedBoardPoints = [];

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
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this.#sourcedBoardPoints = [...this.#pointsModel.points];
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // сюда приходит обновлённая точка
  #handlePointChange = (updatedPoint) => {
    // нужно обновить точку в #points(все точки, копия задач из модели). Находим в массиве нужную задачу и обновляем. updateItem вернёт обновлённый массив
    this.#points = updateItem(this.#points, updatedPoint);
    // Обновляем сохранённый массив (с исходной последовательностью)
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);

    // раз данные обновились, нужно заново инициализировать презентер точки. Находим презентер для обновлённой задачи (вызываем у коллекции метод get и пердаём ей ключ по которому хотим найти). Когда нашли презентер, вызываем метод init в который передаём обновлённые данные
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoint(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве points
    switch (sortType) {
      case SortType.TIME:
        // sort встроенный метод массива, нужно передать функцию-компаратор (compare), которая выполняет сортировку. Мутирует исходный массив
        this.#points.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в points исходный массив
        this.#points = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // - Сортируем задачи
    this.#sortPoint(sortType);

    // - Очищаем список
    this.#clearTaskList();
    // - Рендерим список заново
    this.#renderPoints();
  };

  // Отрисовка соритровки
  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

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

  // когда нет точек маршрута
  #renderEmpty() {
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    // clear - встроенный метод Map
    this.#pointPresenters.clear();
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
}
