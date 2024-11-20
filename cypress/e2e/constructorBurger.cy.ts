import { deleteCookie, setCookie } from '../../src/utils/cookie'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'
const BUNS = '[data-cy="Краторная булка N-200i"]';
const MAINS = '[data-cy="Биокотлета из марсианской Магнолии"]';
const CONSTRUCTOR = '[data-cy="burger-constructor"]';
const MODAL = '[data-cy="modal"]';

describe('test constructorBurger', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000/');
        cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
            fixture: 'ingredients.json'
        })
        cy.intercept('GET', `${BURGER_API_URL}/auth/user`, {
            fixture: 'user.json'
        })
    });
    describe('test addIngredients', () => {
        it('test addBun', () => {
            cy.get(BUNS).contains('Добавить').click();
            cy.get(BUNS).find('.counter__num').contains(2);
            cy.get(CONSTRUCTOR).find('div').first().should('contain', 'Краторная булка N-200i (верх)');
        });
        it('test addMains', () => {
            cy.get(MAINS).contains('Добавить').click();
            cy.get(MAINS).find('.counter__num').contains(1);
            cy.get(CONSTRUCTOR).find('ul').find('div').should('contain', 'Биокотлета из марсианской Магнолии');
        });
    });
    describe('test Modal', () => {
        it('test openModalIngredient', () => {
            cy.get(BUNS).find('a').click();
            cy.get(MODAL).should('be.visible');
            cy.get('[data-cy="modal-contant"]').find('h3').should('contain', 'Краторная булка N-200i');
        })
        it('close Modal on button', () => {
            cy.get(BUNS).find('a').click();
            cy.get(MODAL).find('button').click();
            cy.get(MODAL).should('not.exist');
        })
    });
    describe('test order', () => {
        beforeEach(() => {
            cy.intercept('POST', `${BURGER_API_URL}/orders`, {
                fixture: 'orders.json'
            });
            setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWJhY2I0ZDgyOWJlMDAxYzc3OGM2MiIsImlhdCI6MTczMjA0NjA4MCwiZXhwIjoxNzMyMDQ3MjgwfQ.wZ7pfwZrgWBMxZVOjAcAMKUbN2isodqC6Pif3VVSZcw');
            localStorage.setItem('refreshToken', '6b6add9f3d90ab5933f2d8c06a9887159f75252124edf41ba0a2851dff6b9115526e9a2467585e2e');
        });
        afterEach(()=> {
            deleteCookie('accessToken');
            localStorage.clear();
        });
        it('test', () => {
            cy.get(BUNS).contains('Добавить').click();
            cy.get(MAINS).contains('Добавить').click();
            cy.get(CONSTRUCTOR).find('.button').click();
            cy.get(MODAL).should('be.visible');
            cy.get(MODAL).find('h2').should('contain', 59780);
            cy.get(MODAL).find('button').click();
            cy.get(MODAL).should('not.exist');
            cy.get(CONSTRUCTOR).find('div').first().should('contain', 'Выберите булки');
            cy.get(CONSTRUCTOR).find('ul').find('div').should('contain', 'Выберите начинку');
        })
    })
})
