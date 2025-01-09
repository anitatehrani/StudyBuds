Feature: Receive suggested groups

@receive-suggested-groups
Scenario: Suggestions present
Given I am on the search page and logged in
Then I see some suggested groups
And I go to the profile page
And I do the logout