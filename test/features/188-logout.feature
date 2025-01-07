Feature: Logout Functionality

Scenario: Successful logout
  Given I do the login as guest
  And I go to the "profile" page
  When I click on the logout button
  Then I should be logged out and be redirected to the login screen