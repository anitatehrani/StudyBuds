Feature: Join a group to find people

Scenario: Display team information
    Given I am logged in as User A
    And I am on the basic search page
    And there are some groups in the search result
    When I click on the "Join group" button
    Then The system sends a join request to the SuperStudent

Scenario: Duplicate join request
    Given I am logged in as User A
    And I already have sent a join request to the group
    When I attempt to send another join request
    Then The "Join group" button is displayed as unclickable(disabled) to indicate that a request is already pending.

Scenario: Join team button is disabled for existing members
    Given I am logged in as User A
    And I am a member of the group
    When I view the group details page
    Then The "Join group" button is not visible to me

Scenario: Notification list
    Given I am logged in as User A
    And Some of my join requests have been accepted or refused
    When I open the notification list page in the app
    Then I see the list of all the join requests which have been accepted or refused