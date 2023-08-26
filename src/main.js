import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('header');

const tripInfoElement = headerElement.querySelector('.trip-main');

const mainElement = bodyElement.querySelector('.page-main');
const filterWrapper = bodyElement.querySelector('.trip-controls__filters');
const sortWrapper = mainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  boardContainer: sortWrapper
});

render(new TripInfoView(), tripInfoElement,'afterbegin');
render(new FiltersView(), filterWrapper);

boardPresenter.init();
