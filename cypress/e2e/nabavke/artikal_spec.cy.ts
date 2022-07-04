describe('artikal spec', () => {
	it('visit page', () => {
		cy.visit('/artikal/1');
	});

	it('submit', () => {
		cy.get('input').type('1500');
		cy.get('.btn-primary').last().click();
	});
});
