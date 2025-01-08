Feature: Joined group list

@joined-group-list
Scenario: View All Groups
Given I am logged in
When I navigate to the Joined group tab
Then I see a list of all groups I am part of

@joined-group-list
Scenario: Empty State When No Groups Exist
Given I am logged in
When I navigate to the Joined group tab
Then A message is displayed stating, "No groups found."

@joined-group-list
Scenario: Highlight Groups I Own
Given I am logged in
When I navigate to the Owned group tab
Then The groups I own are there