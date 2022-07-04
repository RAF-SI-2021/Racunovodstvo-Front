describe('plate spec', () => {
	beforeEach('visit page', () => {
		cy.visit('/plate');
	});

	it('filter ime', () => {
		cy.get(
			'.row:nth-child(1) > .col-sm-4:nth-child(1) > .form-control'
		).type('Marko');
		cy.get('.btn-primary').last().click();
	});

	it('filter prezime', () => {
		cy.get(
			'.row:nth-child(1) > .col-sm-4:nth-child(2) > .form-control'
		).type('Peric');
		cy.get('.btn-primary').last().click();
	});

	it('filter neto plata', () => {
		cy.get(
			'.row:nth-child(1) > .col-sm-4:nth-child(3) > .form-control'
		).type('70000');
		cy.get('.btn-primary').last().click();
	});

	it('filter porez', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(1) > .form-control'
		).type('0.2');
		cy.get('.btn-primary').last().click();
	});

	it('filter doprinos 1', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(2) > .form-control'
		).type('1.2');
		cy.get('.btn-primary').last().click();
	});

	it('filter doprinos 2', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(3) > .form-control'
		).type('1.2');
		cy.get('.btn-primary').last().click();
	});

	it('filter bruto plata', () => {
		cy.get(
			'.row:nth-child(3) > .col-sm-4:nth-child(1) > .form-control'
		).type('150000');
		cy.get('.btn-primary').last().click();
	});

	it('filter ukupan trosak zarade', () => {
		cy.get(
			'.row:nth-child(3) > .col-sm-4:nth-child(2) > .form-control'
		).type('6138200.66667');
		cy.get('.btn-primary').last().click();
	});

	it('filter komentar', () => {
		cy.get(
			'.row:nth-child(2) > .col-sm-4:nth-child(2) > .form-control'
		).type('komentar');
		cy.get('.btn-primary').last().click();
	});
});
