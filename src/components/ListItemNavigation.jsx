import React from 'react';
import {
  AssignmentIndRounded,
  AssignmentLateRounded,
  AssignmentRounded,
  AssignmentTurnedInRounded,
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
      tag='Cancelar Inscripción'
      path='/dashboard/inscription/delete'
      IconComponent={AssignmentLateRounded}
    />
    <ItemNavigation
      tag='Inscripciones'
      path='/dashboard/inscription/read'
      IconComponent={AssignmentRounded}
    />
    <ItemNavigation
      tag='Admitir Plaza'
      path='/dashboard/inscription/accept'
      IconComponent={AssignmentTurnedInRounded}
    />
    <ItemNavigation
      tag='Cerrar Sesión'
      path=''
      IconComponent={ExitToAppRounded}
    />
  </div>
);
