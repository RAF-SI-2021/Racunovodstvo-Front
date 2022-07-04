describe('manage-users spec', () => {
	it('visit page', () => {
		cy.visit('/manage-users');
	});

	it('dodaj novog', () => {
		cy.get('.btn-success').click();
		cy.get('#username2').type('testuser');
		cy.get('#InputName2').type('Ime');
		cy.get('#InputSurname2').type('Prezime');
		cy.get('#InputPassword').type('user1234');
		cy.get('.create-account').click();
	});

	it('izmeni test usera', () => {
		cy.get('tr:nth-last-child(-n+1) > td:nth-child(2)').click();
		cy.get('.form-check-input').first().click();
		cy.get('.form-check-input').eq(2).click();
		cy.get('.form-check-input').eq(3).click();
		cy.get('.form-check-input').eq(4).click();
		cy.get('.form-group:nth-child(6) > .btn-primary').click();
	});

	it('obrisi test usera', () => {
		// cy.get('.btn-danger').contains('Obriši').last().click();
		cy.get('tr:nth-last-child(-n+1) .btn').click();
	});
});
