describe('evidencije spec', () => {
	beforeEach('visit page', () => {
		cy.visit('/evidencije');
	});

	it('filter by sifra', () => {
		cy.get('.col-lg-2:nth-child(1) > .form-control').type('sifra2');
		cy.get('.btn-danger').click();
	});

	it('filter by naziv', () => {
		cy.get('.col-lg-2:nth-child(2) > .form-control').type('naziv2');
		cy.get('.btn-danger').click();
	});

	it('filter by jedinica mere', () => {
		cy.get('.col-lg-2:nth-child(3) > .form-control').type('litar');
		cy.get('.btn-danger').click();
	});

	it('filter by kolicina', () => {
		cy.get('.col-lg-2:nth-child(4) > .form-control').type('20');
		cy.get('.btn-danger').click();
	});
});
