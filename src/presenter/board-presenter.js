import {RenderPosition, render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {EmptyText, SortType, enableSortType} from '../const.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortPointsDate, sortPointsTime, sortPointsPrice} from '../utils/points.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  #sortComponent = null;
  #pointsListContainer = new PointListView();
  #noPointComponent = new ListEmptyView({text: EmptyText.everthing});
  // коллекция презенторов (в Map ключом может быть не только число, в отличии от объекта)
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  // Если нужно сохранить исходный массив
  // копия всех точек в изначальном порядке
  // #sourcedBoardPoints = [];

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

    // Если нужно сохранить исходный массив
    // // 1. В отличии от сортировки по любому параметру,
    // // исходный порядок можно сохранить только одним способом -
    // // сохранив исходный массив:
    // this.#sourcedBoardPoints = [...this.#pointsModel.points];
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

    // Созданный презентор помещаем в коллекцию:
    // set - метод коллекции, который позволяет хранить ключ/значение, передаются 2 значения (ключ, само значение) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  // Отрисовка всех точек
  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве points
    switch (sortType) {
      case SortType.TIME:
        // sort встроенный метод массива, нужно передать функцию-компаратор (compare), которая выполняет сортировку. Мутирует исходный массив
        this.#points.sort(sortPointsTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsPrice);
        break;
      case SortType.DAY:
        this.#points.sort(sortPointsDate);
        break;
      case SortType.EVENT:
        break;
      case SortType.OFFERS:
        break;

        // Если нужно сохранить исходный массив
        // // 3. А когда пользователь захочет "вернуть всё, как было",
        // // мы просто запишем в points исходный массив
        // this.#points = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // сюда приходит обновлённая точка
  #handlePointChange = (updatedPoint) => {
    // нужно обновить точку в #points(все точки, копия задач из модели). Находим в массиве нужную задачу и обновляем. updateItem вернёт обновлённый массив
    this.#points = updateItem(this.#points, updatedPoint);
    // // Обновляем сохранённый массив (с исходной последовательностью)
    // this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);

    // раз данные обновились, нужно заново инициализировать презентер точки. Находим презентер для обновлённой задачи (вызываем у коллекции метод get и пердаём ей ключ по которому хотим найти). Когда нашли презентер, вызываем метод init в который передаём обновлённые данные
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortTypeChangeHandle = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    // - Сортируем задачи
    this.#sortPoints(sortType);
    // - Очищаем список
    this.#clearPoints();
    // - Рендерим список заново
    this.#renderPoints();
  };

  // Отрисовка соритровки
  #renderSort() {
    const sortTypes = Object.values(SortType)
      // для каждого типа сортировки формирует объект
      .map((type) => ({
        type,
        isChecked: (type === this.#currentSortType),
        isDisabled: !enableSortType[type]
      }));

    this.#sortComponent = new SortView({
      items: sortTypes,
      onSortTypeChange: this.#sortTypeChangeHandle,
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  // когда нет точек маршрута
  #renderEmpty() {
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    // clear - встроенный метод Map
    this.#pointPresenters.clear();
  }

  // Обёртка точек ul
  #renderPointContainer() {
    render(this.#pointsListContainer, this.#container);
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints();
  }
}
