describe('add-new-invoice spec', () => {
	it('visit page', () => {
		cy.visit('/add-new-invoice');
	});

	it('add new', () => {
		cy.get('#tipFakture').select('IZLAZNA_FAKTURA');
		cy.get('#brojFakture').type('123456789');
		cy.get('#datumIzdavanja').type('2022-06-14');
		cy.get('#rokZaPlacanje').type('2022-06-23');
		cy.get('#komitent').select('2');
		cy.get('#prodajnaVrednost').type('1000');
		cy.get('#rabatperc').type('10');
		cy.get('#porezperc').type('10');
		cy.get('#valuta').type('eur');
		cy.get('#kurs').type('117.8');
		cy.get('#zaNaplatu').type('117800');
		cy.get('#komentar').type('Komentar');
		cy.get('.btn:nth-child(1)').click();
	});
});
