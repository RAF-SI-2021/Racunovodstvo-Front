describe('povracaj spec', () => {
	it('visit page', () => {
		cy.visit('/povracaj');
	});

	it('izmeni', () => {
		cy.get('td:nth-child(1)').first().type('321');
		cy.get('td:nth-child(2)').first().type('2022-06-15');
		cy.get('td:nth-child(3)').first().type('{selectall}{backspace}20000');
		cy.get('.btn-warning').first().click();
	});

	it('dodaj novi', () => {
		cy.get('.col-sm-4:nth-child(1) > .form-control').type('999');
		cy.get('.col-sm-4:nth-child(2) > .form-control').type('2022-06-13');
		cy.get('.col-sm-4:nth-child(3) > .form-control').type('10000');
		cy.get('.btn-success').click();
	});

	it('obrisi', () => {
		cy.visit('/povracaj');
		cy.get('.btn-danger').last().click();
	});
});
