Feature: Joined group list

Scenario: View All Groups
Given: I am logged in.
When: I navigate to the "My Groups" page.
Then: I see a list of all groups I am part of.
And: Groups are ordered by creation date (newest first).
And: Groups I own are displayed in a different color or style.

Scenario: Empty State When No Groups Exist
Given: I am logged in and not part of any group.
When: I navigate to the "My Groups" page.
Then: A message is displayed stating, "No groups found."

Scenario: Highlight Groups I Own
Given: I am logged in and I own one or more groups.
When: I navigate to the "My Groups" page.
Then: The groups I own are highlighted with a distinct style color.