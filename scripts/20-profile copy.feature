Feature: Profile

Scenario: Profile
Given: I am on the profile page and logged in
Then: I see my studentId, name, last name, telegram id

Scenario: Telegram Id
Given: I logged in and I am on the profile page
When: I edit the Telegram Id field
Then: The telegram id field is modified to the value I entered

Scenario: Profile Information is Not Editable
Given I am on my profile page and my personal information is displayed
When I try to edit any field (e.g name, email)
Then the system does not allow me to make any changes
And all fields are locked or disabled from editing except the telegram user id