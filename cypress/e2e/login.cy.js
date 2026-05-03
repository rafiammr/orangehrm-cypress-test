describe('OrangeHRM Login Feature', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('TC-001 - Login valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
  })

  it('TC-002 - Login dengan username salah', () => {
    cy.get('input[name="username"]').type('SalahUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-003 - Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC-004 - Login dengan username dan password salah', () => {
    cy.get('input[name="username"]').type('SalahUser')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials')
  })

  it('TC-005 - Login tanpa username dan password', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC-006 - Login tanpa username', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC-007 - Login tanpa password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')
  })

  it('TC-008 - Login dengan username mengandung spasi', () => {
    cy.get('input[name="username"]').type('Ad min ')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-009 - Login dengan password mengandung spasi', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type(' admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-010 - Login dengan username mengandung spasi diawal/akhir', () => {
    cy.get('input[name="username"]').type(' Admin ')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-011 - Login dengan password huruf besar/kecil tidak sesuai', () => {
    cy.get('input[name="username"]').type(' Admin ')
    cy.get('input[name="password"]').type('Admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-012 - Validasi field password hidden', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')
  })

  it('TC-013 - Validasi tombol login aktif', () => {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('not.be.disabled')
  })
})