describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
  });
});
describe('Beautiful Testing', () => {
  let uniqueEmail;

  beforeEach(() => {
    const timestamp = Date.now();
    uniqueEmail = `newUser${timestamp}@example.com`;
  });

  it('allows a user to register', () => {
    cy.visit('/login');
    cy.viewport(1500, 1000);
    cy.get('[data-testid="forgot-password-button"]').click();
  });
});
