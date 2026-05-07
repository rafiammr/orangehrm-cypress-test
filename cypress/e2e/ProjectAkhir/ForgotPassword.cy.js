import ForgotPasswordPage from '../../pages/ProjectAkhir/ForgotPasswordPage'
import LoginPage from '../../pages/ProjectAkhir/LoginPage'
import dataUser from '../../fixtures/dataUser.json'

describe('Final Project -Forgot Password Feature', () => {

    beforeEach(() => {
        LoginPage.visit()

        ForgotPasswordPage.clickForgotPasswordLink()
    })

    it('TC-014 - Halaman forgot password tampil', () => {
        ForgotPasswordPage.getTitle()
            .should('contain', 'Reset Password')
    })

    it('TC-015 - Input username valid', () => {
        cy.intercept('POST', '/web/index.php/auth/requestResetPassword').as('resetRequest')

        ForgotPasswordPage.inputUsername('Hanula')
        ForgotPasswordPage.clickReset()

        cy.wait('@resetRequest').its('response.statusCode').should('eq', 302)

        cy.url().should('include', '/auth/sendPasswordReset')

        ForgotPasswordPage.getSuccessMessage()
            .should('be.visible')
    })

    it('TC-016 - Input username tidak terdaftar', () => {
        cy.intercept('POST', '**/auth/requestResetPassword').as('resetRequest')

        ForgotPasswordPage.inputUsername('Admin')
        ForgotPasswordPage.clickReset()

        cy.wait('@resetRequest').its('response.statusCode').should('eq', 302)

        cy.url().should('include', '/auth/sendPasswordReset')

        ForgotPasswordPage.getErrorMessage()
            .should('be.visible')
    })

    it('TC-017 - Tanpa input username', () => {
        ForgotPasswordPage.clickReset()

        ForgotPasswordPage.getRequiredMessage()
            .should('contain', 'Required')
    })

    it('TC-018 - Klik tombol cancel', () => {
        cy.intercept('GET', '**/auth/login').as('backToLogin')

        ForgotPasswordPage.clickCancel()

        cy.wait('@backToLogin')

        cy.url().should('include', '/auth/login')
    })
})