describe('sva-knjizenja spec', () => {
	beforeEach('visit page', () => {
		cy.visit('/sva-knjizenja');
	});

	it('datumi', () => {}); // ne radi

	it('broj konta', () => {
		cy.get('.col-lg-2:nth-child(3) > .form-control').type('309');
		cy.get('.btn-danger').click();
	});

	it('naziv konta', () => {
		cy.get('.col-lg-2:nth-child(4) > .form-control').type(
			'Naziv kontne grupe 351'
		);
		cy.get('.btn-danger').click();
	});

	it('komentar', () => {
		cy.get('.col-lg-2:nth-child(5) > .form-control').type('komentar');
		cy.get('.btn-danger').click();
	});
});
