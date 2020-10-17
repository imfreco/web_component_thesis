import Swal from 'sweetalert2';
import { types } from '../fixtures/types';
import { fetchWithoutToken } from '../helpers/request.helper';

export const startComponentCreate = (data, reset) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken(`component`, data, 'POST');
      const component = await res.json();

      if (component.status) {
        Swal.fire({
          title: 'Error',
          text: component.message,
          icon: 'error',
        });
      } else {
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
