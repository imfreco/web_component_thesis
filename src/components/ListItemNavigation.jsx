import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AssignmentIndRounded,
  AssignmentRounded,
  BookmarkRounded,
  BookRounded,
  DashboardRounded,
  ExitToAppRounded,
} from '@material-ui/icons';

import { ItemNavigation } from './ItemNavigation';
import { isAuthorized } from '../helpers/authorization.helper';
import { startLogOut } from '../actions/authentication.action';
import Swal from 'sweetalert2';

export const ListItemNavigation = () => {
  const {
    user: { roles },
  } = useSelector((state) => state.authenticationReducer);

  const dispatch = useDispatch();

  return (
    <div>
      <ItemNavigation
        tag='Principal'
        path='/dashboard/home'
        IconComponent={DashboardRounded}
      />

      {isAuthorized(['estudiante'], roles) && (
        <ItemNavigation
          tag='Realizar Inscripción'
          path='/dashboard/inscription/create'
          IconComponent={AssignmentIndRounded}
        />
      )}

      {isAuthorized(['estudiante'], roles) && (
        <ItemNavigation
          tag='Mis Inscripciones'
          path='/dashboard/inscription/readme'
          IconComponent={AssignmentRounded}
        />
      )}

      {isAuthorized(['administrador'], roles) && (
        <ItemNavigation
          tag='Inscripciones'
          path='/dashboard/inscription/read'
          IconComponent={AssignmentRounded}
        />
      )}

      {isAuthorized(['nutricionista', 'administrador'], roles) && (
        <ItemNavigation
          tag='Registrar Componente'
          path='/dashboard/planning/component'
          IconComponent={BookmarkRounded}
        />
      )}

      {isAuthorized(['nutricionista', 'administrador'], roles) && (
        <ItemNavigation
          tag='Registrar Menú'
          path='/dashboard/planning/menu'
          IconComponent={BookRounded}
        />
      )}

      <ItemNavigation
        tag='Cerrar Sesión'
        path='/auth/login'
        onClick={async () => {
          const { value } = await Swal.fire({
            title: 'Responder',
            text: '¿Está seguro de finalizar su sesión?',
            showCancelButton: true,
            showConfirmButton: true,
          });
          if (value) dispatch(startLogOut());
        }}
        IconComponent={ExitToAppRounded}
      />
    </div>
  );
};
