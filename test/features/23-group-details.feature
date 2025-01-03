Feature: Group Details

Scenario: Open group description
    Given I am on the search page and logged in
    And I type "Capstone" in the search bar
    Then I see all groups where "Capstone" is inside their group name or course
    When I click on "see more" of the first group
    Then The group description dialog opens
    And I see the group name
    And I see the group members number
    And I see the group type
    And I see the full group description
    And I see the group course
    And I go to the profile page
    And I do the logout
