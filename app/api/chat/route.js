import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

function getTogetherApiKey() {
  let key = (process.env.TOGETHER_API_KEY || "").trim();
  if (!key) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf8").replace(/\r\n/g, "\n").replace(/^\uFEFF/, "");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (trimmed.startsWith("TOGETHER_API_KEY=")) {
            key = trimmed.slice("TOGETHER_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
            break;
          }
        }
      }
    } catch (_) {}
  }
  return key || undefined;
}

function loadBrochureText() {
  try {
    const filePath = path.join(process.cwd(), "data", "microchemmetro.txt");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading brochure text:", e);
    return "";
  }
}

function loadMicrochemmetroJson() {
  try {
    const filePath = path.join(process.cwd(), "data", "microchemmetro.json");
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.stringify(JSON.parse(raw));
  } catch (e) {
    console.error("Error reading microchemmetro.json:", e);
    return "{}";
  }
}

function loadBrochureLite() {
  try {
    const filePath = path.join(process.cwd(), "data", "microchemmetro-lite.txt");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading brochure lite:", e);
    return "";
  }
}

function loadCensusData() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-census.json");
    const raw = fs.readFileSync(filePath, "utf8");
    return raw;
  } catch (e) {
    console.error("Error reading census data:", e);
    return "[]";
  }
}

function loadPopulationByAgeSex() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-population-by-age-sex-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading population by age/sex:", e);
    return "{}";
  }
}

function loadHouseholdPopulationByAgeSex() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-age-sex-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population by age/sex:", e);
    return "{}";
  }
}

function loadHouseholdPopulationByReligion() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-religion-sex-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population by religion:", e);
    return "{}";
  }
}

function loadHouseholdPopulationByCitizenship() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-citizenship-sex-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population by citizenship:", e);
    return "{}";
  }
}

function loadHouseholdPopulationByEthnicity() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-ethnicity-sex-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population by ethnicity:", e);
    return "{}";
  }
}

function loadHouseholdPopulation5YoResidenceOfMother() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-5yo-residence-of-mother-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population 5yo residence of mother:", e);
    return "{}";
  }
}

function loadHouseholdPopulation5YoResidence5YearsAgo() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-5yo-residence-5-years-ago-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population 5yo residence 5 years ago:", e);
    return "{}";
  }
}

function loadHouseholdPopulationByRelationshipHouseholdSize() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-household-population-relationship-household-size-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading household population by relationship and household size:", e);
    return "{}";
  }
}

function loadOverseasWorkers15YoEducationAgeSex() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-overseas-workers-15yo-education-age-sex-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading overseas workers 15yo education age sex:", e);
    return "{}";
  }
}

function loadOccupiedHousingUnitsByCensus() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-occupied-housing-units-by-census-1960-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading occupied housing units by census:", e);
    return "{}";
  }
}

function loadOccupiedHousingUnitsByTypeOfBuilding() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-occupied-housing-units-by-type-of-building-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading occupied housing units by type of building:", e);
    return "{}";
  }
}

function loadOccupiedHousingUnitsConstructionFloor() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-occupied-housing-units-construction-floor-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading occupied housing units construction/floor:", e);
    return "{}";
  }
}

function loadHouseholdsByBuildingTenure() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-households-by-building-tenure-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading households by building/tenure:", e);
    return "{}";
  }
}

function loadHouseholdsLandOwnership() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-households-land-ownership-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading households land ownership:", e);
    return "{}";
  }
}

function loadHouseholdsByLanguage() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-households-by-language-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading households by language:", e);
    return "{}";
  }
}

function loadHouseholdsIntendedResidence() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-households-intended-residence-2020.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading households intended residence:", e);
    return "{}";
  }
}

function loadCagayanFaq() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-faq.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading Cagayan FAQ:", e);
    return "{}";
  }
}

function loadCagayanInnovationHub() {
  try {
    const filePath = path.join(process.cwd(), "data", "cagayan-innovation-hub.txt");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading Cagayan Innovation Hub text:", e);
    return "";
  }
}

