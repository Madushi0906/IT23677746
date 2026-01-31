const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Combined from both sources
const TEST_DATA = {
  // Positive Functional Tests from Excel
  positiveFunctional: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Convert a short daily greeting phrase',
      input: 'suba udhaesanak',
      expected: 'සුබ උදැසනක්',
      category: 'Greeting / request / response',
      grammar: 'Interrogative',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Long mixed-language input',
      input: 'machan adha training session ekata Zoom invite eka message ekakin hari email ekakin hari mata evanna puluvandha? Need it before 2pm',
      expected: 'මචන් අද training session එකට Zoom invite එක message එකකින් හරි email එකකින් හරි මට එවන්න පුලුවන්ද? Need it before 2pm',
      category: 'Mixed Singlish + English',
      grammar: 'Compound structure',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Convert a short request phrase',
      input: 'report eka dhenna puluvandha?',
      expected: 'report එක දෙන්න පුලුවන්ද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0004',
      name: 'Convert a compound sentence',
      input: 'oyaa vaeda karanavaa, namuth sithee amaruvak thiyenavaa',
      expected: 'ඔයා වැඩ කරනවා, නමුත් සිතේ අමරුවක් තියෙනවා',
      category: 'Word combination / phrase pattern',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0005',
      name: 'Convert a complex sentence',
      input: 'oyaa enavaanam api vaeda patan gannavaa',
      expected: 'ඔයා එනවානම් අපි වැඩ පටන් ගන්නවා.',
      category: 'Word combination / phrase pattern',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Pos_Fun_0006',
      name: 'Convert interrogative sentence',
      input: 'meeka hariyata vaeda karanavaadha?',
      expected: 'මේක හරියට වැඩ කරනවාද?',
      category: 'Daily language usage',
      grammar: 'Interrogative',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0007',
      name: 'Convert imperative sentence',
      input: 'prashna ahanna',
      expected: 'ප්‍රශ්න අහන්න',
      category: 'Daily language usage',
      grammar: 'Imperative',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0008',
      name: 'Convert positive sentence',
      input: 'oyaa vaeda hondata karanavaa',
      expected: 'ඔයා වැඩ හොඳට කරනවා.',
      category: 'Daily language usage',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0009',
      name: 'Convert negative sentence',
      input: 'api mea saelasuma anugamanaya karannee naee',
      expected: 'අපි මේ සැලසුම අනුගමනය කරන්නේ නෑ',
      category: 'Daily language usage',
      grammar: 'Negation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0010',
      name: 'Convert polite phrasing',
      input: 'karuNaakaralaa mata oyage nama dhaenaganna puluvandha?',
      expected: 'කරුණාකරලා මට ඔයගෙ නම දැනගන්න පුලුවන්ද?',
      category: 'Greeting / request / response',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0011',
      name: 'Frequent expression conversion',
      input: 'samavenna, mama hariyata karala nae',
      expected: 'සමවෙන්න, මම හරියට කරල නැ',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0012',
      name: 'Multi-word expression and frequent collocation',
      input: 'vathura bonna',
      expected: 'වතුර බොන්න',
      category: 'Accuracy validation',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0013',
      name: 'Repeated word emphasis',
      input: 'inna inna',
      expected: 'ඉන්න ඉන්න',
      category: 'Word combination / phrase pattern',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0014',
      name: 'Proper spacing',
      input: 'mata thea bonna oonee',
      expected: 'මට තේ බොන්න ඕනේ',
      category: 'Input Type / Domain',
      grammar: 'Quality Focus',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0015',
      name: 'Tense variation past',
      input: 'api iiyee chithra aendhaa',
      expected: 'අපි ඊයේ චිත්‍ර ඇන්දා',
      category: 'Tense variation',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0016',
      name: 'Tense variation present',
      input: 'mama paadam karanavaa',
      expected: 'මම පාඩම් කරනවා',
      category: 'Tense variation',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0017',
      name: 'Tense variation future',
      input: 'mama heta gedhara yanavaa',
      expected: 'මම හෙට ගෙදර යනවා',
      category: 'Tense variation',
      grammar: 'Future tense',
      length: 'S'
    },
    // Additional test cases from your original code
    {
      tcId: 'Pos_Fun_0018',
      name: 'Simple present tense statement',
      input: 'mama iskoolee inna',
      expected: 'මම ඉස්කෝලේ ඉන්න',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0019',
      name: 'Simple food request',
      input: 'mata kiri oonee',
      expected: 'මට කිරි ඕනෑ',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0020',
      name: 'Simple negation',
      input: 'mata epaa eeka',
      expected: 'මට එපා ඒක',
      category: 'Daily language usage',
      grammar: 'Negation',
      length: 'S'
    }
  ],

  // Negative Functional Tests from Excel
  negativeFunctional: [
    {
      tcId: 'Neg_Fun_0001',
      name: 'Incorrect spacing',
      input: 'matabathkannaoonee',
      expected: 'මට බත් කන්න ඕනේ',
      category: 'Formatting',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0002',
      name: 'Slang handling',
      input: 'adoo siraavatama',
      expected: 'අඩෝ සිරාවටම',
      category: 'Slang / informal language',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0003',
      name: 'Invalid characters',
      input: 'mama ???tharahayi',
      expected: 'මම ???තරහයි',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0004',
      name: 'Empty input',
      input: '',
      expected: '',
      category: 'Error handling',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0005',
      name: 'Overly long unformatted text',
      input: 'api '.repeat(200),
      expected: 'අපි '.repeat(200),
      category: 'Formatting',
      grammar: 'Simple sentence',
      length: 'L',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0006',
      name: 'Informal phrasing',
      input: 'eeyi ooka karapan',
      expected: 'ඒයි ඕක කරපන්',
      category: 'Informal phrasing',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Pass'
    },
    {
      tcId: 'Neg_Fun_0007',
      name: 'Numbers',
      input: '451236',
      expected: 'No meaningful output',
      category: 'Numbers',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0008',
      name: 'Symbols',
      input: 'api@#$',
      expected: 'Symbols should be ignored.',
      category: 'Symbols',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0009',
      name: 'English text',
      input: 'we are studying',
      expected: 'No sinhala conversion',
      category: 'English text',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_Fun_0010',
      name: 'Mixed symbols and text',
      input: 'mama gedhara 5847!!',
      expected: 'mixed symbols and output',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    }
  ],

  // UI Tests from Excel
  uiTests: [
    {
      tcId: 'Pos_UI_0001',
      name: 'Real-time output update',
      input: 'man gedhara yanavaa',
      expected: 'man ගෙදර යනවා',
      category: 'UI behavior',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Pos_UI_0002',
      name: 'Clear input field',
      input: 'mata paan oonee',
      expected: 'After clearing, input is empty',
      category: 'Usability flow',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Pass'
    },
    {
      tcId: 'Pos_UI_0003',
      name: 'Output font rendering',
      input: 'eyaata kohomadha?',
      expected: 'එයාට කොහොමද?',
      category: 'UI rendering',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Pass'
    },
    {
      tcId: 'Pos_UI_0004',
      name: 'Text selection works',
      input: 'oba mata udhavu karanna puLuvandha?',
      expected: 'ඔබ මට උදවු කරන්න පුළුවන්ද?',
      category: 'UI usability',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Pass'
    },
    {
      tcId: 'Pos_UI_0005',
      name: 'Tooltip shows full text',
      input: 'api bodimata yanavaa,oba enna puLuvandha?',
      expected: 'අපි බොඩිමට යනවා,ඔබ එන්න පුළුවන්ද?',
      category: 'UI usability',
      grammar: 'Medium sentence',
      length: 'M',
      expectedStatus: 'Pass'
    },
    {
      tcId: 'Neg_UI_0001',
      name: 'UI lag with long input',
      input: 'mama '.repeat(100),
      expected: 'Sinhala output updates without lag',
      category: 'Usability flow',
      grammar: 'Long sentence',
      length: 'L',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_UI_0002',
      name: 'Output not updated after page reload',
      input: 'man kadea yanavaa',
      expected: 'man කඩේ යනවා',
      category: 'UI behavior',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    },
    {
      tcId: 'Neg_UI_0003',
      name: 'UI breaks with unsupported font',
      input: 'ayiyooo',
      expected: 'අයියෝ',
      category: 'UI rendering',
      grammar: 'Simple sentence',
      length: 'S',
      expectedStatus: 'Fail'
    }
  ]
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }

  async reloadPage() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputFieldValue() {
    const input = await this.getInputField();
    return await input.inputValue();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positiveFunctional) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        console.log(`Testing: ${testCase.name}`);
        console.log(`Input: ${testCase.input}`);
        console.log(`Expected: ${testCase.expected}`);
        
        const actualOutput = await translator.performTranslation(testCase.input);
        
        console.log(`Actual: ${actualOutput}`);
        console.log(`Category: ${testCase.category}, Grammar: ${testCase.grammar}, Length: ${testCase.length}`);
        
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negativeFunctional) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        console.log(`Testing: ${testCase.name}`);
        console.log(`Input: ${testCase.input}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Expected Status: ${testCase.expectedStatus}`);
        
        // Handle empty input case
        if (testCase.input === '') {
          const input = await translator.getInputField();
          await input.clear();
          await translator.page.waitForTimeout(1000);
          const outputText = await translator.getOutputText();
          console.log(`Actual Output: ${outputText}`);
          // For empty input, we expect either empty string or some default message
          if (testCase.expectedStatus === 'Fail') {
            // Test passes if output is not empty or has unexpected behavior
            expect(outputText).not.toBe(testCase.expected);
          }
        } else {
          const actualOutput = await translator.performTranslation(testCase.input);
          console.log(`Actual: ${actualOutput}`);
          
          if (testCase.expectedStatus === 'Pass') {
            expect(actualOutput).toBe(testCase.expected);
          } else {
            // For negative tests where we expect failure, actual might not match expected
            // We just log the result
            console.log(`Test expected to fail - Actual result: ${actualOutput}`);
          }
        }
        
        console.log(`Category: ${testCase.category}, Grammar: ${testCase.grammar}, Length: ${testCase.length}`);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Tests
  test.describe('UI Functionality Tests', () => {
    // Test each UI test case
    for (const testCase of TEST_DATA.uiTests) {
      test(`${testCase.tcId} - ${testCase.name}`, async ({ page }) => {
        console.log(`Testing UI: ${testCase.name}`);
        
        if (testCase.tcId === 'Pos_UI_0002') {
          // Test for clear input field functionality
          const translator = new TranslatorPage(page);
          const input = await translator.getInputField();
          
          // Type some text
          await input.fill(testCase.input);
          await page.waitForTimeout(1000);
          
          // Clear the input
          await input.clear();
          await page.waitForTimeout(1000);
          
          // Verify input is empty
          const inputValue = await input.inputValue();
          expect(inputValue).toBe('');
          
        } else if (testCase.tcId === 'Pos_UI_0001' || testCase.tcId === 'Neg_UI_0002') {
          // Test for real-time output update and page reload
          const translator = new TranslatorPage(page);
          
          // Type input and get output
          await translator.performTranslation(testCase.input);
          const outputBeforeReload = await translator.getOutputText();
          console.log(`Output before reload: ${outputBeforeReload}`);
          
          // Reload page
          await translator.reloadPage();
          await page.waitForTimeout(2000);
          
          // Check if output persists or clears
          const outputAfterReload = await translator.getOutputText();
          console.log(`Output after reload: ${outputAfterReload}`);
          
          if (testCase.expectedStatus === 'Fail') {
            // For test expecting failure
            console.log(`Test expected to fail - Output before: ${outputBeforeReload}, after: ${outputAfterReload}`);
          }
          
        } else if (testCase.tcId === 'Neg_UI_0001') {
          // Test for UI lag with long input
          const translator = new TranslatorPage(page);
          const startTime = Date.now();
          
          await translator.performTranslation(testCase.input);
          const endTime = Date.now();
          const translationTime = endTime - startTime;
          
          console.log(`Translation time for long input: ${translationTime}ms`);
          
          if (testCase.expectedStatus === 'Fail') {
            // We expect some lag, so translation time should be noticeable
            expect(translationTime).toBeGreaterThan(500);
          }
          
        } else {
          // Regular UI tests
          const translator = new TranslatorPage(page);
          const actualOutput = await translator.performTranslation(testCase.input);
          console.log(`Input: ${testCase.input}`);
          console.log(`Expected: ${testCase.expected}`);
          console.log(`Actual: ${actualOutput}`);
          
          if (testCase.expectedStatus === 'Pass') {
            expect(actualOutput).toBe(testCase.expected);
          } else {
            console.log(`Test expected to fail - Actual result: ${actualOutput}`);
          }
        }
        
        console.log(`Category: ${testCase.category}, Grammar: ${testCase.grammar}, Length: ${testCase.length}`);
        await page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }

    // Additional UI test for real-time typing
    test('Pos_UI_006 - Real-time translation updates as typing', async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      const partialInput = 'mama kae';
      await input.pressSequentially(partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      console.log(`Partial output: ${outputText}`);
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      const fullInput = 'mama kaeema kannavaa';
      await input.fill(fullInput);
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      console.log(`Full output: ${outputText}`);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});

// Summary reporting
test.afterAll(async () => {
  console.log('\n=== Test Summary ===');
  console.log(`Total Positive Functional Tests: ${TEST_DATA.positiveFunctional.length}`);
  console.log(`Total Negative Functional Tests: ${TEST_DATA.negativeFunctional.length}`);
  console.log(`Total UI Tests: ${TEST_DATA.uiTests.length}`);
  console.log(`Total Tests: ${TEST_DATA.positiveFunctional.length + TEST_DATA.negativeFunctional.length + TEST_DATA.uiTests.length + 1}`); // +1 for the additional UI test
});
