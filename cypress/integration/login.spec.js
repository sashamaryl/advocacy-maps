
describe('login', () => {
    beforeEach(() => {
        cy.visit('/#/login')
    })
    it('displays sign in instruction', () => {
        cy.contains('h1', 'Sign in to Testify')
    })
    it('displays firebase sign in container', () => {
        cy.get('div#firebaseui_container').should('exist')
    })
    it('handles redirects', () => {})  
    it('sign in by email', () => {})  
})