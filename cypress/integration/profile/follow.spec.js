context('Tweet', () => {
    beforeEach(() => {
        cy.clearDatabase()
    })

    it('Follow and then unfollow same user', () => {
        cy.login().then((user) => {
            cy.create('User', { name: 'john' }).then((friend) => {
                cy.visit('profiles/john')
                cy.getTestAttribute(`follow-button-${friend.id}`).contains(
                    'Follow me'
                )
                cy.getTestAttribute(`follow-button-${friend.id}`).click()
                cy.getTestAttribute(`follow-button-${friend.id}`).contains(
                    'Unfollow me'
                )
                cy.url().should('include', '/profiles/john')
            })
        })
    })

    it('Follow user should be visible in following list and must be clickable', () => {
        cy.login().then((user) => {
            cy.create('User', { name: 'john' }).then((friend) => {
                cy.visit('profiles/john')
                cy.getTestAttribute(`follow-button-${friend.id}`).click()
                cy.visit(`profiles/${user.name}`);
                cy.getTestAttribute(`following-friend`).should('have.length', 1);

                cy.getTestAttribute(`following-list-anchor-${friend.id}`).click();
                cy.url().should('include', '/profiles/john')
            })
        })
    })
})