function loadDostScholarships() {
  try {
    const filePath = path.join(process.cwd(), "data", "dost-scholarships.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading DOST scholarships:", e);
    return "{}";
  }
}

function loadDostSetupIfund() {
  try {
    const filePath = path.join(process.cwd(), "data", "dost-setup-ifund.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading DOST SETUP iFUND:", e);
    return "{}";
  }
}

function loadDostRstlTestingFlow() {
  try {
    const filePath = path.join(process.cwd(), "data", "dost-rstl-testing-flow.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading DOST RSTL testing flow:", e);
    return "{}";
  }
}

function loadDostRegion02Profile() {
  try {
    const filePath = path.join(process.cwd(), "data", "dost-region-02-profile.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading DOST Region 02 profile:", e);
    return "{}";
  }
}

function loadDostAmcenProfile() {
  try {
    const filePath = path.join(process.cwd(), "data", "dost-amcen-profile.json");
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error reading DOST AMCen profile:", e);
    return "{}";
  }
}

function loadIhubJson() {
  try {
    const filePath = path.join(process.cwd(), "data", "ihub.json");
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.stringify(JSON.parse(raw));
  } catch (e) {
    console.error("Error reading ihub.json:", e);
    return "{}";
  }
}

function loadSaraiJson() {
  try {
    const filePath = path.join(process.cwd(), "data", "sarai.json");
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.stringify(JSON.parse(raw));
  } catch (e) {
    console.error("Error reading sarai.json:", e);
    return "{}";
  }
}

const BROCHURE_TEXT = loadBrochureText();
const CENSUS_JSON = loadCensusData();
const POPULATION_AGE_SEX_JSON = loadPopulationByAgeSex();
const HOUSEHOLD_POPULATION_AGE_SEX_JSON = loadHouseholdPopulationByAgeSex();
const HOUSEHOLD_POPULATION_RELIGION_JSON = loadHouseholdPopulationByReligion();
const HOUSEHOLD_POPULATION_CITIZENSHIP_JSON = loadHouseholdPopulationByCitizenship();
const HOUSEHOLD_POPULATION_ETHNICITY_JSON = loadHouseholdPopulationByEthnicity();
const HOUSEHOLD_POPULATION_5YO_RESIDENCE_JSON = loadHouseholdPopulation5YoResidenceOfMother();
const HOUSEHOLD_POPULATION_5YO_RESIDENCE_5YA_JSON = loadHouseholdPopulation5YoResidence5YearsAgo();
const HOUSEHOLD_POPULATION_RELATIONSHIP_SIZE_JSON = loadHouseholdPopulationByRelationshipHouseholdSize();
const OVERSEAS_WORKERS_15YO_EDUCATION_JSON = loadOverseasWorkers15YoEducationAgeSex();
const OCCUPIED_HOUSING_UNITS_CENSUS_JSON = loadOccupiedHousingUnitsByCensus();
const OCCUPIED_HOUSING_UNITS_TYPE_BUILDING_JSON = loadOccupiedHousingUnitsByTypeOfBuilding();
const OCCUPIED_HOUSING_UNITS_CONSTRUCTION_FLOOR_JSON = loadOccupiedHousingUnitsConstructionFloor();
const HOUSEHOLDS_BY_BUILDING_TENURE_JSON = loadHouseholdsByBuildingTenure();
const HOUSEHOLDS_LAND_OWNERSHIP_JSON = loadHouseholdsLandOwnership();
const HOUSEHOLDS_BY_LANGUAGE_JSON = loadHouseholdsByLanguage();
const HOUSEHOLDS_INTENDED_RESIDENCE_JSON = loadHouseholdsIntendedResidence();
const CAGAYAN_FAQ_JSON = loadCagayanFaq();
const CAGAYAN_FAQ_DATA = (() => {
  try {
    return JSON.parse(CAGAYAN_FAQ_JSON || "{}");
  } catch (_) {
    return null;
  }
})();
const CAGAYAN_INNOVATION_HUB_TEXT = loadCagayanInnovationHub();
const DOST_SCHOLARSHIPS_JSON = loadDostScholarships();
const DOST_SETUP_IFUND_JSON = loadDostSetupIfund();
const DOST_RSTL_TESTING_FLOW_JSON = loadDostRstlTestingFlow();
const DOST_REGION_02_PROFILE_JSON = loadDostRegion02Profile();
const DOST_AMCEN_PROFILE_JSON = loadDostAmcenProfile();
const IHUB_JSON = loadIhubJson();
const SARAI_JSON = loadSaraiJson();

