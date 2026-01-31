const { test, expect } = require('@playwright/test');

// You can expand this array to include all 34+ required scenarios
const scenarios = [
  { 
    id: 'Neg_Fun_0001', 
    name: 'Incorrect Phonetics', 
    input: 'oyaata bath oni da?', 
    expected: 'ඔයාට බත් ඔනි ද?' 
  },
  { 
    id: 'Neg_Fun_0002', 
    name: 'Mixed Singlish with chat abbreviations', 
    input: 'mama tmrw office enna hithaana inne bcz meeting ekak tnx bro', 
    expected: 'මම හෙට office එන්න හිතාන ඉන්නේ මොකද meeting එකක් ස්තුති සහොදරයා' 
  },
  { 
    id: 'Neg_Fun_0003', 
    name: 'Incorrect Phonetics', 
    input: 'eka hari awul', 
    expected: 'එක හරි අවුල්' 
  },
  { 
    id: 'Neg_Fun_0004', 
    name: 'Incorrect Phonetic Transliteration', 
    input: 'aurudda hodhin gevunaa.', 
    expected: 'අවුරුද්ද හොදින් ගෙවුනා.' 
  },
  { 
    id: 'Neg_Fun_0005', 
    name: 'Greeting Phonetics Issue', 
    input: 'suba nava vasarak veevaa!', 
    expected: 'සුභ නව වසරක් වේවා!' 
  },
  { 
    id: 'Neg_Fun_0006', 
    name: 'Symbol Confusion', 
    input: 'mem@ sathiya thuLa (janavaari 26 sita janavaari 30 dhakvaa) dheeshana, nibanDhana, praayoogika saesi hoo aegayiim sidhu nokeree. maathRUkaa anumatha kiriimee idhiripath kiriim pebaravaari 2 vana dhina sita aaramBha vana sathiyee sit@ aaramBha ve.', 
    expected: 'මෙම සතිය තුළ (ජනවාරි 26 සිට ජනවාරි 30 දක්වා) දේශන, නිබන්ධන, ප්‍රායෝගික සැසි හෝ ඇගයීම් සිදු නොකෙරේ. මාතෘකා අනුමත කිරීමේ ඉදිරිපත් කිරීම් පෙබරවාරි 2 වන දින සිට ආරම්භ වන සතියේ සිට ආරම්භ වේ.' 
  },
  { 
    id: 'Neg_Fun_0007', 
    name: 'Input field accepts but cannot process emoji', 
    input: 'adha mata sathutu dhavasak 😆', 
    expected: 'අද මට සතුටු දවසක්' 
  },
  { 
    id: 'Neg_Fun_0008', 
    name: 'Excessive Spacing', 
    input: 'yamu  vatayak  dhaanna', 
    expected: 'යමු වටයක් දාන්න' 
  },
  { 
    id: 'Neg_Fun_0009', 
    name: 'No Spacing Stress', 
    input: 'eyaareportekasubmitkaralathiyenavaa', 
    expected: 'එයා report එක submit කරල තියෙනවා' 
  },
  { 
    id: 'Neg_Fun_0010', 
    name: 'Name Transliteration Issue', 
    input: 'chamodya iiye giyaa', 
    expected: 'චමොද්‍ය ඊයෙ ගියා' 
  },
];

for (const scenario of scenarios) {
  test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    // Input: Singlish text box [cite: 303]
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.pressSequentially(scenario.input, { delay: 30 });

    // Output: The specific results div we found in your DevTools
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();

    // Verification: Real-time update check [cite: 372, 392]
    await expect(outputDiv).not.toBeEmpty({ timeout: 10000 });
    
    const actualOutput = await outputDiv.innerText();
    console.log(`TC ID: ${scenario.id} | Actual: ${actualOutput}`);

    // Requirements check: Save a screenshot for your report evidence
    await page.screenshot({ path: `screenshots/${scenario.id}.png` });

    // Status Check
    // Note: For Neg_Fun tests, you might expect the output to be messy
    if (scenario.id.startsWith('Neg')) {
        expect(actualOutput.trim()).toBe(scenario.expected);
    }
  });
}