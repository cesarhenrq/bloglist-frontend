describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });

  it('Login form is shown by default', function () {
    cy.get('.login-form-container')
      .should('be.visible')
      .and('contain', 'Login to application')
      .and('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login');

    cy.get('.login-form').should('be.visible');
    cy.get('.login-form-container').find('input').should('have.length', 2);

    cy.get('.login-form-container').find('button').should('have.length', 1);
  });
});
