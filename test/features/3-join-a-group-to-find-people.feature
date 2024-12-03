Feature: Join a group to find people

**Scenario**: Display team information 
Given: The student is on the group profile page
When: The student clicks on the "Join group" button
Then: The system displays the group's information, including the number of current team members, before allowing the student to confirm the request

**Scenario**: Sending join request
Given: The student is on a group description page
When: The student clicks the button to join the group
And: the user confirms he wants to send the join request
Then: The system sends a join request to the SuperStudent

**Scenario**: Duplicate join request
Given: The student has already sent a join request to the group
When: The student attempts to send another join request
Then: The "Join group" button is displayed as unclickable(disabled) to the indicate that a request is already pending.

**Scenario**: Join team button is disabled for existing members
Given: The student is a member of the group
When: The student views the group details page
Then: The "Join group" button is not visible to the student 

Scenario: Notification list
Given: Some of my join requests have been accepted or refused
When: I open the notification list page in the app
Then: I see the list of all the join requests which have been accepted or refused