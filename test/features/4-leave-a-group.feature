Feature: Leave a group

@leave-a-group
Scenario: Leave a group
Given I do the login as "10" "10"
    And I with Telegram id "8101626040" am on Telegram in the group with telegram id "-1002275541628"
    When The student leaves the group with telegram id "1111" in Telegram
    Then The student is removed from the group with telegram id "1111" in the application
    When I go to the "search" page
    And I type "Capstone" in the search bar
    Then I see all groups where "Capstone" is inside their group name or course
    When I click on "see more" of the "first" group
    Then The group description dialog opens
    And he can no longer see the "invitation link" in the group description
    And I go to the "profile" page
    And I do the logout
