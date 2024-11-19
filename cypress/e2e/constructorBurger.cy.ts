import Cypress from 'cypress';
import { setCookie } from '../../src/utils/cookie'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

describe('test constructorBurger', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000/');
    
        cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
            fixture: 'ingredients.json'
        })
        cy.intercept('GET', `${BURGER_API_URL}/auth/user`, {
            fixture: 'user.json'
        })
        setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWJhY2I0ZDgyOWJlMDAxYzc3OGM2MiIsImlhdCI6MTczMjA0NjA4MCwiZXhwIjoxNzMyMDQ3MjgwfQ.wZ7pfwZrgWBMxZVOjAcAMKUbN2isodqC6Pif3VVSZcw');
        localStorage.setItem('refreshToken', '6b6add9f3d90ab5933f2d8c06a9887159f75252124edf41ba0a2851dff6b9115526e9a2467585e2e');
    });
    describe('test addIngredients', () => {
        it('test addBun', () => {
            cy.get('.szzp3k0uBXITrGixPLCJ').find('.HR_H4Fj42ZLB21Nz5vxx').first().click();
            cy.get('.szzp3k0uBXITrGixPLCJ').find('.counter__num').contains(2);
            cy.get('.mJns_Jb07jLke7LQ6UAF').find('.constructor-element__text').first().should('contain', 'Краторная булка N-200i (верх)');
        });
        it('test addMains', () => {
            cy.get('.nwANerpzIt6nknkv21Qj > :nth-child(4) > :nth-child(1)').find('.HR_H4Fj42ZLB21Nz5vxx').click();
            cy.get('.nwANerpzIt6nknkv21Qj > :nth-child(4) > :nth-child(1)').find('.counter__num').contains(1);
            cy.get('.HEJ0tV35JHL7iuHL89vk').find('.constructor-element__text').should('contain', 'Биокотлета из марсианской Магнолии');
        });
    });
    describe('test Modal', () => {
        it('test openModalIngredient', () => {
            cy.get('.szzp3k0uBXITrGixPLCJ').find('.J2V21wcp5ddf6wQCcqXv').first().click();
            cy.get('.G7XCxXE59ujtXU1FO7W1').find('.text').first().should('contain', 'Краторная булка N-200i');
        })
        it('close Modal on button', () => {
            cy.get('.szzp3k0uBXITrGixPLCJ').find('.J2V21wcp5ddf6wQCcqXv').first().click();
            cy.get('.b_7mdKCbZ9NwpuNYvKgW').find('.Z7mUFPBZScxutAKTLKHN').first().click();
        })
    });
    describe('test order', () => {
        beforeEach(() => {
            cy.intercept('POST', `${BURGER_API_URL}/orders`, {
                fixture: 'orders.json'
            })
        });
        it('test', () => {
            cy.get('.szzp3k0uBXITrGixPLCJ').find('.HR_H4Fj42ZLB21Nz5vxx').first().click();
            cy.get('.nwANerpzIt6nknkv21Qj > :nth-child(4) > :nth-child(1)').find('.HR_H4Fj42ZLB21Nz5vxx').click();
            cy.get('.R0Ja10_UixREbmJ6qzGV').find('.button').first().click();
            cy.get('.xqsNTMuGR8DdWtMkOGiM').find('.U070UGjz0x5J0l3NxX3I').first().should('contain', 59780);
            cy.get('.xqsNTMuGR8DdWtMkOGiM').should('be.visible');
            cy.get('.xqsNTMuGR8DdWtMkOGiM').find('.Z7mUFPBZScxutAKTLKHN').first().click();
            cy.get('#modals').should('not.be.visible');
            cy.get('.R0Ja10_UixREbmJ6qzGV').find('._W_JfNJJl5H5e8eqr8Ya ').should('contain', 'Выберите булки');
            cy.get('.R0Ja10_UixREbmJ6qzGV').find('.HEJ0tV35JHL7iuHL89vk').should('contain', 'Выберите начинку');
        })
    })
})
