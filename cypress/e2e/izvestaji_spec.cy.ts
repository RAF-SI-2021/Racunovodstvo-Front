describe('izvestaji spec', () => {
	it('visit page', () => {
		cy.visit('/izvestaji');
	});

	it('stampaj bilans stanja', () => {
		cy.get('tr:nth-child(1)').click();
		cy.get('#name').click().type('bilans stanja');
		cy.get('#datum1').type('2022-06-06');
		cy.get('#datum2').type('2022-06-15');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('.btn-close').click();
	});

	it('stampaj bilans uspeha', () => {
		cy.get('tr:nth-child(2)').click();
		cy.get('#name').click().type('bilans uspeha');
		cy.get('#datum1').type('2022-06-06');
		cy.get('#datum2').type('2022-06-15');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('.btn-close').click();
	});

	it('stampaj izvestaj o promenama na kapitalu', () => {
		cy.get('tr:nth-child(3)').click();
		cy.get('.row:nth-child(3) input').type('1').trigger('change');
		cy.get('.row:nth-child(4) input').type('2').trigger('change');
		cy.get('#opis').type('promene na kapitalu');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('.btn-close').click();
	});

	it('stampaj izvestaj o transakcijama vezanim za komitenta', () => {
		cy.get('tr:nth-child(4)').click();
		cy.get('.row:nth-child(4) input')
			.click()
			.type('izvestaj o transakcijama za komitenta');
		cy.get('#datum1').type('2022-06-06');
		cy.get('#datum2').type('2022-06-15');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('.btn-close').click();
	});

	it('stampaj statisticki izvestaj o transakcijama po sifri transakcije', () => {
		cy.get('tr:nth-child(5)').click();
		cy.get('input')
			.click()
			.type('statisticki izvestaj o transakcijama po sifri transakcije');
		cy.get('select').select('uplata rastuće');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('select').select('uplata opadajuće');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('select').select('saldo rastuće');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('select').select('saldo opadajuće');
		cy.get('.btn-primary').filter(':visible').last().click();
		cy.get('.btn-close').click();
	});
});
