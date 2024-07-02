describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
  });
});
describe('Beautiful Testing', () => {
  let uniqueEmail;
  let timestamp;
  let name = 'Raghav Agarwal';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    timestamp = Date.now();
    uniqueEmail = `newUser${timestamp}@example.com`;
  });

  it('allows a user to register', () => {
    cy.visit('/register');
    cy.viewport(1500, 1000);

    // Registering a new user and going to the dashboard
    cy.get('[data-testid="register-name"]').type(name);
    cy.get('[data-testid="register-email"]').type(uniqueEmail);
    cy.get('[data-testid="register-password"]').type(timestamp);
    cy.get('[data-testid="register-check-password"]').type(timestamp);
    cy.get('[data-testid="register-submit"]').click();

    cy.url().should('include', '/dashboard');

    cy.wait(5000);

    cy.get('[data-testid="logout-button"]').click();
  });
  afterEach(() => {
    // Make a request to delete the user after each test
    cy.request({
      method: 'DELETE',
      url: `http://localhost:5003/auth/delete-user/${uniqueEmail}`,
      failOnStatusCode: false, // Prevent Cypress from failing the test if the delete fails
    }).then((response) => {
      expect(response.status).to.eq(200); // Adjust this based on your API's response
    });
  });
});
