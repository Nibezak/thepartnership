export type AppRoute = "/" | "/about" | "/work" | "/clients" | "/contact";

export const NAV_ROUTES: { path: AppRoute; label: string }[] = [
  { path: "/about", label: "About Us" },
  { path: "/work", label: "Our Work" },
  { path: "/clients", label: "Clients" },
];

export interface CaseMetric {
  value: number;
  suffix: string;
  label: string;
}

export interface AgencyCaseStudy {
  id: string;
  client: string;
  sector: string;
  title: string;
  tagline: string;
  crop: string;
  alt: string;
  markets: string;
  year: string;
  overview: string;
  problem: string;
  solution: string;
  quote: string;
  quoteBy: string;
  deliverables: string[];
  coalitionPartners: string[];
  metrics: CaseMetric[];
}

export const AGENCY_CASE_STUDIES: AgencyCaseStudy[] = [
  {
    id: "spotify-east-africa",
    client: "Spotify",
    sector: "Music, Audio & Youth Culture",
    title: "Turning East African street sound into continental cultural dominance.",
    tagline: "Hyper-local creator coalitions & playlist storytelling across Kenya, Uganda, and Tanzania.",
    crop: "work1:3",
    alt: "Spotify East Africa youth music and creator culture campaign",
    markets: "Kenya · Uganda · Tanzania",
    year: "2024–2025",
    overview:
      "Spotify needed to deepen emotional relevance with Gen-Z and millennial listeners across East Africa—moving beyond global templates to celebrate homegrown Kenyan, Ugandan, and Tanzanian sound.",
    problem:
      "Global streaming campaigns often feel imported. To win daily listening habits, Spotify had to embed itself inside campus culture, matatu sound systems, and emerging creator communities.",
    solution:
      "Through our Indahash creator coalition and local cultural scouts, we built participatory playlist drops, live listening pop-ups, and short-form social reels led by neighborhood tastemakers.",
    quote:
      "When you hand the mic to local creators backed by sharp strategy, culture does the distribution for you.",
    quoteBy: "The Partnership Coalition Team · Nairobi",
    deliverables: [
      "Cultural Strategy & Problem ID",
      "Indahash Creator Coalitions",
      "Short-Form Reels & Social",
      "On-Ground Listening Pop-Ups",
    ],
    coalitionPartners: ["Publicis Groupe Africa", "Indahash", "Yellow Agency"],
    metrics: [
      { value: 3, suffix: "x", label: "Creator Engagement Lift" },
      { value: 14, suffix: "M+", label: "Organic Social Impressions" },
      { value: 4, suffix: "", label: "East African Markets" },
    ],
  },
  {
    id: "airtel-africa",
    client: "Airtel Africa",
    sector: "Telecommunications & Mobile Money",
    title: "A reason to imagine across East Africa’s fastest-moving mobile markets.",
    tagline: "Multi-market brand platform connecting telecom velocity with everyday human progress.",
    crop: "work1:1",
    alt: "Airtel Africa integrated brand campaign frame",
    markets: "Kenya · Uganda · Tanzania · Rwanda",
    year: "2024–2025",
    overview:
      "Across East Africa, Airtel Africa serves millions of entrepreneurs, students, and families relying on fast data and Airtel Money. Our mandate was to translate technical network strength into unmistakable emotional leadership.",
    problem:
      "Telecom communications across the region easily blur into price-war noise. Airtel needed a unified through-the-line system flexible enough for local nuance in every market.",
    solution:
      "Combining Nairobi creative direction with Publicis Groupe Africa’s regional alliance, we engineered a single modular creative platform spanning TVC, OOH, retail trade, and mobile-first video.",
    quote:
      "True client, agency, and platform coalition is what lets one bold idea scale across borders without losing soul.",
    quoteBy: "Regional Coalition Lead · Airtel Mandate",
    deliverables: [
      "Integrated ATL Film & OOH",
      "Airtel Money Retail Systems",
      "Multi-Market Adaptation",
      "Digital & Influencer Rollout",
    ],
    coalitionPartners: ["Publicis Groupe Africa", "TDF Group", "P&L Consulting"],
    metrics: [
      { value: 12, suffix: "+", label: "Connected Regional Touchpoints" },
      { value: 360, suffix: "°", label: "Through-the-Line Reach" },
      { value: 42, suffix: "%", label: "Brand Recall Lift" },
    ],
  },
  {
    id: "kcb-group",
    client: "KCB Group",
    sector: "Banking & Financial Inclusion",
    title: "Moving East Africa forward with human-first financial storytelling.",
    tagline: "Turning retail banking, MSME lending, and digital finance into relatable everyday ambition.",
    crop: "work1:0",
    alt: "KCB Group financial inclusion and SME campaign",
    markets: "Kenya · East Africa",
    year: "2024",
    overview:
      "As one of East Africa’s largest financial institutions, KCB sits at the center of personal milestones and SME enterprise. We partnered to sharpen how KCB communicates modern digital banking without losing its grassroots trust.",
    problem:
      "Legacy banking messaging felt institutional while fintech challengers spoke in agile, lifestyle-led formats. KCB needed both authority and cultural warmth.",
    solution:
      "We anchored the campaign around real East African hustlers, traders, and families—deploying snackable social explainers, regional radio, branch experiences, and high-impact film.",
    quote:
      "Great financial influence is built when problem identification starts on the street, not just in a boardroom.",
    quoteBy: "Strategy Practice · Nairobi HQ",
    deliverables: [
      "Consumer & MSME Insights",
      "Digital & Mobile-First Content",
      "Branch & Experiential Activation",
      "Integrated Campaign Production",
    ],
    coalitionPartners: ["Publicis Groupe Africa", "P&L Consulting"],
    metrics: [
      { value: 8, suffix: "M+", label: "Regional Campaign Reach" },
      { value: 64, suffix: "%", label: "Video Completion Rate" },
      { value: 5, suffix: "x", label: "Digital Lead Velocity" },
    ],
  },
  {
    id: "diageo-tusker",
    client: "Diageo / KBL · Tusker",
    sector: "Beverage & Cultural Heritage",
    title: "Celebrating East African pride from stadium anthems to neighborhood bars.",
    tagline: "Through-the-line influence for Diageo & Tusker across broadcast, experiential, and trade.",
    crop: "work1:2",
    alt: "Diageo and Tusker through-the-line celebration campaign",
    markets: "Kenya · East Africa",
    year: "2024–2025",
    overview:
      "Tusker isn’t just a beverage—it is woven into East African sports, music, and shared celebration. Working within the Diageo / KBL ecosystem requires seamless connection between Big Ideas and sharp on-trade execution.",
    problem:
      "Maintaining iconic cultural status with younger legal-drinking-age consumers while driving immediate footfall and conversion across thousands of regional outlets.",
    solution:
      "We paired anthem-grade creative platforms with hyper-targeted experiential festivals, influencer moments, and crisp BTL point-of-sale craft.",
    quote:
      "When ATL courage and BTL street execution share one brain, brands become unmissable.",
    quoteBy: "Execution Coalition · Westlands Studio",
    deliverables: [
      "Through-the-Line Brand Platforms",
      "Festival & Sports Experiential",
      "On-Trade Retail & POS Craft",
      "Creator & Social Storytelling",
    ],
    coalitionPartners: ["Publicis Groupe Africa", "Yellow Agency", "TDF Group"],
    metrics: [
      { value: 250, suffix: "+", label: "Activated Regional Venues" },
      { value: 91, suffix: "%", label: "Brief-to-Market Alignment" },
      { value: 100, suffix: "+", label: "Years Combined Leadership" },
    ],
  },
];

