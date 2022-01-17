/// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Login Page - Regression Suite', function(){ 
    let userDetails;

    // Command under this will run before each tests
    beforeEach(() => {
      cy.visit('/login')
      cy.fixture('test_data.json').then(function(user){
        userDetails = user
      })
    })

    afterEach(() => {
      // Caputuring snapshot after each test and storing it /cypress/screenshots folder
      cy.screenshot()
    })

    // Tests for Login Page - Regression Suite

    it('Test if user is able to navigate to login page', () => {
      cy.url().should('eq','https://the-internet.herokuapp.com/login')
    })

    it('Test if Header of login page is correct', ()  => {
      cy.get('h4')
        .contains('This is where you can log into the secure area.')         
    })

    it('Test if Subheader of login page contains expected text', ()  => {
      cy.get('h2')
        .contains('Login Page')         
    })

    it('Test if user is able to type in Username field', () =>{
      cy.get('#username')
        .type(userDetails.username)
        .should('have.value', 'tomsmith')   
    })

    it('Test if user is able to type in password field', () =>{
      cy.get('#password')
        .type(userDetails.password)
        .should('have.value', 'SuperSecretPassword!')
      
    })
    
    it('Test if attempting to login with blank username throws error ', () => {
      // Clicking on "Login Page" button without username
      cy.get('button[type="submit"]').click()
      cy.get('.flash.error').should('contain', 'Your username is invalid!')
        
    })
    
    it('Test if attempting to login with blank password throws error ', () => {
      cy.get('#username').type(userDetails.username)
      
      // Clicking on the "Login Page" button without password
      cy.get('button[type="submit"]').click()
      cy.get('.flash.error').should('contain', 'Your password is invalid!')
    })

    it('Test if attempting to login with incorrect username throws an error', () => {
      // Entre Incorrect username
      cy.get('#username').type(userDetails.wrong_username)
      
      // Enter correct password
      cy.get('#password').type(userDetails.password)

      // Click on Login button
      cy.get('button[type="submit"]').click()

      // Test if application throws an appropriate error with Incorrect Username
      cy.get('.flash.error').should('contain', 'Your username is invalid!')
      
    })

    it('Test if attempting to login with incorrect password throws an error', () => {
      // Enter Correct username
      cy.get('#username').type(userDetails.username)
      
      // Enter Incorrect password
      cy.get('#password').type(userDetails.wrong_password)

      // Click on Login button
      cy.get('button[type="submit"]').click()

      // Test if application throws an appropriate error with Incorrect Password
      cy.get('.flash.error').should('contain', 'Your password is invalid!')
      
    })

    it('Happy Path: Able to Login successfully', () => {
      // Entre correct username
      cy.get('#username').type(userDetails.username)
      // Enter correct password
      cy.get('#password').type(userDetails.password)
      
      cy.get('button[type="submit"]').click()
      cy.url().should('include','/secure')
    })

    it('Able to Logout successfully', () => {
      //Using overridden login command by putting definition in command.js
      cy.login()
      
      cy.get('.icon-2x.icon-signout').click()
      cy.url().should('include','/login')
      cy.get('.flash.success').should('contain', 'You logged out of the secure area!')
    })
})