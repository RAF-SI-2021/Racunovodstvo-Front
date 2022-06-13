describe('bookkeeping-journal spec', () => {
	beforeEach('visit page', () => {
		cy.visit('/bookkeeping-journal');
	});

	it('broj naloga', () => {
		cy.get('.col-lg-2:nth-child(1) > .form-control').type('n 1234');
		cy.get('.wrn-btn').click();
	});

	it('datum', () => {
		cy.get('.col-lg-2:nth-child(2) > .form-control').type('2022-06-09');
		cy.get('.col-lg-2:nth-child(3) > .form-control').type('2022-06-14');
		cy.get('.wrn-btn').click();
	});

	it('broj fakture', () => {
		// ne radi
		cy.get('.col-lg-2:nth-child(4) > .form-control').type('1');
		cy.get('.wrn-btn').click();
	});

	it('komentar', () => {
		cy.get('.col-lg-2:nth-child(5) > .form-control').type('komentar');
		cy.get('.wrn-btn').click();
	});
});
