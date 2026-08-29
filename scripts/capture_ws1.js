const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const screens = [
  { id: '01', filename: 'screen_01_dashboard.png', name: 'Screen 01: Dashboard' },
  { id: '02', filename: 'screen_02_intake.png', name: 'Screen 02: Inspection Intake' },
  { id: '03A', filename: 'screen_03A_create_request.png', name: 'Screen 03A: Create Intake Request' },
  { id: '03B', filename: 'screen_03B_request_detail.png', name: 'Screen 03B: Intake Request Detail' },
  { id: '04', filename: 'screen_04_recommendations.png', name: 'Screen 04: Recommendations Queue' },
  { id: '05', filename: 'screen_05_recommendation_detail.png', name: 'Screen 05: Recommendation Detail' },
  { id: '06', filename: 'screen_06_plans_list.png', name: 'Screen 06: Inspection Plans List' },
  { id: '07', filename: 'screen_07_create_plan_wizard.png', name: 'Screen 07: Create Inspection Plan (8-Steps)' },
  { id: '08', filename: 'screen_08_plan_detail.png', name: 'Screen 08: Inspection Plan Detail' },
  { id: '09', filename: 'screen_09_planning_calendar.png', name: 'Screen 09: Planning Calendar' },
  { id: '10', filename: 'screen_10_schedule_inspection.png', name: 'Screen 10: Schedule Inspection' },
  { id: '11', filename: 'screen_11_conflict_resolution.png', name: 'Screen 11: Scheduling Conflict Screen' },
  { id: '12', filename: 'screen_12_overdue_inspections.png', name: 'Screen 12: Overdue Inspections' },
  { id: '13', filename: 'screen_13_plan_audit.png', name: 'Screen 13: Plan Audit & Activity' },
  { id: '14', filename: 'screen_14_inspection_hub.png', name: 'Screen 14: Central Inspection Hub' },
  { id: '15', filename: 'screen_15_active_monitoring.png', name: 'Screen 15: Active Field Monitoring' },
  { id: '16', filename: 'screen_16_findings_monitoring.png', name: 'Screen 16: Findings Monitoring' },
  { id: '17', filename: 'screen_17_capa_monitoring.png', name: 'Screen 17: CAPA Monitoring' },
  { id: '18', filename: 'screen_18_report_status.png', name: 'Screen 18: Report Status' }
];

async function captureScreenshots() {
  const outDir = path.join(__dirname, '..', 'screenshots', 'workspace1');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  for (const scr of screens) {
    const url = `http://localhost:3001/?screen=${scr.id}`;
    console.log(`Capturing ${scr.name} from ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, 600)); // Allow render animations to settle
      const filePath = path.join(outDir, scr.filename);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`✓ Saved ${scr.filename}`);
    } catch (err) {
      console.error(`✗ Error capturing ${scr.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
