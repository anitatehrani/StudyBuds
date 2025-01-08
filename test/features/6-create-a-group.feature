Feature: Create a group

@create-a-group
Scenario: Group creation
    Given The student is on the group creation page
    When The student fills out the group name, description, sets the member limit, selects a lesson, and sets the group type
    Then The system creates the private group successfully and displays a confirmation message

@create-a-group
Scenario: Validation for required fields
    Given The student is on the group creation page
    When The student attempts to create a group without filling in one or more required fields
    Then The system displays an error message prompting the student to complete all required fields

@create-a-group
Scenario: Telegram account is not linked
    Given A telegram account has not been linked
    When The student goes on the group creation page
    Then An error message appears to ask the user to link a Telegram account