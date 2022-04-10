/// <reference types="cypress" />



const { origin } = new URL('https://digital-testimony-dev.web.app/')

console.log(origin)


describe('bill flow', () => {
    beforeEach(() => {
        cy.visit({ url: origin })
    })

    it('navigates to bills page', () => {
        cy.get('a').contains('View All Bills')
            .click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${origin.toString()}/bills`)
        })
        cy.hash.should('eq', `#/bills`)
    })
    it('navigates to testimony page', () => {
        cy.get('a').contains('View All Testimony').click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${origin.toString()}/testimonies`)
        })
    })
    it('opens bill page', () => {

        cy.get('a').should('have.length', 45).contains("4654").should("have.length", 1).click()

        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${origin.toString()}/bill?id=H4654`)
        })
    })
})

describe("bill page itself", () => {

    beforeEach(() => {
        cy.visit({ url: `${origin}/bill?id=H4654` })
    })

    it('loads bills', () => {

    })

    it('has title link', () => {
        cy.contains("4654").should('have.length', 1).and('have.attr', 'href', 'https://malegislature.gov/Bills/192/H4654')

    })

})
