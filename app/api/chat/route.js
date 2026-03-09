import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

function getGroqApiKey() {
  let key = (process.env.GROQ_API_KEY || "").trim();
  if (!key) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf8");
        const match = content.match(/GROQ_API_KEY\s*=\s*(.+)/);
        if (match) key = (match[1].trim().replace(/^["']|["']$/g, "") || "").trim();
      }
    } catch (_) {}
  }
  return key || undefined;
}

const GROQ_API_KEY = getGroqApiKey();
const groq = new Groq({ apiKey: GROQ_API_KEY });

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
const CAGAYAN_INNOVATION_HUB_TEXT = loadCagayanInnovationHub();
const DOST_SCHOLARSHIPS_JSON = loadDostScholarships();
const DOST_SETUP_IFUND_JSON = loadDostSetupIfund();
const DOST_RSTL_TESTING_FLOW_JSON = loadDostRstlTestingFlow();
const DOST_REGION_02_PROFILE_JSON = loadDostRegion02Profile();
const DOST_AMCEN_PROFILE_JSON = loadDostAmcenProfile();

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
const MAX_HISTORY_TOKENS = 400;
const HISTORY_TRUNCATE_CHARS = 300;

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

const FALLBACK_SERVICES_ANSWER =
  "**DOST Region II offers these main services:**\n\n" +
  "• **RSTL (Regional Standards and Testing Laboratory)** – Testing and calibration: microbiological (water, food/feeds, plant extracts), chemical (water, food/feeds, plant extracts), and calibration services. You submit a sample, pay the fee, and claim the test report with your Job Order and Official Receipt.\n\n" +
  "• **SETUP iFUND** – Innovation-Enabling Fund assistance for MSMEs: from request and TNA, to proposal, RTEC evaluation, RD approval, MOA signing, fund release, and project implementation/monitoring.\n\n" +
  "• **Scholarships** – e.g. JLSS (Junior Level Science Scholarship) and related programs. Contact DOST Region 02 Scholarship Unit, 0997-556-2214, sei.dost.gov.ph.\n\n" +
  "• **Cagayan Innovation Hub** – Joint PLGU–DOST facility with Decision Intelligence Center and SARAI Provincial Hub.\n\n" +
  "**Contact:** DOST Region II, Regional Government Center, Carig Sur, Tuguegarao City. Phone: 0929 621 6871. Mon–Fri 8 AM–5 PM. https://region2.dost.gov.ph/";

function getTopic(userContent) {
  const q = (userContent || "").toLowerCase();
  if (/fee|test|sample|rstl|rml|calibration|water test|microbiolog|chemical test|coliform|calibrat|weighing|volumetric|pressure|thermometer/i.test(q)) return "rstl";
  if (/setup|ifund|proposal|tna|moa|rtec|msme|innovation.?fund/i.test(q)) return "setup";
  if (/scholarship|jlss|apply|benefits|tuition|sei|undergraduate/i.test(q)) return "scholarships";
  if (/cagayan|governor|capital|population|census|tourism|innovation hub|sarai|tuguegarao/i.test(q)) return "cagayan";
  if (/amcen|advanced manufacturing|3d print|additive manufacturing|mirdc|itdi|metals industry|industrial technology development/i.test(q)) return "amcen";
  if (/onelab|regional director|provincial director|key officials|who is.*dost|dost region.*profile|psto|history.*dost|mission|vision.*onelab/i.test(q)) return "dost";
  return "general";
}

function buildSystemPromptByTopic(topic) {
  const contact = "Contact: DOST Region II, Regional Government Center, Carig Sur, Tuguegarao City. Phone: 0929 621 6871. Mon–Fri 8 AM–5 PM. https://region2.dost.gov.ph/";
  const base = "You are a helpful assistant for DOST Region II. Use only the data below. Answer concisely. Format: short paragraphs, bullets (•, ✅). No markdown tables.\n\n";
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
  return base + "Answer about DOST Region II. Mention: RSTL (testing/calibration), SETUP iFUND, Scholarships (JLSS), Cagayan (FAQ, Innovation Hub), OneLab, AMCen (Advanced Manufacturing/3D printing), and key officials. Direct user to ask a specific topic for details.\n\n" + contact;
}

function getFallbackAnswer(userContent) {
  const q = (userContent || "").toLowerCase();
  if (/what services|what does dost|dost offer|offer.*dost|services.*dost|dost region.*offer/i.test(q))
    return FALLBACK_SERVICES_ANSWER;
  return null;
}

export async function POST(req) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { answer: "GROQ_API_KEY is not configured on the server. Add it to .env.local in the project root and restart the dev server (e.g. stop and run npm run dev again)." },
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
    const systemPrompt = buildSystemPromptByTopic(topic);

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userContent }
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.2,
      max_tokens: 800
    });

    const answer =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I could not generate an answer.";

    return NextResponse.json({ answer });
  } catch (e) {
    const errMsg = e?.message || String(e);
    console.error("Chat route error:", errMsg);
    const isKeyError = /API key|GROQ|401|403|credentials|unauthorized/i.test(errMsg);
    const isTooLong = /request too large|reduce your message size|rate_limit|TPM|tokens/i.test(errMsg);
    let answer;
    if (isKeyError) {
      const fallback = getFallbackAnswer(userContent);
      answer = fallback
        ? `${fallback}\n\n---\n*Note: The AI chat is currently unavailable (API key issue). The information above is from our knowledge base. To restore full chat, add a valid GROQ_API_KEY to .env.local and restart the server.*`
        : "The chat service could not authenticate. Check that GROQ_API_KEY in .env.local is correct and valid, then restart the dev server (stop and run npm run dev again). See the server terminal for the exact error.";
    } else if (isTooLong)
      answer = "The request was too long for the chat service. Please try a shorter question or contact the developer to reduce the data loaded.";
    else
      answer = `Sorry, an error occurred: ${errMsg}`;
    return NextResponse.json({ answer }, { status: 200 });
  }
}