const MICROCHEMMETRO_JSON = loadMicrochemmetroJson();
const BROCHURE_LITE = loadBrochureLite();
const RSTL_FAQS_JSON = (() => {
  try {
    const d = JSON.parse(DOST_RSTL_TESTING_FLOW_JSON);
    return JSON.stringify(d.faqs || []);
  } catch (_) {
    return "[]";
  }
})();
const SETUP_FAQS_JSON = (() => {
  try {
    const d = JSON.parse(DOST_SETUP_IFUND_JSON);
    return JSON.stringify(d.faqs || []);
  } catch (_) {
    return "[]";
  }
})();
const INNOVATION_HUB_SUMMARY =
  "Cagayan Innovation Hub is a joint facility of PLGU Cagayan and DOST Cagayan Valley with Decision Intelligence Center and SARAI Provincial Hub for enterprise innovation, data-driven governance, and climate-responsive agriculture. Inaugurated 16 March 2026.";
const SCHOLARSHIPS_SUMMARY =
  "JLSS (Junior Level Science Scholarship): for qualified 2nd year S&T students. Benefits: tuition up to P40k/AY, P7k/month living allowance, thesis allowance, insurance. Apply online at ugrad.eceenrolscholarships.ph. Contact: DOST Region 02 Scholarship Unit, 0997-556-2214, sei.dost.gov.ph.";

const MAX_HISTORY_MESSAGES = 6;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TOKENS = 300;
const HISTORY_TRUNCATE_CHARS = 280;

function approxTokens(str) {
  return Math.ceil((typeof str === "string" ? str.length : 0) / 4);
}

function summarizeOlderTurns(messages, keepLastN = 4) {
  if (messages.length <= keepLastN) return messages;
  const summaryMsg = {
    role: "user",
    content: "Earlier conversation: User asked about DOST Region II services and received answers."
  };
  return [summaryMsg, ...messages.slice(-keepLastN)];
}

function buildHistoryWithTokenCap(messages, maxTokens = MAX_HISTORY_TOKENS) {
  if (messages.length === 0) return [];
  let tokens = 0;
  const kept = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const t = approxTokens(msg.content) + 4;
    if (tokens + t > maxTokens) break;
    kept.unshift(msg);
    tokens += t;
  }
  return kept;
}

function levenshtein(a, b) {
  const s = (a || "").toLowerCase();
  const t = (b || "").toLowerCase();
  const m = s.length;
  const n = t.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + cost
      );
      prev = temp;
    }
  }
  return dp[n];
}

function hasApproxWord(text, target, maxDistance = 1) {
  const cleaned = (text || "").toLowerCase();
  const t = (target || "").toLowerCase();
  if (!cleaned || !t) return false;
  const words = cleaned.split(/[^a-z]+/).filter(Boolean);
  for (const w of words) {
    if (w === t) return true;
    if (Math.abs(w.length - t.length) > maxDistance + 1) continue;
    if (levenshtein(w, t) <= maxDistance) return true;
  }
  return false;
}

const FALLBACK_SERVICES_ANSWER =
  "**DOST Region II offers these main services:**\n\n" +
  "• **RSTL (Regional Standards and Testing Laboratory)** – Testing and calibration: microbiological (water, food/feeds, plant extracts), chemical (water, food/feeds, plant extracts), and calibration services. You submit a sample, pay the fee, and claim the test report with your Job Order and Official Receipt.\n\n" +
  "• **SETUP iFUND** – Innovation-Enabling Fund assistance for MSMEs: from request and TNA, to proposal, RTEC evaluation, RD approval, MOA signing, fund release, and project implementation/monitoring.\n\n" +
  "• **Scholarships** – e.g. JLSS (Junior Level Science Scholarship) and related programs. Contact DOST Region 02 Scholarship Unit, 0997-556-2214, sei.dost.gov.ph.\n\n" +
  "• **Cagayan Innovation Hub** – Joint PLGU–DOST facility with Decision Intelligence Center and SARAI Provincial Hub.\n\n" +
  "**Contact:** DOST Region II, Regional Government Center, Carig Sur, Tuguegarao City. Phone: 0929 621 6871. Mon–Fri 8 AM–5 PM. https://region2.dost.gov.ph/";

