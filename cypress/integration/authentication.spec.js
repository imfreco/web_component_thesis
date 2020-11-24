const { decode } = require('jsonwebtoken');
const { replacePassword } = require('../utils/replace.password.util');

describe('Pruebas de aceptación del requerimiento de autenticación', () => {
  it('CP - Debería ...', () => {
    cy.visit('/');

    cy.getBySel('email').type('frcortes@education.co');
    cy.getBySel('password').type('FRED20').should('have.value', '');

    cy.window()
      .its('store')
      .invoke('getState')
      .then((state) => {
        const passwordOriginal = 'FRED20';
        const dict_token = state.authenticationReducer.dict_token;
        const { dictionary } = decode(dict_token);
        const password = replacePassword(dictionary, passwordOriginal);

        for (let p of password) {
          cy.getBySel(`nk-btn-${p}`).click();
        }

        // cy.getBySel('password').should('have.value', password);

        cy.getBySel('btn-login').click();

        cy.url().should('include', '/dashboard');
        cy.url().should('include', '/dashboard/home');
      });
  });
});
