describe('OrangeHRM Login Feature with Intercept', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    beforeEach(() => {
        cy.visit(baseUrl)
    })

    it('TC-001 - Login valid', () => {
        cy.intercept('POST', '**/auth/validate').as('loginRequest')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@loginRequest').its('response.statusCode')
          .should('be.oneOf', [200, 302])
        
        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
    })    

    it('TC-002 - Login dengan username salah', () => {
        cy.intercept('POST', '**/auth/validate').as('failedLogin')
    
        cy.get('input[name="username"]').type('SalahUser')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@failedLogin')

        cy.get('.oxd-alert-content-text')
          .should('be.visible')
          .and('contain', 'Invalid credentials')
    })

    it('TC-003 - Login valid cek dashboard API', () => {
        cy.intercept('GET', '**/dashboard/**').as('dashboard')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@dashboard')

        cy.get('.oxd-topbar-header-title')
          .should('contain', 'Dashboard')
    })


    it('TC-004 - Login tanpa password', () => {
        cy.intercept('POST', '**/auth/validate').as('loginAttempt')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    })

    it('TC-005 - Password case sensitive', () => {
        cy.intercept('POST', '**/auth/validate').as('caseCheck')

        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('ADMIN123')
        cy.get('button[type="submit"]').click()

        cy.wait('@caseCheck')

        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials')
    })
})