const FALLBACK_GOVERNOR_ANSWER =
  "**Cagayan province:** The current governor of Cagayan is **Edgar \"Egay\" Batalla Aglipay** (born September 13, 1948). The vice governor is **Manuel Mamba**.\n\nFor other provinces in Region II (Batanes, Isabela, Nueva Vizcaya, Quirino), say which province you mean.";

const FALLBACK_IHUB_ANSWER =
  "**Innovation Hubs (iHubs)** – *Igniting Ideas, Fueling Innovation*\n\n" +
  "iHubs are DOST-led pre-incubation hubs that help nascent startups, students, researchers, and MSMEs develop ideas, build skills, access resources, and prepare for incubation. They bridge early-stage innovators to Technology Business Incubators (TBIs).\n\n" +
  "**Key services:** Soft skills development, mentorship, networking, startup idea validation, talent matching, collaborative workspace, business model development, and matching to TBIs.\n\n" +
  "**4Is process:** Inspire → Interact → Ideate → Initiate. Open Mon–Fri 8 AM–5 PM; registration required. **Contact:** DOST Region II, Regional Government Center, Carig Sur, Tuguegarao City. Phone: 0929 621 6871.";

const FALLBACK_SCHOLARSHIP_ANSWER =
  "**DOST Region II Scholarships**\n\n" +
  "• **JLSS (Junior Level Science Scholarship)** – For qualified 2nd year college students in science and technology. Benefits include: tuition (up to P40,000 per academic year), P7,000/month living allowance, thesis allowance, and insurance.\n\n" +
  "• **How to apply:** Online at **ugrad.eceenrolscholarships.ph**\n\n" +
  "• **Contact:** DOST Region 02 Scholarship Unit — **0997-556-2214** | sei.dost.gov.ph\n\n" +
  "• **Office:** DOST Region II, Regional Government Center, Carig Sur, Tuguegarao City. Mon–Fri 8 AM–5 PM.\n\n" +
  "Ask for “scholarship requirements” or “JLSS eligibility” if you need more details.";

const FALLBACK_PROGRAMS_ANSWER =
  "**Current DOST Region II programs and projects:**\n\n" +
  "• **RSTL** – Regional Standards and Testing Laboratory (testing, calibration)\n" +
  "• **SETUP iFUND** – Innovation-Enabling Fund for MSMEs\n" +
  "• **Scholarships** – JLSS and related programs (apply: ugrad.eceenrolscholarships.ph; contact 0997-556-2214)\n" +
  "• **Cagayan Innovation Hub** – Pre-incubation, Decision Intelligence Center, SARAI Provincial Hub\n" +
  "• **iHubs (Innovation Hubs)** – Pre-incubation for startups, students, researchers, MSMEs\n" +
  "• **Project SARAI** – Smart agriculture, crop forecasting, advisories\n" +
  "• **AMCen** – Advanced Manufacturing Center (3D printing, additive manufacturing)\n" +
  "• **OneLab** – Network of testing and calibration labs\n\n" +
  "**Contact:** DOST Region II, Carig Sur, Tuguegarao City. Phone: 0929 621 6871. https://region2.dost.gov.ph/";

