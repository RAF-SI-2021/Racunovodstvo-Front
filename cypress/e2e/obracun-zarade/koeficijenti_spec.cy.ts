describe('koeficijenti spec', () => {
	it('visit page', () => {
		cy.visit('/koeficijenti');
	});

	it('izmena', () => {
		cy.get('td:nth-child(1) > .form-control')
			.type('{selectall}{backspace}3')
			.trigger('change');
		cy.get('td:nth-child(2) > .form-control')
			.type('{selectall}{backspace}3')
			.trigger('change');
		cy.get('td:nth-child(3) > .form-control')
			.type('{selectall}{backspace}7')
			.trigger('change');
		cy.get('td:nth-child(4) > .form-control')
			.type('{selectall}{backspace}52')
			.trigger('change');
		cy.get('td:nth-child(5) > .form-control')
			.type('{selectall}{backspace}7')
			.trigger('change');
		cy.get('td:nth-child(6) > .form-control')
			.type('{selectall}{backspace}7')
			.trigger('change');
		cy.get('.btn-sm').click();
	});
});
