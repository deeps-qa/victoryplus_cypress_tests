// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    video: true, // Enable video recording
    videosFolder: 'cypress/videos', // Default folder for videos
    videoCompression: 32, // Optional: adjust compression (lower value = higher quality, larger file)
    trashAssetsBeforeRuns: true, // Clear videos before each run
  },
});