export interface ProcessStage {
  step: string;
  title: string;
  lead: string;
  detail: string;
  tags: string[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: "01",
    title: "Problem Identification",
    lead: "We start by diagnosing the real commercial and cultural tension—never just writing a brief around a hunch.",
    detail:
      "Pairing qualitative street immersion across Nairobi, Kampala, Dar es Salaam, and Kigali with category intelligence to pinpoint the single barrier unlocking growth.",
    tags: ["Category Audit", "Cultural Immersion", "Audience Truth"],
  },
  {
    step: "02",
    title: "Strategy & Coalition Architecture",
    lead: "Selecting the exact mix of talent, technology, platforms, and channels required to win.",
    detail:
      "Instead of forcing every problem through one department, we assemble bespoke coalitions—drawing on Publicis Groupe Africa, Indahash creators, and specialist partners.",
    tags: ["Brand Positioning", "Channel Orchestration", "Coalition Mapping"],
  },
  {
    step: "03",
    title: "The Brave Creative Idea",
    lead: "Ideas built with heart, mind, and instinct that earn attention rather than renting it.",
    detail:
      "From anthem brand films for Airtel Africa and KCB to youth-coded social drops for Spotify, we craft concepts people actively share and talk about.",
    tags: ["Creative Platforms", "Film & Motion", "Social Formats"],
  },
  {
    step: "04",
    title: "Through-the-Line Execution",
    lead: "One continuous thread from broadcast down to retail shelf, festival stage, and creator feed.",
    detail:
      "Zero handoff friction between strategy, ATL production, BTL experiential, and creator amplification—maximizing every shilling of media and production investment.",
    tags: ["ATL & Digital", "BTL & Retail", "Creator Amplification"],
  },
];

