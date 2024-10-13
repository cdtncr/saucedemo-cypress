import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { sauceDemoPage } from '../support/page-objects/saucedemo-page';

beforeEach(() => {
  cy.visit("https://www.saucedemo.com/")
})

Given("the user logs in successfully as standard user", () => {
  sauceDemoPage.loginStandardUser()
})

When("user is redirected to product list page", () => {
  cy.url().should('include', '/inventory.html')
})

Then("user should be able to see a list of available products", () => {
  sauceDemoPage.productListPage()
})

When("user sorted the products by name a to z", () => {
  cy.get('[data-test="product-sort-container"]').select('az')
})

Then("products should be sorted by name a to z", () => {
  sauceDemoPage.sortProductByNameAZ()
})

When('user sorted the products by name z to a', () => {
  cy.get('[data-test="product-sort-container"]').select('za')
})

Then('products should be sorted by name z to a', () => {
  sauceDemoPage.sortProductByNameZA();
})

When("user sorted the products by price low to high", () => {
  cy.get('[data-test="product-sort-container"]').select('lohi')
})

Then("products should be sorted by price low to high", () => {
  sauceDemoPage.sortProductByPriceLoHi()
})

When('user sorted the products by price high to low', () => {
  cy.get('[data-test="product-sort-container"]').select('hilo')
})

Then('products should be sorted by price high to low', () => {
  sauceDemoPage.sortProductByPriceHiLo()
})

Given('the user successfully adds product to the cart', () => {
  sauceDemoPage.loginStandardUser()
  sauceDemoPage.addProductsToCart()
})

When ('user clicks the shopping cart icon', () => {
  cy.get('[data-test="shopping-cart-link"]').click()
})

Then ('user should be able to view the shopping cart', () => {
  sauceDemoPage.cartItemsPage()
})
When ('user removes a product from the cart', () => {})
Then ('products should be removed from the cart', () => {})