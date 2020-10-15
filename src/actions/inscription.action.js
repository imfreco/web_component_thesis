import { fetchWithoutToken } from '../helpers/request.helper';
import { types } from '../fixtures/types';
import Swal from 'sweetalert2';

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

export const startInscriptionCreate = (data) => {
  return async (dispatch) => {
    try {
      data.userId = 1;
      // TODO: refactorizar cuando se implemente la autenticación
      const res = await fetchWithoutToken('inscription', data, 'POST');
      const inscription = await res.json();

      if (inscription.status) {
        Swal.fire({ title: 'Error', text: inscription.message, icon: 'error' });
      } else {
        Swal.fire({
          title: 'Correctamente',
          text: 'Inscription realizada',
          icon: 'success',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startInscriptionsRead = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('inscription');
      const inscriptions = await res.json();

      if (inscriptions.status) {
        Swal.fire({
          title: 'Error',
          text: inscriptions.message,
          icon: 'error',
        });
      } else {
        dispatch(inscriptionsReaded(inscriptions));
      }
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
  return async (dispatch) => {
    try {
      const userId = 1;
      // TODO: refactorizar cuando se implemente la autenticación
      const res = await fetchWithoutToken(`inscription/${userId}`);
      const inscriptions = await res.json();

      if (inscriptions.status) {
        Swal.fire({
          title: 'Error',
          text: inscriptions.message,
          icon: 'error',
        });
      } else {
        dispatch(inscriptionsReaded(inscriptions));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startInscriptionAdmit = (inscriptionId) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken(
        `inscription/admit/${inscriptionId}`,
        { state: 1 },
        'PATCH'
      );
      const inscription = await res.json();

      if (inscription.status) {
        Swal.fire({
          title: 'Error',
          text: inscription.message,
          icon: 'error',
        });
      } else {
        dispatch(inscriptionAdmitted(inscriptionId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const inscriptionAdmitted = (inscriptionId) => ({
  type: types.inscriptionAdmitted,
  payload: inscriptionId,
});
