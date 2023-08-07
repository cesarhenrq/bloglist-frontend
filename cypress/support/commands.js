Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('user', JSON.stringify(response.body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });

  cy.visit('http://localhost:3000');
});