// importing BDD basics
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

// Setting "personal" info
const First_Name = 'Rebeus'
const Last_Name = 'Hagrid'
const Post_Code = '52930'
const LogInURL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'

Given('user logs in and adds new customer', ()=>{
    // Going into the Log In page
    cy.visit(LogInURL)
    cy.url().should('eq', LogInURL)
    cy.get('[class="mainHeading"]').should('include.text', 'XYZ Bank')

    // Start the addition of New Customer
    cy.get('button[ng-click="manager()"]').should('include.text', 'Bank Manager Login')
    cy.get('button[ng-click="manager()"]').click()
    cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager')

    cy.get('button[ng-class="btnClass1"]').should('include.text', 'Add Customer')
    cy.get('button[ng-class="btnClass1"]').click()
    cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust')

    cy.get('[ng-model="fName"]').should('have.attr', 'placeholder', 'First Name')
    cy.get('[ng-model="fName"]').type(First_Name)

    cy.get('[ng-model="lName"]').should('have.attr', 'placeholder', 'Last Name')
    cy.get('[ng-model="lName"]').type(Last_Name)

    cy.get('[ng-model="postCd"]').should('have.attr', 'placeholder', 'Post Code')
    cy.get('[ng-model="postCd"]').type(Post_Code)

    cy.get('button[type="submit"]').should('include.text', 'Add Customer')
    cy.get('button[type="submit"]').click()
})

When('the user validates the newly added customer', ()=>{
    // Verify user has been added
    
    // Small issue with pop up, workaround is to refresh the Add Customer page
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust')
    
    cy.get('button[ng-class="btnClass3"]').should('include.text', 'Customers')
    cy.get('button[ng-class="btnClass3"]').click()
    cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list')

    cy.get('[class="ng-binding"]').contains(First_Name).should('have.text', First_Name)
    cy.get('[class="ng-binding"]').contains(Last_Name).should('have.text', Last_Name)
    cy.get('[class="ng-binding"]').contains(Post_Code).should('have.text', Post_Code)
})

And('user deletes the newly added customer', ()=>{
    // User deletes customer from the list
    cy.get('tr.ng-scope').last().find('button').contains('Delete').should('exist')
    cy.get('tr.ng-scope').last().find('button').contains('Delete').click()
})

Then('the customer is deleted effectively', ()=>{
    // Previous customer has been deleted
    cy.url().should('eq', 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list')
    cy.get('[class="ng-binding"]').contains(First_Name).should('not.exist')
    cy.get('[class="ng-binding"]').contains(Last_Name).should('not.exist')
    cy.get('[class="ng-binding"]').contains(Post_Code).should('not.exist')
})