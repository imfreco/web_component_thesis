import { fetchWithoutToken } from '../helpers/request.helper';
import { types } from '../fixtures/types';

export const startAveragesLoaded = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('average');
      const averages = await res.json();

      dispatch(averagesLoaded(averages));
    } catch (error) {
      console.log(error);
    }
  };
};

const averagesLoaded = (averages) => ({
  type: types.inscriptionAveragesLoaded,
  payload: averages,
});

export const startSisbensLoaded = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('sisben');
      const sisbens = await res.json();

      dispatch(sisbensLoaded(sisbens));
    } catch (error) {
      console.log(error);
    }
  };
};

const sisbensLoaded = (sisbens) => ({
  type: types.inscriptionSisbensLoaded,
  payload: sisbens,
});

export const startPopulationsLoaded = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('population');
      const populations = await res.json();

      dispatch(populationLoaded(populations));
    } catch (error) {
      console.log(error);
    }
  };
};

const populationLoaded = (populations) => ({
  type: types.inscriptionPopulationsLoaded,
  payload: populations,
});
