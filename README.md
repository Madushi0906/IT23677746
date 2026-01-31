#IT3040 Assignment 1
#Student Registration Number - IT23677746
#Project Description
-This project contains automated tests for the SwiftTranslator Singlish to Sinhala conversion system using Playwright.
-The test cover positive, negative, and UI case scenarios related to singlish to sinhala translation.

## Project Overview

This test suite validates the functionality of the SwiftTranslator web application by testing:
- 24 positive functional scenarios
- 10 negative functional scenarios  
- 1 UI-related test scenario

## Prerequisites

Before running the tests, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Technology used
Playwright
Typescript
Node.js

## Installation

### Step 1: Clone or Download the Repository

If you have the project as a zip file, extract it. If it's a Git repository:

```bash
git clone <repository-url>
cd <project-directory>

### Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install

### Step 3: Install Playwright Browsers

After installing dependencies, install the required browsers:

```bash
npx playwright install chromium

## Project Structure

.
├── swifttranslator.spec.js           
├── playwright.config.js              
├── package.json                      
└── README.md                         

##Running the Tests

To run all tests:
npx playwright test
To run tests in headed mode:
npx playwright test --headed

##Notes
The Github repository is publicity accessible.
Test cases were designed individually without using the sample test cases provided.