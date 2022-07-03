describe('troskovni-centar spec', () => {
	it('visit page', () => {
		cy.visit('/troskovni-centar');
	});

	it('napravi novi', () => {
		cy.get('.col-2:nth-child(2) > input').type('naziv');
		cy.get('.col-2:nth-child(3) > input').type('111111');
		cy.get('#lokacije')
			.find('option')
			.its('length')
			.then((len) => {
				cy.get('#lokacije').select(len - 1);
			});
		cy.get('#odgLice')
			.find('option')
			.its('length')
			.then((len) => {
				cy.get('#odgLice').select(len - 1);
			});
		cy.get('#parent')
			.find('option')
			.its('length')
			.then((len) => {
				cy.get('#parent').select(len - 1);
			});
		cy.get('.col-2 > .btn').click();
	});

	it('dodaj listu konta', () => {
		cy.get('#knjizenja')
			.find('option')
			.its('length')
			.then((len) => {
				cy.get('#knjizenja').select(len - 1);
			});
		cy.get('#centri')
			.find('option')
			.its('length')
			.then((len) => {
				cy.get('#centri').select(len - 1);
			});
		cy.get('.col-4 > .btn').click();
	});

	it('otvori listu konta', () => {
		cy.get('.btn-outline-primary').last().click();
	});

	it('obrisi centar', () => {
		cy.get('.mb-3:nth-last-child(-n+1) > .btn-outline-danger').click();
	});
});
