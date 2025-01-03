Feature: Basic group search

Scenario: Search for some groups
    Given I am on the search page and logged in
    When I type "adm" in the search bar (case-insensitive)
    Then I see all groups where "adm" is inside their group name
    And I go to the profile page
    And I do the logout

Scenario: Search returns no results
    Given I am on the search page and logged in
    When I type "orange" in the search bar (case-insensitive)
    And no groups contain "orange" in their name
    Then the system displays an empty list
    And a message appears saying "No results found"
    And I go to the profile page
    And I do the logout
