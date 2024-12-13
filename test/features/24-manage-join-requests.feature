Feature: Manage join requests

Scenario: See join request
Given I am logged in
And I am a SuperStudent of a group
And a student sends a join request to that group
When I go to the notifications page
Then I see the notification with the notification message

Scenario: Accept join request
Given I am logged in
And I am a SuperStudent of a group
And a student sends a join request to that group
When I open the notification
And I click accept
Then The user receives the invitation link of Telegram group
And a notification is sent to him

# Scenario: Refuse join request
# Given I am a SuperStudent of a group
# And a student sends a join request to that group
# When I open the notification
# And I click refuse
# Then The user does not receive invitation link of Telegram group
# And a notification is sent to him about the refusal
#
# Scenario: Notification list
# Given I am a SuperStudent of many groups
# When I open the notification list page in the app
# Then I see the list of all the join requests notification to my groups
#
