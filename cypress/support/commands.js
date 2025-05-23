// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('loginVictoryPlus', (email, password) => {
  cy.visit('https://victoryplus.com/login');
  cy.wait(1000);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('dismissPopupIfExists', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Later")').length > 0) {
      cy.contains('button', 'Later').click();
    }
  });
});
// Custom command to scroll until a specific heading is visible
  Cypress.Commands.add('scrollUntilHeadingVisible', { prevSubject: false }, (headingText) => {
    const scrollStep = 1000; 
    let attempts = 0;
    const maxAttempts = 50; //To Prevent infinite loops

    const tryScroll = () => {
      // Check if the heading is visible
      cy.get('body').then(($body) => {
        const heading = $body.find('h2').filter((_, el) => 
          el.innerText.trim().toLowerCase() === headingText.toLowerCase()
        );

        if (heading.length > 0 && heading.is(':visible')) {
          // Heading is found and visible, scroll it into view for good measure
          cy.wrap(heading).scrollIntoView().should('be.visible');
        } else if (attempts < maxAttempts) {
          // Scroll down by a fixed amount and retry
          cy.window().then((win) => {
            win.scrollBy(0, scrollStep);
            attempts++;
            cy.wait(500); 
            tryScroll(); // Recursively try again
          });
        } else {
          // Fail the test if the heading isn't found after max attempts
          throw new Error(`Failed to find heading "${headingText}" after ${maxAttempts} scroll attempts`);
        }
      });
    };

    // Start the scrolling process
    tryScroll();
  });
///<reference types="Cypress-xpath"/>
