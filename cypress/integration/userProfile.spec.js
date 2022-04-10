describe('profile', () => {
    before(() => {
        cy.login()
    })

    beforeEach(() => {
        cy.visit('/profile')
    })



    it('contains social media names', () => {
        cy.contains('LinkedIn').and('Twitter')
    })

    it('contains link to find legislator', () => {
        cy.contains('find your legislator')
    })

})