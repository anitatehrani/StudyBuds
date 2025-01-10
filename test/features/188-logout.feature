Feature: Logout

@logout
  Scenario: Successful logout
    Given I do the login as guest
    And I go to the "profile" page
    When I click on the logout button
    Then A confirmation dialog should appear
    When I click on the confirm button
    Then I should be logged out and be redirected to the login screen
