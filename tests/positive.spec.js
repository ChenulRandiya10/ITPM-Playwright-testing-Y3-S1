const { test, expect } = require('@playwright/test');

// You can expand this array to include all 34+ required scenarios
const scenarios = [
  { 
    id: 'Pos_Fun_0001', 
    name: 'Simple sentence', 
    input: 'mama potha kiyavanavaa.', 
    expected: 'මම පොත කියවනවා.' 
  },
  { 
    id: 'Pos_Fun_0002', 
    name: 'Simple negative sentence', 
    input: 'mata thee oonee naehae.', 
    expected: 'මට තේ ඕනේ නැහැ.' 
  },
  { 
    id: 'Pos_Fun_0003', 
    name: 'Compound sentences', 
    input: 'api shopping yamu, saha passe coffee bonna puluvan.', 
    expected: 'අපි shopping යමු, සහ පස්සෙ coffee බොන්න පුලුවන්.' 
  },
  { 
    id: 'Pos_Fun_0004', 
    name: 'Complex sentences', 
    input: 'oyaa adha enavaa nam api chithrapatayak balamu.', 
    expected: 'ඔයා අද එනවා නම් අපි චිත්‍රපටයක් බලමු.' 
  },
  { 
    id: 'Pos_Fun_0005', 
    name: 'Interrogative forms', 
    input: 'oyaata kaalayak thiyenavaadha?', 
    expected: 'ඔයාට කාලයක් තියෙනවාද?' 
  },
  { 
    id: 'Pos_Fun_0006', 
    name: 'Imperative forms', 
    input: 'hithala balanna.', 
    expected: 'හිතල බලන්න.' 
  },
  { 
    id: 'Pos_Fun_0007', 
    name: 'Greeting polite', 
    input: 'suba dhavasak! oyaata kohomadha?', 
    expected: 'සුබ දවසක්! ඔයාට කොහොමද?' 
  },
  { 
    id: 'Pos_Fun_0008', 
    name: 'Informal phrasing', 
    input: 'baeeg eka dhenna.', 
    expected: 'බෑග් එක දෙන්න.' 
  },
  { 
    id: 'Pos_Fun_0009', 
    name: 'Polite request', 
    input: 'karuNaakaralaa magee baeeg eka ganna puLuvandha?', 
    expected: 'කරුණාකරලා මගේ බෑග් එක ගන්න පුළුවන්ද?' 
  },
  { 
    id: 'Pos_Fun_0010', 
    name: 'Frequently used day-to-day expressions', 
    input: 'hariyata balalaa kiyanna.', 
    expected: 'හරියට බලලා කියන්න.' 
  },
  { 
    id: 'Pos_Fun_0011', 
    name: 'Repeated words for emphasis', 
    input: 'ikmanata ikmanata enna.', 
    expected: 'ඉක්මනට ඉක්මනට එන්න.' 
  },
  { 
    id: 'Pos_Fun_0012', 
    name: 'Informal greeting', 
    input: 'mokadha machaQQ, hari dha?', 
    expected: 'මොකද මචං, හරි ද?' 
  },
  { 
    id: 'Pos_Fun_0013', 
    name: 'Mixed language (English + Singlish, short)', 
    input: 'meeting eka Zoom valin thiyenavaa.', 
    expected: 'meeting එක Zoom වලින් තියෙනවා.' 
  },
  { 
    id: 'Pos_Fun_0014', 
    name: 'Mixed language with abbreviations', 
    input: 'OTP eka SMS valin enavaa.', 
    expected: 'OTP එක SMS වලින් එනවා.' 
  },
  { 
    id: 'Pos_Fun_0015', 
    name: 'Joined wordsjoined words (stress test)', 
    input: 'oyaa ennavaadha?', 
    expected: 'ඔයා එන්නවාද?' 
  },
  { 
    id: 'Pos_Fun_0016', 
    name: 'Repeated word expressions used for emphasis', 
    input: 'ela ela.', 
    expected: 'එල එල.' 
  },
  { 
    id: 'Pos_Fun_0017', 
    name: 'Past Tense variations', 
    input: 'api iiye match ekak gehuvaa', 
    expected: 'අපි ඊයෙ match එකක් ගෙහුවා' 
  },
  { 
    id: 'Pos_Fun_0018', 
    name: 'Future Tense variations', 
    input: 'api sellam karanavaa', 
    expected: 'අපි සෙල්ලම් කරනවා' 
  },
  { 
    id: 'Pos_Fun_0019', 
    name: 'Negation patterns', 
    input: 'mata monavath kanna baee.', 
    expected: 'මට මොනවත් කන්න බෑ.' 
  },
  { 
    id: 'Pos_Fun_0020', 
    name: 'Medium input', 
    input: 'adha ude mama bank giyaa. queue eka loku nisaa tikak vela gaththaa. passe card eka use karala payment eka karalaa gedara avaa.', 
    expected: 'අද උඩෙ මම bank ගියා. queue එක ලොකු නිසා ටිකක් වෙල ගත්තා. පස්සෙ card එක use කරල payment එක කරලා ගෙඩර අවා.' 
  },
  { 
    id: 'Pos_Fun_0021', 
    name: 'Long input', 
    input: 'adha dhavasema api team ekath ekka project discussion ekak karaa. first presentation eka PowerPoint walin pennuvaa. passe feedback gaththaa saha changes tika note karaa. lunch passe email ekak yavalaa final report eka attach kalaa. meeting eka 3.30 PM valata ivaraara unaa, ehema nisaa api plan karaa heta review session ekak karanna. thava podi vaeda tikak thiyenavaa, namuth team eka hariyata co-operate karanavaa kiyala hithenavaa.', 
    expected: 'අද දවසෙම අපි team එකත් එක්ක project discussion එකක් කරා. first presentation එක ඵොwඑර්ඵොඉන්ට් wඅලින් පෙන්නුවා. පස්සෙ feedback ගත්තා සහ changes ටික note කරා. lunch පස්සෙ email එකක් යවලා final report එක attach කලා. meeting එක 3.30 PM වලට ඉවරාර උනා, එහෙම නිසා අපි plan කරා හෙට review session එකක් කරන්න. තව පොඩි වැඩ ටිකක් තියෙනවා, නමුත් team එක හරියට co-operate කරනවා කියල හිතෙනවා.' 
  },
  { 
    id: 'Pos_Fun_0022', 
    name: 'Long input', 
    input: 'dhosthara kivvaa meeka apita kohoma veevi dha kiyalaa hariyata ma kiyanna baehae kiyalaa. mee vagee sidhDhiyak lQQkaavee vaarthaa velaa naehae kivvaa koheevath. adu ma gaaNee pitaratakavath vaarthaa velaa thiyenavaa kiyalaa kiyanna baehae kivvaa. meeka ganna loku jiivitha avadhaanamak thiyenavaa kivvaa.', 
    expected: 'දොස්තර කිව්වා මේක අපිට කොහොම වේවි ද කියලා හරියට ම කියන්න බැහැ කියලා. මේ වගේ සිද්ධියක් ලංකාවේ වාර්තා වෙලා නැහැ කිව්වා කොහේවත්. අඩු ම ගාණේ පිටරටකවත් වාර්තා වෙලා තියෙනවා කියලා කියන්න බැහැ කිව්වා. මේක ගන්න ලොකු ජීවිත අවදානමක් තියෙනවා කිව්වා.' 
  },
  { 
    id: 'Pos_Fun_0023', 
    name: 'Polite phrasing', 
    input: 'maayaa mRUdhukaaQQga injineeruvariyaka lesa raekiyaavee niratha viimata thooraa gaththee ema kSheethraya kerehi aeya thuLa vuu aashaava nisaa ya.', 
    expected: 'මායා මෘදුකාංග ඉන්ජිනේරුවරියක ලෙස රැකියාවේ නිරත වීමට තෝරා ගත්තේ එම ක්ෂේත්‍රය කෙරෙහි ඇය තුළ වූ ආශාව නිසා ය.' 
  },
  { 
    id: 'Pos_Fun_0024', 
    name: 'Informal phrasing', 
    input: 'oi mage wifi eka vaeda karanne nae, ubata 2025/10/24 venidhata enna puluvan dha balanna mokdha velaa thiyanne kiyalaa. meeka kaedila nisa kisi vaedak kara gannath nae bQQ.', 
    expected: 'oi mage wifi එක වැඩ කරන්නේ නැ, උබට 2025/10/24 වෙනිදට එන්න පුලුවන් ද බලන්න මොක්ද වෙලා තියන්නෙ කියලා. මේක කැඩිල නිස කිසි වැඩක් කර ගන්නත් නැ බං.' 
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
    if (scenario.id.startsWith('Pos')) {
        expect(actualOutput.trim()).toBe(scenario.expected);
    }
  });
}