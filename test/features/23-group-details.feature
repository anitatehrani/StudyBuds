Feature: Group details

@group-details
Scenario: Open group description
    Given I do the login as guest
    When I go to the "search" page
    And I type "Capstone" in the search bar
    Then I see all groups where "Capstone" is inside their group name or course
    When I click on "see more" of the "first" group
    Then The group description dialog opens
    And I see the "group details name"
    And I see the "group details members count"
    And I see the group type
    And I see the "group details description"
    And I see the "group details course"
    And I go to the "profile" page
    And I do the logout