const FALLBACK_DATASETS_ANSWER =
  "**What I can answer from (data/knowledge):**\n\n" +
  "• **Cagayan** – Capital, governor, population, tourism, census, economy, Innovation Hub\n" +
  "• **DOST Region II services** – RSTL (testing/calibration), SETUP iFUND, Scholarships (JLSS), contact\n" +
  "• **Programs & projects** – RSTL, SETUP iFUND, Scholarships, iHubs, SARAI, AMCen, OneLab\n" +
  "• **iHubs** – What they are, 4Is, services, hours\n" +
  "• **Project SARAI** – Smart agriculture, crops, advisories\n" +
  "• **AMCen** – Advanced manufacturing, 3D printing\n" +
  "• **OneLab / DOST profile** – Mission, vision, key officials\n\n" +
  "Ask a specific topic (e.g. “Cagayan governor”, “scholarship”, “RSTL fees”) for detailed answers.";

const CRISIS_RESPONSE =
  "If you are in crisis or having thoughts of hurting yourself, please reach out now:\n\n" +
  "• **NCMH Crisis Hotline:** 0917-899-8727 (Globe/TM) | 0922-899-8727 (Smart/Sun/TNT)\n" +
  "• **Hopeline Philippines:** 2919 (toll-free for Globe/TM)\n" +
  "• **24/7:** You are not alone; trained people are there to listen and help.\n\n" +
  "**DOST scholarships** can support your studies. For JLSS and other DOST Region II scholarships: apply at **ugrad.eceenrolscholarships.ph** or contact DOST Region 02 Scholarship Unit **0997-556-2214**, sei.dost.gov.ph. Office: DOST Region II, Carig Sur, Tuguegarao City. Mon–Fri 8 AM–5 PM.";

function getTopic(userContent) {
  const q = (userContent || "").toLowerCase();
  const mentionsCagayan =
    /cagayan|tuguegarao/i.test(q) || hasApproxWord(q, "cagayan", 2);

  if (mentionsCagayan) return "cagayan";

  if (/fee|test|sample|rstl|rml|calibration|water test|microbiolog|chemical test|coliform|calibrat|weighing|volumetric|pressure|thermometer/i.test(q)) return "rstl";
  if (/setup|ifund|proposal|tna|moa|rtec|msme|innovation.?fund/i.test(q)) return "setup";
  if (/scholarship|jlss|apply|benefits|tuition|sei|undergraduate/i.test(q)) return "scholarships";
  if (/ihub|innovation hub|pre-incubat|tbi|technology business incubat|startup ecosystem|4is|savants|sages|prefect/i.test(q)) return "ihub";
  if (/sarai|project sarai|crop forecast|agricultural monitoring|smart agriculture|cl-seams|banatech|spidtech|sarai eskwela|irrigation decision|flood extent|rainfall outlook/i.test(q)) return "sarai";
  if (/amcen|advanced manufacturing|3d print|additive manufacturing|mirdc|itdi|metals industry|industrial technology development/i.test(q)) return "amcen";
  if (/onelab|regional director|provincial director|key officials|who is.*dost|dost region.*profile|psto|history.*dost|mission|vision.*onelab/i.test(q)) return "dost";
  return "general";
}

