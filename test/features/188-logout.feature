Feature: Logout Functionality

  Scenario: Successful logout
    Given I am logged in
    And I am on the profile page
    When I click on the logout button
    Then I should be logged out
    And I should be redirected to the login screen
