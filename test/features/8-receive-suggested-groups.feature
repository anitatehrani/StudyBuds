Feature: Receive suggested groups

@receive-suggested-groups
Scenario: Suggestions present
Given I do the login as guest
And I go to the "search" page
Then I see some suggested groups
And I go to the "profile" page
And I do the logout