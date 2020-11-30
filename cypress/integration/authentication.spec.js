const { decode } = require('jsonwebtoken');
const { replacePassword } = require('../utils/replace.password.util');

describe('Pruebas de aceptación para el flujo de autenticación', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData');
    cy.visit('/auth/login');
  });

  it('CP20 - Debería realizar el flujo de autenticación correctamente', () => {
    cy.wait(1000); // time for get dictionary

    cy.window()
      .its('store')
      .invoke('getState')
      .then((state) => {
        cy.get('@userData').then((userData) => {
          cy.getBySel('email').type(userData.email);
          cy.getBySel('password')
            .type(userData.password)
            .should('have.value', '');

          const { dictionary } = decode(state.authenticationReducer.dict_token);
          const password = replacePassword(dictionary, userData.password);

          for (let p of password) {
            cy.getBySel(`nk-btn-${p}`).click();
          }

          // cy.getBySel('password').should('have.value', password);

          cy.getBySel('btn-login').click();

          cy.wait(4000);

          cy.url().should('include', '/dashboard');
          cy.url().should('include', '/dashboard/home');

          cy.getBySel('item-make-inscription').click();
          cy.url().should('include', '/dashboard/inscription/create');

          cy.wait(15500); // test of id_token lifetime

          cy.getBySel('item-read-inscriptionme').click();
          cy.url().should('include', '/dashboard/inscription/readme');

          cy.wait(30500); // test of refresh_token lifetime, so, end session

          cy.getBySel('item-make-inscription').click();
          cy.url().should('include', '/auth/login');
          cy.get('.swal2-popup').should('be.visible');
        });
      });
  });
});
