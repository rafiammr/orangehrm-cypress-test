import LoginPage from '../../pages/LoginPage'
import dataUser from '../../fixtures/dataUser.json'

describe('OrangeHRM Login Feature - POM', () => {

    beforeEach(() => {
        LoginPage.visit()
    })

    it('TC-001 - Login valid', () => {
        LoginPage.inputUsername(dataUser.validUser.username)
        LoginPage.inputPassword(dataUser.validUser.password)
        LoginPage.clickLogin()

        cy.url().should('include', '/dashboard')
        LoginPage.getDashboardHeader().should('contain', 'Dashboard')
    })

    it('TC-002 - Username salah', () => {
        LoginPage.inputUsername(dataUser.invalidUser.username)
        LoginPage.inputPassword(dataUser.validUser.password)
        LoginPage.clickLogin()

        LoginPage.getErrorMessage()
        .should('be.visible')
        .and('contain', 'Invalid credentials')
    })

    it('TC-003 - Password salah', () => {
        LoginPage.inputUsername(dataUser.validUser.username)
        LoginPage.inputPassword(dataUser.invalidUser.password)
        LoginPage.clickLogin()

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-004 - Username & Password salah', () => {
        LoginPage.inputUsername(dataUser.invalidUser.username)
        LoginPage.inputPassword(dataUser.invalidUser.password)
        LoginPage.clickLogin()

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
        LoginPage.inputUsername(dataUser.usernameWithSpace.username)
        LoginPage.inputPassword(dataUser.validUser.password)
        LoginPage.clickLogin()

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-009 - Password ada spasi', () => {
        LoginPage.inputUsername(dataUser.validUser.username)
        LoginPage.inputPassword(dataUser.passwordWithSpace.password)
        LoginPage.clickLogin()

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-010 - Username spasi awal/akhir', () => {
        LoginPage.inputUsername(dataUser.usernameWithLeadingTrailingSpace.username)
        LoginPage.inputPassword(dataUser.validUser.password)
        LoginPage.clickLogin()

        LoginPage.getErrorMessage()
        .should('contain', 'Invalid credentials')
    })

    it('TC-011 - Case sensitive password', () => {
        LoginPage.inputUsername(dataUser.validUser.username)
        LoginPage.inputPassword(dataUser.caseSensitivePassword.password)
        LoginPage.clickLogin()

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