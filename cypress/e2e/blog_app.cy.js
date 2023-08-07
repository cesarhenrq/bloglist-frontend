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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('test', 'test');
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();

      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('test url');
      cy.get('#create-blog-button').click();

      cy.get('.success')
        .should('be.visible')
        .and('contain', 'A new blog test title by test author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)');

      cy.contains('test title test author');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'test title',
          author: 'test author',
          url: 'test url',
        };
        cy.createBlog(blog);
      });

      it('it can be liked', function () {
        cy.contains('test title test author').parent().as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').contains('like').click();
        cy.get('@blog').contains('1');
      });

      it('it can be deleted by the user who created it', function () {
        cy.contains('test title test author').parent().as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').contains('remove').click();
        cy.get('html').should('not.contain', 'test title test author');
      });

      it('it cannot be deleted by another user', function () {
        cy.createUser({
          username: 'another',
          name: 'another',
          password: 'another',
        });
        cy.login('another', 'another');

        cy.contains('test title test author').parent().as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').should('not.contain', 'remove');
      });

      it('blogs are ordered according to likes', function () {
        cy.createBlog({
          title: 'test title 2',
          author: 'test author 2',
          url: 'test url 2',
        });

        cy.get('.blog-post').eq(0).contains('view').click();
        cy.get('.blog-post').eq(1).contains('view').click();

        cy.get('.blog-post').eq(0).contains('like').click();
        cy.get('.blog-post').eq(0).contains('1');

        cy.get('.blog-post').eq(1).contains('like').click();
        cy.get('.blog-post').eq(1).contains('1');
        cy.get('.blog-post').eq(1).contains('like').click();
        cy.get('.blog-post').eq(1).contains('2');

        cy.get('.blog-post')
          .eq(0)
          .should('contain', 'test title 2 test author 2');
        cy.get('.blog-post').eq(1).should('contain', 'test title test author');
      });
    });
  });
});
