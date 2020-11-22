import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStock from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { ListItemNavigation } from '../../../components/ListItemNavigation';

const middlewares = [thunk];
const mockStore = configureStock(middlewares);

describe('Pruebas de integración en el menu lateral', () => {
  test('CP - Debería ...', () => {
    const initState1 = {
      authenticationReducer: { user: { roles: [] } },
    };
    const store1 = mockStore(initState1);

    const wrapper1 = mount(
      <Provider store={store1}>
        <Router>
          <ListItemNavigation />
        </Router>
      </Provider>
    );

    // existen 2 items que no requiren privilegios, la vista principal y el cierre de sesión
    expect(wrapper1.find('ItemNavigation')).toHaveLength(2);

    const initState2 = {
      authenticationReducer: {
        user: { roles: ['estudiante'] },
      },
    };
    const store2 = mockStore(initState2);

    const wrapper2 = mount(
      <Provider store={store2}>
        <Router>
          <ListItemNavigation />
        </Router>
      </Provider>
    );

    // el rol estudiante tiene acceso a dos items, a demás de los dos sin privilegios
    expect(wrapper2.find('ItemNavigation')).toHaveLength(4);
  });
});
