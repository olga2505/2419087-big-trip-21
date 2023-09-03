import {render, RenderPosition} from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';

import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterWrapper = bodyElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main');
const sortWrapper = mainElement.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);


const boardPresenter = new BoardPresenter({
  container: sortWrapper,
  destinationsModel,
  offersModel,
  pointsModel,
});


const filters = generateFilter(pointsModel.points);

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), filterWrapper);

boardPresenter.init();
