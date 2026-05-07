class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  inputUsername(username) {
    cy.get('input[name="username"]').clear().type(username)
  }

  inputPassword(password) {
    cy.get('input[name="password"]').clear().type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  getErrorMessage() {
    return cy.get('.oxd-alert-content-text')
  }

  getRequiredFieldMessage() {
    return cy.get('.oxd-input-field-error-message')
  }

  getDashboardHeader() {
    return cy.get('.oxd-topbar-header-title')
  }

  getPasswordField() {
    return cy.get('input[name="password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }
}

export default new LoginPage()