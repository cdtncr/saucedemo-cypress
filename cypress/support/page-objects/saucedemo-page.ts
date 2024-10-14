export class SauceDemoPage {
  loginStandardUser() {
    cy.findByTestId('user-name').type(Cypress.env('username'))
    cy.findByTestId('password').type(Cypress.env('password'))
    cy.findByTestId('login-button').click()
  }

  productListPage() {
    // Check page title is displayed
    cy.findByText('Products').should('be.visible')

    // Check if inventory list and item descriptions are displayed
    cy.get('[data-test="inventory-list"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-test="inventory-item-name"]').should('be.visible')
        cy.get('[data-test="inventory-item-desc"]').should('be.visible')
        cy.get('[data-test="inventory-item-price"]').should('be.visible')
        cy.findAllByRole('button', { name: 'Add to cart' }).should('be.visible')
      })
  }

  sortProductByNameAZ() {
    // Check products are correctly sorted by Name (A to Z)
    cy.get('[data-test="inventory-item-name"]').then(($products) => {
      // Extract the product names and store it in an array
      const productsArray = $products
        .toArray()
        .map((product) => product.innerText)

      // Create a sorted version of the product names
      const sortedArray = [...productsArray].sort()

      // Assert that the original array is equal to the sorted array
      expect(productsArray).to.deep.equal(sortedArray)
    })
  }

  sortProductByNameZA() {
    // Check products are correctly sorted by Name (Z to A)
    cy.get('[data-test="inventory-item-name"]').then(($products) => {
      // Extract the product names and store it in an array
      const productsArray = $products
        .toArray()
        .map((product) => product.innerText)

      // Create a sorted version of the product names in reverse order
      const sortedArray = [...productsArray].sort().reverse()

      // Assert that the original array is equal to the sorted array
      expect(productsArray).to.deep.equal(sortedArray)
    })
  }

  sortProductByPriceLoHi() {
    // Check products are correctly sorted by Price (low to high)
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      // Extract the prices' text then convert to numbers, and store in an array
      const pricesArray = $prices
        .toArray()
        .map((price) => parseFloat(price.innerText.replace(/[^0-9.-]+/g, '')))

      // Create a sorted version of the prices in ascending order
      const sortedArray = [...pricesArray].sort((a, b) => a - b)

      // Assert that the original array is equal to the sorted array
      expect(pricesArray).to.deep.equal(sortedArray)
    })
  }

  sortProductByPriceHiLo() {
    // Check products are correctly sorted by Price (high to low)
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      // Extract the prices' text then convert to numbers, and store in an array
      const pricesArray = $prices
        .toArray()
        .map((price) => parseFloat(price.innerText.replace(/[^0-9.-]+/g, '')))

      // Create a sorted version of the prices in ascending order
      const sortedArray = [...pricesArray].sort((a, b) => b - a)

      // Assert that the original array is equal to the sorted array
      expect(pricesArray).to.deep.equal(sortedArray)
    })
  }

  addProductsToCart() {
    // Check if shopping cart count is not present since there are no items in cart yet
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    
    // Add first product in cart
    cy.findByTestId('add-to-cart-sauce-labs-backpack').click()
    // Check if shopping cart count is updated with the correct item count
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
    
    // Add second product in cart
    cy.findByTestId('add-to-cart-sauce-labs-bike-light').click()
    // Check if shopping cart count is updated with the correct item count
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

  }

  cartItemsPage() {
    // Assertion to check if the 2 added products are in the cart
    cy.get('[data-test="inventory-item"]').should('have.length', 2)

    // Other assertion to check cart details
    cy.get('[data-test="item-quantity"]').should('contain', 1)
    cy.get('[data-test="inventory-item-name"]').should('be.visible')
    cy.get('[data-test="inventory-item-desc"]').should('be.visible')
    cy.findByTestId('continue-shopping').should('be.visible')
    cy.findByTestId('checkout').should('be.visible')
  }
}
export const sauceDemoPage = new SauceDemoPage()
