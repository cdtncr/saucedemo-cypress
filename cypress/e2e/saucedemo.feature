Feature: saucedemo.com
  Scenario: View and Sort Products
    Given the user logs in successfully as standard user
    When user is redirected to product list page
    Then user should be able to see a list of available products
    When user sorted the products by name a to z
    Then products should be sorted by name a to z
    When user sorted the products by name z to a
    Then products should be sorted by name z to a
    When user sorted the products by price low to high
    Then products should be sorted by price low to high
    When user sorted the products by price high to low
    Then products should be sorted by price high to low
  Scenario: Manage Shopping Cart
    Given the user successfully adds product to the cart
    When user clicks the shopping cart icon
    Then user should be able to view the shopping cart
    When user removes a product from the cart
    Then products should be removed from the cart