function buildSystemPromptByTopic(topic) {
  const contact = "For more details, please ask about a specific topic related to DOST Region II and Cagayan. You can also contact DOST Region II directly at their office in Carig Sur, Tuguegarao City, or through their phone number, 0929 621 6871, from Monday to Friday, 8 AM to 5 PM, or visit their website at https://region2.dost.gov.ph/. For Cagayan province inquiries, visit https://cagayan.gov.ph/.";
  const base = "You are askTAY-EGAY, an AI chatbot developed by DOST Region II (Department of Science and Technology Region II). When asked who you are, always introduce yourself as askTAY-EGAY and mention you were developed by DOST R02. Use only the data below. Answer concisely. Format: short paragraphs, bullets (•, ✅). No markdown tables.\n\n";
  if (topic === "rstl") {
    return base + "RSTL/RML: use the brochure and FAQs below for prices, fees, sample sizes, and how to avail (submit sample, pay fee, claim with Job Order and Official Receipt).\n\n" +
      "=== RSTL/RML (lite) ===\n" + BROCHURE_LITE + "\n=== END ===\n\n=== RSTL FAQs ===\n" + RSTL_FAQS_JSON + "\n=== END ===\n\n" + contact;
  }
  if (topic === "setup") {
    return base + "SETUP iFUND: use the FAQs below for steps, flow, and time frames.\n\n=== SETUP iFUND FAQs ===\n" + SETUP_FAQS_JSON + "\n=== END ===\n\n" + contact;
  }
  if (topic === "scholarships") {
    return base + "Scholarships: use the summary below for JLSS eligibility, benefits, application, contact.\n\n=== SCHOLARSHIPS ===\n" + SCHOLARSHIPS_SUMMARY + "\n=== END ===\n\n" + contact;
  }
  if (topic === "cagayan") {
    return base + "Cagayan: use FAQ for capital, governor, tourism, economy; use Innovation Hub summary for Hub/SARAI; use census for population totals by city/municipality 1960–2020.\n\n=== CAGAYAN FAQ ===\n" + CAGAYAN_FAQ_JSON + "\n=== END ===\n\n=== INNOVATION HUB ===\n" + INNOVATION_HUB_SUMMARY + "\n=== END ===\n\n=== CENSUS ===\n" + CENSUS_JSON + "\n=== END ===\n\n" + contact;
  }
  if (topic === "dost") {
    return base + "DOST Region II profile: use the data below for agency name, OneLab (what it is, services, mission, vision), history, and key officials (Regional Director, ARDs, Provincial Directors). Answer from the profile and FAQs only.\n\n=== DOST REGION 02 PROFILE ===\n" + DOST_REGION_02_PROFILE_JSON + "\n=== END ===\n\n" + contact;
  }
  if (topic === "amcen") {
    return base + "AMCen (Advanced Manufacturing Center): use the data below for what AMCen is, goal, mission, focus areas (additive manufacturing, 3D printing), who manages it (MIRDC-ITDI partnership under DOST), process steps, and services offered (3D printing, filaments testing). Answer from the profile and FAQs only.\n\n=== AMCEN PROFILE ===\n" + DOST_AMCEN_PROFILE_JSON + "\n=== END ===\n\n" + contact;
  }
  if (topic === "ihub") {
    return base + "Innovation Hubs (iHubs): use the data below for what iHubs are, tagline, type, description, main role, vision, mission, objectives, target beneficiaries, key services, 4Is process (Inspire, Interact, Ideate, Initiate), facilities, resources, governance (regional director, advisory council, PSTDs, savants, sages, prefect), operating hours, access, and linkage to TBIs. Answer from the iHub data only.\n\n=== iHUB ===\n" + IHUB_JSON + "\n=== END ===\n\n" + contact;
  }
  if (topic === "sarai") {
    return base + "Project SARAI: use the data below for what SARAI is, tagline, type, description, main goal, priority crops, key services, process flow, key technologies, major systems (CL-SEAMS, BANATECH, SPIDTECH, SARAI Eskwela, etc.), advisory focus, monitoring outputs, capacity building, target users, and contact. Answer from the SARAI data only.\n\n=== SARAI ===\n" + SARAI_JSON + "\n=== END ===\n\n" + contact;
  }
  return base + "Answer about DOST Region II. Mention: RSTL (testing/calibration), SETUP iFUND, Scholarships (JLSS), Cagayan (FAQ, Innovation Hub), iHubs (Innovation Hubs), Project SARAI (smart agriculture), OneLab, AMCen (Advanced Manufacturing/3D printing), and key officials. Direct user to ask a specific topic for details.\n\n" + contact;
}

