class ForgotPasswordPage {

   clickForgotPasswordLink() {
        cy.contains('Forgot Your Password?').click()
    }

    inputUsername(username) {
        cy.get('input[name="username"]').clear().type(username)
    }

    clickReset() {
        cy.get('button[type="submit"]').click()
    }

    clickCancel() {
        cy.get('button[type="button"]').click()
    }

    getTitle() {
        return cy.get('h6.oxd-text--h6')
    }

    getSuccessMessage() {
        return cy.contains('A reset password link has been sent to you via email.')
    }

    getErrorMessage() {
        return cy.contains('Your reset password link was not sent due to an error.')
    }

    getRequiredMessage() {
        return cy.get('.oxd-input-field-error-message')
    }
}

export default new ForgotPasswordPage()