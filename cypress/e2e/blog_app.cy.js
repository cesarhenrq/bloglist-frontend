describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.createUser({ username: 'test', name: 'test', password: 'test' });
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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-button').click();

      cy.contains('test logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('be.visible')
        .and('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
