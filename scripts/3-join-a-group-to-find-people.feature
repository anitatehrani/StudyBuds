Feature: Join a group to find people

Scenario: Duplicate join request
    Given I logged in 
    And I already have sent a join request to the group
    When I attempt to send another join request
    Then The "Join group" button is displayed as unclickable(disabled) to indicate that a request is already pending.

Scenario: Join team button is disabled for existing members
    Given I am logged in as User A
    And I am a member of the group
    When I view the group details page
    Then The "Join group" button is not visible to me