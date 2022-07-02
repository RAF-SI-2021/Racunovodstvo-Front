describe('manage-users spec', () => {
	it('visit page', () => {
		cy.visit('/manage-users');
	});

	it('dodaj novog', () => {
		cy.get('.btn-success').click();
		cy.get('#username2').type('user3');
		cy.get('#InputName2').type('Ime');
		cy.get('#InputSurname2').type('Prezime');
		cy.get('#InputPassword').type('user1234');
		cy.get('.create-account').click();
	});

	// testirati jos stvari
});
