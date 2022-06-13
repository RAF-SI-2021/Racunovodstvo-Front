describe('knjizenje-widget spec', () => {
	it('visit page', () => {
		cy.visit('/knjizenje-widget');
	});

	it('dodaj', () => {
		cy.get('#brojDok').type('1123L');
		cy.get('#brojNalog').type('999999');
		cy.get('#date').type('2022-06-13');
		cy.get('#mat-input-0').type('301');
		cy.get('#duguje').type('100');
		cy.get('#potrazuje').type('100');
		cy.get('td > .btn').click();
	});

	it('izmeni', () => {
		cy.get('.ng-touched #duguje').type('{selectall}{backspace}1000');
		cy.get('.ng-touched #potrazuje').type('{selectall}{backspace}1000');
		cy.get('.btn-warning').click();
	});

	// ne radi
	it('knjizenje', () => {
		cy.get('.btn-success').last().click();
	});

	it('promeni na profitni centar i knjizi', () => {
		cy.get('[type="checkbox"]').check();
		cy.get('.btn-success').last().click();
	});

	it('izbrisi', () => {
		cy.get('.btn-danger').first().click();
	});
});
