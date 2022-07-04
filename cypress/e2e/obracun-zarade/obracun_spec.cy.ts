describe('obracun spec', () => {
	it('visit page', () => {
		cy.visit('/obracun');
	});

	it('promeni dan i sifru transakcije', () => {
		cy.get('.form-control:nth-child(1)').type('23');
		cy.get('.form-control:nth-child(4)').select(3);
		cy.get('.btn:nth-child(7)').click();
	});

	it('napravi obracun', () => {
		cy.get('.form-control:nth-child(4)').select(3);
		cy.get('.btn:nth-child(6)').click();
	});

	it('promeni platu', () => {
		cy.get('.view:nth-child(1) > .div_hover > div:nth-child(1)').click();
		cy.get(
			'.view:nth-child(1) tr:nth-child(1) > td:nth-child(3) > .ng-untouched:nth-child(1)'
		).type('{backspace}0');
		cy.get(
			'.view:nth-child(1) tr:nth-child(1) > td:nth-child(9) > .btn:nth-child(1)'
		).click();
	});

	it('promeni ucinak', () => {
		cy.get(
			'.view:nth-child(1) tr:nth-child(1) > td:nth-child(8) > .ng-untouched:nth-child(1)'
		).click();
		cy.get(
			'.view:nth-child(1) tr:nth-child(1) > td:nth-child(8) > .ng-untouched:nth-child(1)'
		).type('{backspace}{backspace}{backspace}100');
		cy.get(
			'.view:nth-child(1) tr:nth-child(1) > td:nth-child(9) > .btn:nth-child(1)'
		).click();
	});
});
