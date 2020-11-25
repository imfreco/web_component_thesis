const { decode } = require('jsonwebtoken');
const { replacePassword } = require('../utils/replace.password.util');

describe('Pruebas de aceptación del requerimiento de autorización', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData');
    cy.visit('/auth/login');
  });

  it('CP - Debería realizar el flujo de autorización correctamente', () => {
    cy.wait(1000); // time for get dictionary

    cy.window()
      .its('store')
      .invoke('getState')
      .then((state) => {
        cy.get('@userData').then((userData) => {
          cy.getBySel('email').type(userData.email);
          cy.getBySel('password').type(userData.password);

          const { dictionary } = decode(state.authenticationReducer.dict_token);
          const password = replacePassword(dictionary, userData.password);

          for (let p of password) {
            cy.getBySel(`nk-btn-${p}`).click();
          }

          cy.getBySel('btn-login').click();

          cy.wait(4000);

          cy.url().should('include', '/dashboard');
          cy.url().should('include', '/dashboard/home');

          cy.wait(1000);

          // go to route not authorized
          cy.visit('/dashboard/inscription/read');
          cy.url().should('include', '/dashboard/home');

          cy.wait(1000);

          // go to authorized route
          cy.visit('/dashboard/inscription/readme');
          cy.url().should('include', '/dashboard/inscription/readme');

          cy.wait(1000);

          // go to route not authorized
          cy.visit('/dashboard/planning/component');
          cy.url().should('include', '/dashboard/home');
        });
      });
  });
});