export interface LeadershipProfile {
  name: string;
  role: string;
  bio: string;
  crop: string;
  focus: string;
}

export const LEADERSHIP_TEAM: LeadershipProfile[] = [
  {
    name: "Sandeep Madan",
    role: "Chief Executive Officer",
    bio: "Architecting multi-market brand growth and strategic coalitions across East Africa and Asia—uniting client commercial goals with Publicis Groupe Africa’s continental firepower.",
    crop: "team1:0",
    focus: "Coalition Strategy & Growth",
  },
  {
    name: "Sally Sawe",
    role: "Chief Operating Officer",
    bio: "Driving operational velocity, partner orchestration, and seamless through-the-line delivery across Kenya, Uganda, Tanzania, and Rwanda.",
    crop: "team2:0",
    focus: "Operations & Regional Delivery",
  },
  {
    name: "Deepesh Jha",
    role: "Chief Creative Officer",
    bio: "Leading creative courage across film, brand platforms, and social culture—crafting ideas with heart, mind, and instinct that move consumers across two continents.",
    crop: "team1:1",
    focus: "Creative Direction & Craft",
  },
];

export type ClientCategory =
  | "All"
  | "Tech & Audio"
  | "Telecom & Finance"
  | "FMCG & Beverage"
  | "Automotive"
  | "Coalition Partners";

export interface ClientRosterItem {
  name: string;
  category: Exclude<ClientCategory, "All">;
  scope: string;
  highlight: string;
  featured?: boolean;
}

export const CLIENT_ROSTER: ClientRosterItem[] = [
  {
    name: "Spotify",
    category: "Tech & Audio",
    scope: "Youth Culture · Creators · Social Reels",
    highlight: "East African sound storytelling, campus influence, and Indahash creator activations.",
    featured: true,
  },
  {
    name: "Airtel Africa",
    category: "Telecom & Finance",
    scope: "Integrated ATL · BTL · Airtel Money",
    highlight: "Multi-market brand campaigns connecting high-speed data and mobile money across East Africa.",
    featured: true,
  },
  {
    name: "KCB Group",
    category: "Telecom & Finance",
    scope: "Strategy · Film · Digital Banking",
    highlight: "Human-led financial inclusion, MSME storytelling, and regional brand momentum.",
    featured: true,
  },
  {
    name: "Diageo / KBL · Tusker",
    category: "FMCG & Beverage",
    scope: "Through-the-Line · Experiential · Trade",
    highlight: "Iconic East African beverage platforms uniting sports culture, music, and on-trade impact.",
    featured: true,
  },
  {
    name: "Isuzu East Africa",
    category: "Automotive",
    scope: "Brand Campaigns · Digital · BTL",
    highlight: "Tough, reliable mobility narratives built for commercial fleets and East African terrain.",
  },
  {
    name: "Capwell Industries",
    category: "FMCG & Beverage",
    scope: "Consumer Influence · Retail Activation",
    highlight: "Trusted household food brands including Soko and Pearl connected with modern families.",
  },
  {
    name: "Publicis Groupe Africa",
    category: "Coalition Partners",
    scope: "Global Network & Media Alliance",
    highlight: "Strategic global backing giving East African brands world-class tools, data, and reach.",
  },
  {
    name: "Indahash",
    category: "Coalition Partners",
    scope: "Global Creator Technology Platform",
    highlight: "Automated, measurable creator coalitions across thousands of vetted East African voices.",
  },
  {
    name: "TDF Group",
    category: "Coalition Partners",
    scope: "Digital, Tech & Production Partner",
    highlight: "Specialized digital engineering and interactive campaign production inside the coalition.",
  },
  {
    name: "Yellow Agency",
    category: "Coalition Partners",
    scope: "Design, Experiential & Activation",
    highlight: "High-craft brand design and experiential production partner in the coalition network.",
  },
  {
    name: "P&L Consulting",
    category: "Coalition Partners",
    scope: "Commercial & Market Intelligence",
    highlight: "Sharp business consulting and category strategy anchoring every brief in ROI.",
  },
];

