describe('account-plan spec', () => {
	it('visit page', () => {
		cy.visit('/account-plan');
	});

	it('add', () => {
		cy.get('#brojKonta').type('666');
		cy.get('#naziv').type('Naziv kontne grupe 666');
		cy.get('.mb-5').submit();
	});
});
