describe('login spec', () => {
	it('visit page', () => {
		cy.visit('/login');
	});

	it('login flow', () => {
		const username = 'user1';
		const password = 'user1';

		cy.get('input[id=email]').type(username);
		// {enter} causes the form to submit
		cy.get('input[id=password]').type(`${password}{enter}`);

		cy.url().should('include', '/');
		cy.window()
			.its('sessionStorage')
			.invoke('getItem', 'jwt')
			.should('exist');
		cy.get('button').should('contain', 'Odjava');
	});
});
