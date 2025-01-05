Feature: Logout

  Scenario: Successful logout
    Given I am logged in with credentials
    And I am on the profile page
    When I click on the logout button
    Then A confirmation dialog should appear
    When I click on the confirm button
    Then I should be logged out and be redirected to the login screen