export const AGENCY_FAQS: { q: string; a: string }[] = [
  {
    q: "What makes The Partnership Africa different from a traditional ad agency?",
    a: "In an industry plagued with 'who did what', we believe in 'we'. Rather than locking brands into rigid silos, we assemble tailored coalitions—uniting our core Nairobi strategy and creative leadership with Publicis Groupe Africa, Indahash creators, TDF Group, Yellow, and P&L Consulting.",
  },
  {
    q: "Which markets do you operate across?",
    a: "Our studio hub is in Westlands Square, Nairobi, Kenya, with seamless multi-market execution across Uganda, Tanzania, Rwanda, and broader East Africa through our Publicis Groupe Africa alliance.",
  },
  {
    q: "Do you handle both strategy and full through-the-line execution?",
    a: "Yes. Every engagement moves through four connected stages: Problem Identification, Strategy, Creative Idea, and Through-the-Line Execution (spanning film, social, creator marketing, digital, OOH, experiential, and retail trade).",
  },
  {
    q: "How do brands like Spotify, Airtel Africa, KCB, and Diageo work with your coalition?",
    a: "Depending on the challenge, clients engage us as their lead strategic and creative partner or plug directly into our specialist coalition pods for regional launches, youth creator drops, or full 360° integrated campaigns.",
  },
];

export interface InstagramCampaignEmbed {
  id: string;
  shortcode: string;
  client: string;
  campaignTitle: string;
  metricBadge: string;
  caption: string;
  permalink: string;
  embedUrl: string;
  videoSrc: string;
  posterSrc: string;
}

export const INSTAGRAM_EMBEDS: InstagramCampaignEmbed[] = [
  {
    id: "ig-spotify",
    shortcode: "DdGpBHmiERt",
    client: "Spotify · East Africa",
    campaignTitle: "Street Sound & Creator Influence Reel",
    metricBadge: "100M+ Views · Coalition Social",
    caption:
      "Youth culture, street tastemakers, and short-form social storytelling driving everyday listening habits across East Africa.",
    permalink:
      "https://www.instagram.com/reel/DdGpBHmiERt/?utm_source=ig_embed&utm_campaign=loading",
    embedUrl: "https://www.instagram.com/reel/DdGpBHmiERt/embed",
    videoSrc: "/assets/partnership/vertical_X_01.mp4",
    posterSrc: "/assets/partnership/vertical_X_01-poster-00001.jpg",
  },
  {
    id: "ig-mothers-day",
    shortcode: "DYJhXkCs7UP",
    client: "Mother’s Day Coalition Drop",
    campaignTitle: "Heart, Mind & Cultural Storytelling",
    metricBadge: "High-Share Cultural Film",
    caption:
      "Emotion-led regional storytelling built around lived East African moments and community sentiment.",
    permalink:
      "https://www.instagram.com/reel/DYJhXkCs7UP/?utm_source=ig_embed&utm_campaign=loading",
    embedUrl: "https://www.instagram.com/reel/DYJhXkCs7UP/embed",
    videoSrc: "/assets/partnership/vertical_X_02.mp4",
    posterSrc: "/assets/partnership/vertical_X_02-poster-00001.jpg",
  },
  {
    id: "ig-airtel",
    shortcode: "DEkElizCMEx",
    client: "Airtel Africa",
    campaignTitle: "A Reason to Imagine — Social Activation",
    metricBadge: "4 Markets · +42% Recall",
    caption:
      "Multi-market social amplification linking Airtel Africa network velocity with everyday creator energy.",
    permalink:
      "https://www.instagram.com/reel/DEkElizCMEx/?utm_source=ig_embed&utm_campaign=loading",
    embedUrl: "https://www.instagram.com/reel/DEkElizCMEx/embed",
    videoSrc: "/assets/partnership/vertical_X_03.mp4",
    posterSrc: "/assets/partnership/vertical_X_03-poster-00001.jpg",
  },
];


