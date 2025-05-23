# VictoryPlus Cypress Automation Challenge

This project is a response to a QA technical assessment for A Parent Media Co. (VictoryPlus platform). It uses Cypress to automate tests related to login functionality, hub page validation, content verification, and video playback.

# What's Covered

The test suite includes the following:

- ✅ **Login Test:** Logs into VictoryPlus using valid credentials
- ✅ **Scroll & Visibility Checks:**
  - Scrolls to and confirms visibility of "Recently Added"
  - Scrolls to and confirms visibility of "Red Bull Series"(to make sure it reaches end of the page)
- ✅ **Broken Links Check:** Verifies that all anchor links return status < 400
- ✅ **Missing Asset Check:** Validates that images, scripts, and stylesheets are loading successfully
- ✅ **Video Interaction Test:**
  - Clicks the first video in "Recently Added"
  - Verifies redirection to a detail page
  - Validates that the video starts playing


## 📦 Reusable Functions

To improve code modularity and avoid repetition, I’ve added custom reusable commands in the `cypress/support/commands.js` file:

- `cy.loginVictoryPlus(email, password)` – Automates the login process
- `cy.dismissPopupIfExists()` – Detects and dismisses post-login popups (like "Later")
- `cy.scrollUntilHeadingVisible(headingText)` – Scrolls the page until a specific section heading (like "Recently Added") becomes visible
These commands help keep the test cases clean, readable, and maintainable.
---
## 🧪 How to Run the Tests


### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/victoryplus-cypress-tests.git
cd victoryplus-cypress-tests

2. Install Dependencies
```bash
npm install
# (Ensure Node.js is installed before running 'npm install')

3. Run All Tests (Headless + Video Recording)
'''bash
npx cypress run

4. Open Cypress Test Runner (Optional)
bash
npx cypress open


