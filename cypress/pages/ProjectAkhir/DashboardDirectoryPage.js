class DashboardDirectoryPage {

    visitDashboard() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    }

    clickDirectoryMenu() {
        cy.contains('Directory').click()
    }

    getHeader() {
        return cy.get('.oxd-topbar-header-title')
    }

    getSearchInput() {
        return cy.get('input[placeholder="Type for hints..."]')
    }

    getAutoCompleteList() {
        return cy.get('.oxd-autocomplete-option')
    }

    getJobTitleFilter() {
        return cy.get('.oxd-select-text').eq(0)
    }

    getLocationFilter() {
        return cy.get('.oxd-select-text').eq(1)
    }

    getDropdownOptions() {
        return cy.get('.oxd-select-option')
    }

    getSearchButton() {
        return cy.get('button[type="submit"]')
    }

    getResetButton() {
        return cy.get('button[type="reset"]')
    }

    getEmployeeList() {
        return cy.get('.oxd-grid-item')
    }

    selectJobTitle(jobTitle) {
        this.getJobTitleFilter().click()
        this.getDropdownOptions()
            .contains(jobTitle)
            .click()
    }

    selectLocation(location) {
        this.getLocationFilter().click()
        this.getDropdownOptions()
            .contains(location)
            .click()
    }

    searchEmployee(name) {
        this.getSearchInput().type(name)
        this.getAutoCompleteList()
            .should('not.contain.text', 'Searching...')

        this.getAutoCompleteList()
            .first()
            .click()
        this.getSearchButton().click()
    }
}

export default new DashboardDirectoryPage()