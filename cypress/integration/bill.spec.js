/// <reference types="cypress" />

describe('bill flow', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/')
    })
    it('navigates to bills page', () => {
        cy.contains('Bills with Upcoming Hearings')
        .parent()
        .find('button')
        .click()

        expect(location.pathname).to.eq("/bills")
    })
})