function buildCagayanOverviewAnswer() {
  const data = CAGAYAN_FAQ_DATA;
  const faqs = Array.isArray(data?.faq) ? data.faq : [];
  if (!faqs.length) return null;

  const findAnswer = (pattern) => {
    const re = pattern;
    for (const item of faqs) {
      const q = (item.question || "").toLowerCase();
      if (re.test(q)) return item.answer || "";
    }
    return "";
  };

  const overview = findAnswer(/what is cagayan\?/);
  const capital = findAnswer(/capital of cagayan/);
  const population = findAnswer(/population of cagayan/);
  const governor = findAnswer(/governor of cagayan/);
  const tourism = findAnswer(/some well-known tourist attractions in cagayan/);
  const tourism2 = findAnswer(/most well-known tourist attractions in cagayan/);
  const economy = findAnswer(/economy of cagayan known for/);
  const industries = findAnswer(/major industries in cagayan/);

  const lines = [];
  lines.push("Here is an overview of Cagayan based on our provincial data:");

  if (overview) {
    lines.push("");
    lines.push(overview);
  }

  const keyFacts = [];
  if (capital) keyFacts.push(`• Capital: ${capital.replace(/^the capital of cagayan is\\s*/i, "")}`);
  if (governor)
    keyFacts.push(`• Governor: ${governor.replace(/^as of 2026, the governor of cagayan is\\s*/i, "")}`);
  if (population)
    keyFacts.push(`• Population (2020 Census): ${population.replace(/^based on the 2020 census,\\s*/i, "")}`);

  if (keyFacts.length) {
    lines.push("");
    lines.push("Key facts:");
    lines.push(...keyFacts);
  }

  const tourismLines = [];
  if (tourism) tourismLines.push(`• ${tourism}`);
  if (tourism2) tourismLines.push(`• ${tourism2}`);
  if (tourismLines.length) {
    lines.push("");
    lines.push("Tourism highlights:");
    lines.push(...tourismLines);
  }

  const economyLines = [];
  if (economy) economyLines.push(`• ${economy}`);
  if (industries) economyLines.push(`• ${industries}`);
  if (economyLines.length) {
    lines.push("");
    lines.push("Economy and industries:");
    lines.push(...economyLines);
  }

  if (INNOVATION_HUB_SUMMARY) {
    lines.push("");
    lines.push(`Innovation Hub: ${INNOVATION_HUB_SUMMARY}`);
  }

  return lines.join("\n");
}

