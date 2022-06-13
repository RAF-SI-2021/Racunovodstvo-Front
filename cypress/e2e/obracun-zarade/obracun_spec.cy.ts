describe('obracun spec', () => {
	it('visit page', () => {
		cy.visit('/obracun');
	});

	it('promeni obracun', () => {
		cy.get('.div_hover > div:nth-child(1)').click();
		cy.get('.form-control:nth-child(1)').type('23');
		cy.get('.form-control:nth-child(6)').select('4');
		cy.get('.btn-primary').last().click();
		cy.get('.btn-danger').last().click();
	});

	it('promeni platu i ucinak', () => {
		cy.get('tr:nth-child(1) > td:nth-child(3) > .ng-untouched')
			.click()
			.type('{selectall}{backspace}100');
		cy.get('tr:nth-child(1) > td:nth-child(8) > .ng-untouched').type(
			'{selectall}{backspace}99'
		);
		cy.get('.btn-warning').first().click();
	});

	it('obrisi', () => {
		cy.get('tr:nth-child(1) .btn-danger').click();
	});
});
