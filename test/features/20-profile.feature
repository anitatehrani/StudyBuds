Feature: Profile

Scenario: Profile
    Given I logged in
    When I open the profile page
    Then I see my studentId "10", fullname "Noah White", telegram id "36"
    And I do the logout

Scenario: Telegram Id
    Given I logged in
    When I open the profile page
    And I edit the Telegram Id field to the value "77"
    Then The telegram id field is modified to the value I entered, "77"
    And I do the logout

Scenario: Profile Information is Not Editable
    Given I logged in
    When I open the profile page
    Then all fields are locked or disabled from editing except the telegram user id
    And I do the logout
