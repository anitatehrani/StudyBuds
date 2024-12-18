Feature: Join a group to find people

Scenario: Duplicate join request
    Given I am on the search page and logged in
    And I type "aya" in the search bar                                
    And I already have sent a join request to the group
    When I attempt to send another join request
    Then The "pending" button is displayed to indicate that a request is already pending.
