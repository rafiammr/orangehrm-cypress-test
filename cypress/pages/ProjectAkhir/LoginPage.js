class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  inputUsername(username) {
    this.getUsernameField().clear().type(username)
  }

  inputPassword(password) {
    this.getPasswordField().clear().type(password)
  }

  clickLogin() {
    this.getLoginButton().click()
  }
  
  login(username, password) {
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }

  getErrorMessage() {
    return cy.contains('.oxd-alert-content-text', 'Invalid credentials')
  }

  getRequiredFieldMessage() {
    return cy.contains('.oxd-input-field-error-message', 'Required')
  }

  getDashboardHeader() {
    return cy.contains('.oxd-topbar-header-title', 'Dashboard')
  }

  getUsernameField() {
    return cy.get('input[name="username"]')
  }

  getPasswordField() {
    return cy.get('input[name="password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }
}

export default new LoginPage()