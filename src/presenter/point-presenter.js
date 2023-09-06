import {render, replace} from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import EventListView from '../view/event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {SortType} from '../const';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  // #destinationsModel = null;
  // #offersModel = null;

  constructor({pointsListContainer}) {
    this.#pointsListContainer = pointsListContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      // pointDestinations: this.#destinationsModel.getById(point.destination),
      // pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#handleEditClick,
    });

    this.#pointEditComponent = new PointEditView({
      // pointDestinations: this.#destinationsModel.get(),
      // pointOffers: this.#offersModel.get(),
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#handleFormReset,
    });

    render(this.#pointComponent, this.#pointsListContainer);
  }

  #replacePointToForm () {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint () {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleFormReset = () => {
    this.#replaceFormToPoint();
  };
}

// import {render, replace} from '../framework/render.js';
// import PointView from '../view/point-view.js';
// import PointEditView from '../view/point-edit-view.js';
// import EventListView from '../view/event-list-view.js';
// import ListEmptyView from '../view/list-empty-view.js';
// import {SortType} from '../const';

// export default class PointPresenter {
//   #pointsListComponent = new EventListView();

//   #destinationsModel = null;
//   #offersModel = null;
//   #pointsModel = null;

//   #sortComponent = null;
//   #noPointsComponent = new ListEmptyView();
//   #currentSortType = SortType.DAY;
//   #sourcedPoints = [];
//   #points = [];
//   #pointComponent = null;
//   #pointEditComponent = null;

//   constructor(pointsModel, offersModel, destinationsModel) {
//     this.#pointsModel = pointsModel;
//     this.#offersModel = offersModel;
//     this.#destinationsModel = destinationsModel;
//     // this.#pointListContainer = pointListContainer;
//     // this.#destinationsModel = destinationsModel;
//     // this.#offersModel = offersModel;
//     // this.#pointsModel = pointsModel;
//   }

//   init() {
//     this.#points = [...this.#pointsModel.points];
//     this.offers = [...this.#offersModel.offers];
//     this.destinations = [...this.#destinationsModel.destinations];

//     this.#sourcedPoints = [...this.#pointsModel.points];
//     this.#renderPointsList();

//     this.#pointComponent = new PointView({
//       point,
//       pointDestinations: this.#destinationsModel.getById(point.destination),
//       pointOffers: this.#offersModel.getByType(point.type),
//       onEditClick: this.#handleEditClick,
//     });

//     this.#pointEditComponent = new PointEditView({
//       pointDestinations: this.#destinationsModel.get(),
//       pointOffers: this.#offersModel.get(),
//       onFormSubmit: this.#handleFormSubmit,
//       onFormReset: this.#handleFormReset,
//     });

//     // render(this.#pointComponent, this.#pointEditComponent);
//   }

//   #renderSort() {
//     this.#sortComponent = new SortView({
//       // onSortChange: this.#onSortChange
//     });
//     render(this.#sortComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
//   }

//   #renderPointsList() {
//     render(this.#pointsListComponent, tripEvents);

//     if (this.#points.length === 0) {
//       this.#renderNoPoints();
//       return;
//     }

//     this.#renderSort();
//     this.#renderPoints();
//   }

//   #renderPoints() {
//     this.#points.forEach((point) => {

//       const offersByType = this.#offersModel.getByType(point.type) ?? OFFER_EMPTY;
//       const destination = this.#destinationsModel.getById(point.destination);

//       this.#renderPoint(point, offersByType, destination);
//     });
//   }

//   #renderPoint(point, offersByType, destination) {

//     const pointPresenter = new PointPresenter(
//       {
//         containerPoints: this.#pointsListComponent.element,
//         // onDataChange: this.#onPointChange,
//         // onModeChange: this.#onModeChange
//       }
//     );

//     pointPresenter.init(
//       {
//         point,
//         offersByType,
//         destination,
//         allOffers: this.offers,
//         allDestinations: this.destinations
//       }
//     );
//     // this.#pointPresenters.set(point.id, pointPresenter);
//   }

//   #renderNoPoints() {
//     render(this.#noPointsComponent, this.#pointsListComponent.element);
//   }

//   #replacePointToForm () {
//     replace(this.#pointEditComponent, this.#pointComponent);
//     document.addEventListener('keydown', this.#escKeyDownHandler);
//   }

//   #replaceFormToPoint () {
//     replace(this.#pointComponent, this.#pointEditComponent);
//     document.removeEventListener('keydown', this.#escKeyDownHandler);
//   }

//   #escKeyDownHandler = (evt) => {
//     if (evt.key === 'Escape') {
//       evt.preventDefault();
//       this.#replaceFormToPoint();
//     }
//   };

//   #handleEditClick = () => {
//     this.#replacePointToForm();
//   };

//   #handleFormSubmit = () => {
//     this.#replaceFormToPoint();
//   };

//   #handleFormReset = () => {
//     this.#replaceFormToPoint();
//   };
// }
