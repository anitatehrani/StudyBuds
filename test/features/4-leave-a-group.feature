Feature: Leave a group

@leave-a-group
Scenario: Leave a group
    Given I do the login as "10" "10"
    And I with Telegram id "8101626040" am on Telegram in the group with telegram id "-1002275541628"
    When The student leaves the group with telegram id "-1002275541628" in Telegram
    Then The student with id "8101626040" is removed from the group with id "-1002275541628"
    When I go to the "search" page
    And I type "groupof10" in the search bar
    Then I see all groups where "groupof10" is inside their group name or course
    When I click on "see more" of the "first" group
    Then The group description dialog opens
    And he can no longer see the "group details telegram link" in the group description
