Feature: Frontend validation in group creation

@frontend-validation-in-group-creation
Scenario: All empty fields
Given I do the login as "10" "10"
And I go to the "group creation" page
Then Errors appears about the missing fields
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Missing name field
Given I do the login as "10" "10"
And I go to the "group creation" page
When I fill all the fields except the name
Then 'Name cannot be empty' error appears
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Missing description field
Given I do the login as "10" "10"
And I go to the "group creation" page
When I fill all the fields except the description
Then 'Description cannot be empty' error appears
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Missing course field
Given I do the login as "10" "10"
And I go to the "group creation" page
When I fill all the fields except the course
Then 'Course cannot be empty. Please select a course from the list' error appears
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Default members limit field
Given I do the login as "10" "10"
And I go to the "group creation" page
Then I see my "members_limit_field" "2"
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Missing members limit field
Given I do the login as "10" "10"
And I go to the "group creation" page
When I clear members limit and fill all the fields except the members limit
Then 'Members limit must be between 2 and 100' error appears
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Wrong members limit field
Given I do the login as "10" "10"
And I go to the "group creation" page
When I fill all the fields and members limit with 101
Then 'Members limit must be between 2 and 100' error appears
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout

@frontend-validation-in-group-creation
Scenario: Missing telegram id field
Given I do the login as "10" "10"
And I go to the "group creation" page
When I fill all the fields except the telegram id
Then 'Telegram Group ID must contain only digits' error appears
And the "Create the study group" button is disabled
And I go to the "profile" page
And I do the logout