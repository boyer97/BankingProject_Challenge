Feature: Web Page Automation Challenge with Cypress + Cucumber framework

Scenario: Verifying the correct workflow of the Add & Delete customer functions
    Given user logs in and adds new customer
    When the user validates the newly added customer
    And user deletes the newly added customer
    Then the customer is deleted effectively