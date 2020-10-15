import React from 'react';
import {
  AssignmentIndRounded,
  AssignmentRounded,
  DashboardRounded,
  ExitToAppRounded,
} from '@material-ui/icons';

import { ItemNavigation } from './ItemNavigation';

export const ListItemNavigation = (
  <div>
    <ItemNavigation
      tag='Principal'
      path='/dashboard/home'
      IconComponent={DashboardRounded}
    />
    <ItemNavigation
      tag='Realizar Inscripción'
      path='/dashboard/inscription/create'
      IconComponent={AssignmentIndRounded}
    />
    <ItemNavigation
      tag='Mis Inscripciones'
      path='/dashboard/inscription/readme'
      IconComponent={AssignmentRounded}
    />
    <ItemNavigation
      tag='Inscripciones'
      path='/dashboard/inscription/read'
      IconComponent={AssignmentRounded}
    />
    <ItemNavigation
      tag='Cerrar Sesión'
      path=''
      IconComponent={ExitToAppRounded}
    />
  </div>
);
