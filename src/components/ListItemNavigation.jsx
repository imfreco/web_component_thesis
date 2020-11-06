import React from 'react';
import { useSelector } from 'react-redux';

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

export const ListItemNavigation = () => {
  const {
    user: { roles },
  } = useSelector((state) => state.authenticationReducer);

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
        path=''
        IconComponent={ExitToAppRounded}
      />
    </div>
  );
};
