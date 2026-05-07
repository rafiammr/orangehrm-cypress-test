import LoginPage from '../../pages/ProjectAkhir/LoginPage'
import dataUser from '../../fixtures/dataUser.json'

describe('Final Project - Login Feature', () => {

    beforeEach(() => {
        LoginPage.visit()
    })

    it('TC-001 - Login valid', () => {
        cy.intercept('POST', '**/auth/validate').as('loginRequest')

        LoginPage.login(dataUser.validUser.username, dataUser.validUser.password)

        cy.wait('@loginRequest').its('response.statusCode')
            .should('be.oneOf', [200, 302])

        LoginPage.getDashboardHeader()
            .should('contain', 'Dashboard')
    })

    it('TC-002 - Username invalid', () => {
        cy.intercept('POST', '**/auth/validate').as('failedLogin')

        LoginPage.login(dataUser.invalidUser.username, dataUser.validUser.password)

        cy.wait('@failedLogin')

        LoginPage.getErrorMessage()
    })

    it('TC-003 - Password invalid', () => {
        cy.intercept('POST', '**/auth/validate').as('failedLogin')

        LoginPage.login(dataUser.validUser.username, dataUser.invalidUser.password)

        cy.wait('@failedLogin')

        LoginPage.getErrorMessage()
    })

    it('TC-004 - Username & Password invalid', () => {
        cy.intercept('POST', '**/auth/validate').as('failedLogin')

        LoginPage.login(dataUser.invalidUser.username, dataUser.invalidUser.password)

        cy.wait('@failedLogin')

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-005 - Tanpa input', () => {
        LoginPage.clickLogin()

        LoginPage.getRequiredFieldMessage()
        .should('contain', 'Required')
    })

    it('TC-006 - Tanpa username', () => {
        LoginPage.inputPassword(dataUser.validUser.password)
        LoginPage.clickLogin()

        LoginPage.getRequiredFieldMessage()
        .should('contain', 'Required')
    })

    it('TC-007 - Tanpa password', () => {
        LoginPage.inputUsername(dataUser.validUser.username)
        LoginPage.clickLogin()

        LoginPage.getRequiredFieldMessage()
        .should('contain', 'Required')
    })

    it('TC-008 - Username ada spasi', () => {
        LoginPage.login(dataUser.usernameWithSpace.username, dataUser.validUser.password)

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-009 - Password ada spasi', () => {
        LoginPage.login(dataUser.validUser.username, dataUser.passwordWithSpace.password)

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-010 - Username spasi awal/akhir', () => {
        LoginPage.login(dataUser.usernameWithLeadingTrailingSpace.username, dataUser.validUser.password)

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-011 - Case sensitive password', () => {
        cy.intercept('POST', '**/auth/validate').as('caseCheck')
        
        LoginPage.login(dataUser.validUser.username, dataUser.caseSensitivePassword.password)

        cy.wait('@caseCheck')

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-012 - Password hidden', () => {
        LoginPage.getPasswordField()
        .should('have.attr', 'type', 'password')
    })

    it('TC-013 - Tombol login aktif', () => {
        LoginPage.getLoginButton()
        .should('be.visible')
        .and('not.be.disabled')
    })
})