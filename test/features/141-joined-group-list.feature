Feature: Joined group list

Scenario: View All Groups
    Given I am logged in
    When I navigate to the Joined group tab
    Then I see a list of all groups I am part of
    And I go to the profile page
    And I do the logout

Scenario: Empty State When No Groups Exist
    Given I am logged in
    When I navigate to the Joined group tab
    Then A message is displayed stating, "No groups found."
    And I go to the profile page
    And I do the logout

Scenario: Highlight Groups I Own
    Given I am logged in
    When I navigate to the Owned group tab
    Then The groups I own are there
    And I go to the profile page
    And I do the logout