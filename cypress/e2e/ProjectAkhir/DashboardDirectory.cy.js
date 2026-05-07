import DirectoryPage from '../../pages/ProjectAkhir/DashboardDirectoryPage'
import LoginPage from '../../pages/ProjectAkhir/LoginPage'
import dataUser from '../../fixtures/dataUser.json'

describe('Final Project - Directory Page Feature', () => {

    beforeEach(() => {
        LoginPage.visit()
        LoginPage.login(dataUser.validUser.username, dataUser.validUser.password)
        cy.url().should('include', '/dashboard')
    })

    it('TC-019 - Menampilkan Halaman Directory', () => {
        cy.intercept('GET', '**/api/v2/directory/employees**').as('getDirectory')
        DirectoryPage.clickDirectoryMenu()
        cy.wait('@getDirectory').its('response.statusCode').should('eq', 200)
        DirectoryPage.getHeader().should('contain', 'Directory')
    })

    it('TC-020 - Validasi placeholder pada search input', () => {
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.getSearchInput().should('have.attr', 'placeholder', 'Type for hints...')
    })

    it('TC-021 - Validasi tombol reset', () => {
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.getResetButton().should('be.visible').and('be.enabled')
    })

    it('TC-022 - Search employee berhasil', () => {
        cy.intercept('GET', '**/api/v2/directory/employees**').as('searchEmployee')
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.searchEmployee('Ra')
        cy.wait('@searchEmployee').its('response.statusCode').should('eq', 200)
        DirectoryPage.getEmployeeList().should('exist')
    })

    it('TC-023 - Employee tidak ditemukan', () => {
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.getSearchInput().type('Hanula')
        cy.contains('No Records Found').should('exist')
    })

    it('TC-024 - Search by Job Title', () => {
        cy.intercept('GET', '**/api/v2/directory/employees**')
            .as('searchDirectory')
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.selectJobTitle('Software Engineer')
        DirectoryPage.getSearchButton().click()
        cy.wait('@searchDirectory')
        DirectoryPage.getEmployeeList().should('exist')
    })

    it('TC-025 - Search by Location', () => {
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.selectLocation('New York Sales Office')
        DirectoryPage.getSearchButton().click()
        DirectoryPage.getEmployeeList().should('exist')
    })

    it('TC-026 - Reset search', () => {
        cy.intercept('GET', '**/api/v2/directory/employees**').as('resetSearch')
        DirectoryPage.clickDirectoryMenu()
        DirectoryPage.searchEmployee('pet')
        DirectoryPage.getResetButton().click()
        cy.wait('@resetSearch').its('response.statusCode').should('eq', 200)
    })

})