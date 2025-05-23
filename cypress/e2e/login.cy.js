describe('VictoryPlus Login and  Main Hub Page Test', () => {
  

  it('Logs in, scrolls the page, checks recently added visibility, and checks for broken links and missing assets', () => {
    // Visit the login page
    cy.visit('https://victoryplus.com/login');
    cy.wait(1000);

    // Log in with your credentials
    cy.loginVictoryPlus('deepthivattikuti114@gmail.com', 'Deepthi19$');
    cy.wait(1000);

    // Redirecting to main hub page
    cy.url().should('include', '/hub');
    cy.wait(5000);
    cy.dismissPopupIfExists();

    // Scroll until "Recently Added" is visible
    cy.scrollUntilHeadingVisible('Recently Added');
    cy.screenshot('recently-added-visible');

    // Scroll until "Red Bull Series" is visible (to make sure it scrolls till end of page)
    cy.scrollUntilHeadingVisible('Red Bull Series');
    cy.screenshot('red-bull-series-visible');

    // Check for broken links on the hub page
    cy.get('a').each(($link) => {
      const href = $link.prop('href');
      if (href && href.startsWith('http')) {
        cy.request({
          url: href,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.lessThan(400, `Link ${href} is broken (status: ${response.status})`);
        });
      }
    });
   // Check for missing assets
    cy.get('img, script, video, link[rel="stylesheet"]').each(($el) => {
      const src = $el.attr('src') || $el.attr('href');
      if (src && src.startsWith('http')) {
        cy.request({
          url: src,
          failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status, `Missing asset: ${src}`).to.be.lt(400);
        });
      }
    });
    });
  });
