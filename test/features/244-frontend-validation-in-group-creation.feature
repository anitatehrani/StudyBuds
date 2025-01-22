Feature: Frontend validation in group creation

@frontend-validation-in-group-creation
Scenario: Default members limit field
Given I do the login as "10" "10"
And I go to the "group creation" page
Then I see my "members_limit_field" "2"
