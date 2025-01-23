Feature: Frontend validation in group creation

@frontend-validation-in-group-creation
Scenario: All empty fields
Given I am logged in successfully
And I go to the "group creation" page
Then An error appears about the missing fields
And the "Create the study group" button is disabled
And All the fields are marked with red

@frontend-validation-in-group-creation
Scenario: Missing name field
Given I am logged in successfully
And I go to the "group creation" page
When I fill all the fields except the name
Then An error appears about the missing field
And The name field is marked with red
And the "Create the study group" button is disabled

@frontend-validation-in-group-creation
Scenario: Missing description field
Given I am logged in successfully
And I go to the "group creation" page
When I fill all the fields except the description
Then An error appears about the missing field
And The description field is marked with red
And the "Create the study group" button is disabled

@frontend-validation-in-group-creation
Scenario: Missing course field
Given I am logged in successfully
And I go to the "group creation" page
When I fill all the fields except the course
Then An error appears about the missing field
And The course field is marked with red
And the "Create the study group" button is disabled

@frontend-validation-in-group-creation
Scenario: Default members limit field
Given I do the login as "10" "10"
And I go to the "group creation" page
Then I see my "members_limit_field" "2"

@frontend-validation-in-group-creation
Scenario: Missing members limit field
Given I am logged in successfully
And I go to the "group creation" page
When I fill all the fields except the members limit
And I clear the members limit field
Then An error appears about the missing field
And The members limit field is marked with red
And the "Create the study group" button is disabled

@frontend-validation-in-group-creation
Scenario: Missing telegram id field
Given I am logged in successfully
And I go to the "group creation" page
When I fill all the fields except the telegram id 
Then An error appears about the missing field
And The telegram id field is marked with red
And the "Create the study group" button is disabled