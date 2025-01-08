Feature: Persist login data

Scenario: Login persisted
Given I am logged in with credentials
When I close the application
And I reopen it
Then The login screen is skipped
And I am on the joined groups screen
And I go to the profile page
And I do the logout
