import { fetchWithToken } from '../helpers/request.helper';
import { types } from '../fixtures/types';
import Swal from 'sweetalert2';

export const startAveragesLoaded = () => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;
      const res = await fetchWithToken(
        'average',
        {},
        'GET',
        id_token,
        dispatch
      );
      const averages = await res.json();

      if (!averages.status) {
        dispatch(averagesLoaded(averages));
        dispatch(startSisbensLoaded());
      }
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
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;
      const res = await fetchWithToken('sisben', {}, 'GET', id_token, dispatch);
      const sisbens = await res.json();

      if (!sisbens.status) {
        dispatch(sisbensLoaded(sisbens));
        dispatch(startPopulationsLoaded());
      }
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
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;
      const res = await fetchWithToken(
        'population',
        {},
        'GET',
        id_token,
        dispatch
      );
      const populations = await res.json();

      if (!populations.status) dispatch(populationLoaded(populations));
    } catch (error) {
      console.log(error);
    }
  };
};

const populationLoaded = (populations) => ({
  type: types.inscriptionPopulationsLoaded,
  payload: populations,
});

export const startInscriptionCreate = (data) => {
  return async (dispatch, getState) => {
    try {
      const {
        user: { id },
        id_token,
      } = getState().authenticationReducer;

      data.userId = id;

      const res = await fetchWithToken(
        'inscription',
        data,
        'POST',
        id_token,
        dispatch
      );
      const inscription = await res.json();

      if (!inscription.status) {
        Swal.fire({
          title: 'Correctamente',
          text: 'Inscripción realizada',
          icon: 'success',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startInscriptionsRead = () => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;
      const res = await fetchWithToken(
        'inscription',
        {},
        'GET',
        id_token,
        dispatch
      );
      const inscriptions = await res.json();

      if (!inscriptions.status) dispatch(inscriptionsReaded(inscriptions));
    } catch (error) {
      console.log(error);
    }
  };
};

const inscriptionsReaded = (inscriptions) => ({
  type: types.inscriptionsReaded,
  payload: inscriptions,
});

export const startInscriptionsReadMe = () => {
  return async (dispatch, getState) => {
    try {
      const {
        user: { id },
        id_token,
      } = getState().authenticationReducer;

      const res = await fetchWithToken(
        `inscription/${id}`,
        {},
        'GET',
        id_token,
        dispatch
      );
      const inscriptions = await res.json();

      if (!inscriptions.status) dispatch(inscriptionsReaded(inscriptions));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startInscriptionAdmit = (inscriptionId) => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;
      const res = await fetchWithToken(
        `inscription/admit/${inscriptionId}`,
        { state: 1 },
        'PATCH',
        id_token,
        dispatch
      );
      const inscription = await res.json();

      if (!inscription.status) dispatch(inscriptionAdmitted(inscriptionId));
    } catch (error) {
      console.log(error);
    }
  };
};

const inscriptionAdmitted = (inscriptionId) => ({
  type: types.inscriptionAdmitted,
  payload: inscriptionId,
});

export const startIncriptionDelete = (inscriptionId) => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;
      const res = await fetchWithToken(
        `inscription/${inscriptionId}`,
        {},
        'DELETE',
        id_token,
        dispatch
      );
      const inscription = await res.json();

      if (!inscription.status) dispatch(inscriptionDeleted(inscriptionId));
    } catch (error) {
      console.log(error);
    }
  };
};

const inscriptionDeleted = (inscriptionId) => ({
  type: types.inscriptionDeleted,
  payload: inscriptionId,
});