function getFallbackAnswer(userContent) {
  const q = (userContent || "").toLowerCase().trim();
  if (/who are you|what are you|your name|who is asktay|what is asktay|introduce yourself|tell me about yourself/i.test(q))
    return "I'm **askTAY-EGAY**, an AI-powered chatbot developed by **DOST Region II** (Department of Science and Technology Region II). I can help you with questions about DOST R02 programs and services, as well as information about the Province of Cagayan — from tourism and history to census data and government programs. How can I help you today?";
  if (/what services|what does dost|dost offer|offer.*dost|services.*dost|dost region.*offer/i.test(q))
    return FALLBACK_SERVICES_ANSWER;
  if (/governor|who is governor|who.*governor|vice governor/i.test(q))
    return FALLBACK_GOVERNOR_ANSWER;
  if (/ihub|i hub|innovation hub/i.test(q))
    return FALLBACK_IHUB_ANSWER;
  if (/kill myself|suicide|want to die|end my life|hurt myself|don't want to live/i.test(q))
    return CRISIS_RESPONSE;
  if (/scholar|scholarship|want to become scholar|apply for scholarship|become scholar|dost scholar|no money.*study|study.*no money/i.test(q))
    return FALLBACK_SCHOLARSHIP_ANSWER;
  if (/programs|projects|what are.*dost programs|current.*programs|dost projects/i.test(q))
    return FALLBACK_PROGRAMS_ANSWER;
  if (/data sets|datasets|what data|what information do you have|what can you tell|your data|your knowledge|what do you know/i.test(q))
    return FALLBACK_DATASETS_ANSWER;
  return null;
}

export async function POST(req) {
  const apiKey = getTogetherApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        answer:
          "TOGETHER_API_KEY is not configured on the server. Add it to .env.local in the project root and restart the dev server (e.g. stop and run npm run dev again)."
      },
      { status: 500 }
    );
  }

  let userContent = "";
  try {
    const body = await req.json();
    const rawHistory = Array.isArray(body.messages) ? body.messages : [];

    // Sanitize: filter valid messages, truncate for history to save tokens
    const sanitized = rawHistory
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
      .slice(-MAX_HISTORY_MESSAGES * 2)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, HISTORY_TRUNCATE_CHARS)
      }));

    const userMessage = sanitized
      .slice()
      .reverse()
      .find((m) => m.role === "user");
    userContent = (userMessage?.content || body.query || "").slice(
      0,
      MAX_MESSAGE_LENGTH
    );

    // Summarize older turns: keep last 2 exchanges (4 msgs), replace rest with one line
    const withSummary = summarizeOlderTurns(sanitized, 4);
    // Cap total history by token budget (400 tokens)
    const history = buildHistoryWithTokenCap(withSummary);

    // Topic router: send only relevant data to stay ~2k tokens per chat
    const topic = getTopic(userContent);

    // Deterministic overview for broad Cagayan questions, including minor typos
    if (topic === "cagayan") {
      const lower = userContent.toLowerCase();
      const isBroadCagayanQuestion =
        hasApproxWord(lower, "cagayan", 2) &&
        /(what can you tell|what.*information|what.*data|tell me about|overview|profile|general information|details)/i.test(
          lower
        );
      if (isBroadCagayanQuestion) {
        const overviewAnswer = buildCagayanOverviewAnswer();
        if (overviewAnswer) {
          return NextResponse.json({ answer: overviewAnswer });
        }
      }
    }

    const systemPrompt = buildSystemPromptByTopic(topic);

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userContent }
    ];

    const wantStream = body.stream === true;

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages,
        temperature: 0.2,
        max_tokens: 500,
        stream: wantStream
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.error?.message || `Together API error: ${response.status}`);
    }

    if (wantStream && response.body) {
      const encoder = new TextEncoder();
      let fullContent = "";
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";
              for (const line of lines) {
                if (line.startsWith("data: ") && line !== "data: [DONE]") {
                  try {
                    const json = JSON.parse(line.slice(6));
                    const chunk = json.choices?.[0]?.delta?.content;
                    if (typeof chunk === "string" && chunk) {
                      fullContent += chunk;
                      controller.enqueue(encoder.encode(JSON.stringify({ content: chunk }) + "\n"));
                    }
                  } catch (_) {}
                }
              }
            }
            if (!fullContent.trim()) {
              const fallback = getFallbackAnswer(userContent);
              const msg = fallback || "Sorry, I could not generate an answer.";
              controller.enqueue(encoder.encode(JSON.stringify({ fallback: msg }) + "\n"));
            }
            controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + "\n"));
          } catch (e) {
            controller.enqueue(encoder.encode(JSON.stringify({ error: e?.message || "Stream error" }) + "\n"));
          } finally {
            controller.close();
          }
        }
      });
      return new Response(stream, {
        headers: { "Content-Type": "application/x-ndjson", "Cache-Control": "no-cache" }
      });
    }

    const data = await response.json().catch(() => ({}));
    let answer =
      data.choices?.[0]?.message?.content ||
      "";
    if (!answer.trim()) {
      const fallback = getFallbackAnswer(userContent);
      answer = fallback || "Sorry, I could not generate an answer.";
    }

    return NextResponse.json({ answer });
  } catch (e) {
    const errMsg = e?.message || String(e);
    console.error("Chat route error:", errMsg);
    const isKeyError = /API key|TOGETHER|401|403|credentials|unauthorized/i.test(errMsg);
    const isTooLong = /request too large|reduce your message size|rate_limit|TPM|tokens/i.test(errMsg);
    let answer;
    if (isKeyError) {
      const fallback = getFallbackAnswer(userContent);
      answer = fallback
        ? `${fallback}\n\n---\n*Note: The AI chat is currently unavailable (API key issue). The information above is from our knowledge base. To restore full chat, add a valid TOGETHER_API_KEY to .env.local and restart the server.*`
        : "The chat service could not authenticate. Check that TOGETHER_API_KEY in .env.local is correct and valid, then restart the dev server (stop and run npm run dev again). See the server terminal for the exact error.";
    } else if (isTooLong)
      answer = "The request was too long for the chat service. Please try a shorter question or contact the developer to reduce the data loaded.";
    else {
      const fallback = getFallbackAnswer(userContent);
      answer = fallback || `Sorry, an error occurred: ${errMsg}`;
    }
    return NextResponse.json({ answer }, { status: 200 });
  }
}

