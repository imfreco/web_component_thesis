import Swal from 'sweetalert2';
import { types } from '../fixtures/types';
import { fetchWithToken } from '../helpers/request.helper';

export const startComponentCreate = (data, reset) => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;

      const res = await fetchWithToken(
        `component`,
        data,
        'POST',
        id_token,
        dispatch
      );
      const component = await res.json();

      if (!component.status) {
        dispatch(componentCreated(component));
        reset();
        Swal.fire('Correctamente', 'Componente registrado', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const componentCreated = (component) => ({
  type: types.planningComponentCreated,
  payload: component,
});

export const startComponentsRead = () => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;

      const res = await fetchWithToken(
        `component`,
        {},
        'GET',
        id_token,
        dispatch
      );
      const components = await res.json();

      if (!components.status) dispatch(componentsReaded(components));
    } catch (error) {
      console.log(error);
    }
  };
};

const componentsReaded = (components) => ({
  type: types.planningComponentsReaded,
  payload: components,
});

export const menuDetailAdded = (detail) => ({
  type: types.planningMenuDetailAdded,
  payload: detail,
});

export const menuDetailDeleted = (componentId) => ({
  type: types.planningMenuDetailDeleted,
  payload: componentId,
});

export const startMenuCreate = (data, reset) => {
  return async (dispatch, getState) => {
    try {
      const { id_token } = getState().authenticationReducer;

      const res = await fetchWithToken(
        `menu`,
        data,
        'POST',
        id_token,
        dispatch
      );
      const menu = await res.json();

      if (!menu.status) {
        if (menu.errors) {
          Swal.fire({
            title: 'Error',
            text: 'La fecha seleccionada ya cuenta con un menú registrado',
            icon: 'error',
          });
        } else {
          reset();
          dispatch(menuDetailsReseted());
          Swal.fire('Correctamente', 'Menu registrado', 'success');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const menuDetailsReseted = () => ({
  type: types.planningMenuDetailsReseted,
});
