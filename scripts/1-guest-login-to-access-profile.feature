Feature: Guest Login to Access Profile

Scenario: User login
Given I am on the home page not logged in
When I click on the login button
And I input my Unige credentials username "10" and password "10"
Then I am logged in successfully
And I can see my profile username "10"