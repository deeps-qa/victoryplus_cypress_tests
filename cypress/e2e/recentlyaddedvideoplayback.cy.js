describe('VictoryPlus Recently Added Video Playback Test', () => {
  it('Logs in, opens the first item in Recently Added, and verifies video playback', () => {
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

   // Find and click the first video item in "Recently Added"
    cy.xpath("//h2[normalize-space(text())='RECENTLY ADDED']/following::img[contains(@class, 'rounded-carousel-item')][1]")
  .should('be.visible')
  .then(($img) => {
    // Check if the image is wrapped in a link or clickable parent
    const $link = $img.closest('a');
    if ($link.length) {
      cy.wrap($link).click();
    } else {
      // If no <a>, click the image directly
      cy.wrap($img).click({ force: true });
    }
  });

    // Verify the video page loads
    cy.url().should('not.include', '/hub'); // Ensure we’ve navigated away from the hub page
    cy.wait(3000); // Wait for the video page to load

    cy.get('video', { timeout: 10000 })
  .should('be.visible')
  .then(($video) => {
    // Ensure the video has a source
    const videoSrc = $video.attr('src') || $video.attr('data-src');
    expect(videoSrc, 'Video source should not be empty').to.not.be.empty;

    // Access the HTMLMediaElement directly
    const videoEl = $video[0];

    // Start the video if it’s paused
    if (videoEl.paused) {
      videoEl.play();
    }

    // Verify the video starts playing
    cy.wrap($video).should(($v) => {
      expect($v[0].paused, 'Video should be playing').to.be.false;
      expect($v[0].currentTime, 'Video should be progressing').to.be.greaterThan(0);
    });
  });

// Screenshot for evidence
cy.screenshot('video-playing');
  });
});