export const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261110_231342_88260d66-aa30-4612-9157-d7f1b5a66d8c.mp4";

export const HERO_PLATE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224241_f6feccd5-1c45-4d22-b369-f927916f9973.png&w=2048&q=85";

export type SheetKey = "work1" | "work2" | "team1" | "team2" | "bts";

export interface SheetConfig {
  url: string;
  width: number;
  height: number;
  cells: [number, number, number, number][];
}

export const SHEETS: Record<SheetKey, SheetConfig> = {
  work1: {
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_b0899b4d-5876-4c63-98d3-8608d8dbe790.png&w=2400&q=85",
    width: 2688,
    height: 1520,
    cells: [
      [0, 0, 1336, 752],
      [1352, 0, 1336, 752],
      [0, 768, 1336, 752],
      [1352, 768, 1336, 752],
    ],
  },
  work2: {
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_aee93a53-873f-470f-afb3-6395c22ab639.png&w=2400&q=85",
    width: 2688,
    height: 1520,
    cells: [
      [0, 0, 1335, 749],
      [1356, 0, 1332, 749],
      [0, 770, 1335, 750],
      [1356, 770, 1332, 750],
    ],
  },
  team1: {
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224239_be9bd6b1-debb-4a95-aadf-1a36e4d2f557.png&w=1600&q=85",
    width: 1744,
    height: 2336,
    cells: [
      [0, 0, 864, 1156],
      [881, 0, 863, 1156],
      [0, 1175, 864, 1161],
      [881, 1175, 863, 1161],
    ],
  },
  team2: {
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_bfc657e7-cbc1-43fb-a726-e8be5dd42302.png&w=1600&q=85",
    width: 1744,
    height: 2336,
    cells: [
      [0, 0, 864, 1159],
      [880, 0, 864, 1159],
      [0, 1176, 864, 1160],
      [880, 1176, 864, 1160],
    ],
  },
  bts: {
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_bf8567fa-9d67-4f1e-b4e0-5662c0bf70e4.png&w=1600&q=85",
    width: 1744,
    height: 2336,
    cells: [
      [0, 0, 865, 1160],
      [881, 0, 863, 1160],
      [0, 1176, 865, 1160],
      [881, 1176, 863, 1160],
    ],
  },
};

export const HERO_CURSOR_CROPS: { crop: string; alt: string }[] = [
  { crop: "work2:1", alt: "Coastal lifestyle campaign shoot at sunset" },
  { crop: "work1:0", alt: "Bold automotive road-trip hero frame" },
  { crop: "work2:3", alt: "High-speed beverage refreshment campaign" },
  { crop: "work1:1", alt: "Summer leisure and hospitality visual" },
  { crop: "work2:2", alt: "Urban mobility and street culture frame" },
  { crop: "work1:2", alt: "Artisanal FMCG and retail storytelling" },
  { crop: "work2:0", alt: "Community night-market brand activation" },
  { crop: "work1:3", alt: "Youth culture and street movement reel" },
];

export interface WorkSlide {
  id: string;
  title: string;
  color: string;
  crop: string;
  alt: string;
  client: string;
  format: string;
  summary: string;
}

export const WORK_SLIDES: WorkSlide[] = [
  {
    id: "spotify-east-africa",
    title: "SPOTIFY SOUNDS OF EA",
    color: "var(--gold)",
    crop: "work1:3",
    alt: "Spotify East Africa youth music and creator culture campaign",
    client: "Spotify · Youth & Creator Culture",
    format: "Kenya · Uganda · Tanzania",
    summary:
      "Problem identification meets street culture: amplifying East Africa’s breakout Gengetone, Amapiano, and Bongo Flava creators through hyper-local social storytelling, campus activations, and Indahash creator coalitions.",
  },
  {
    id: "airtel-africa-coalition",
    title: "AIRTEL AFRICA 360°",
    color: "var(--espresso)",
    crop: "work1:1",
    alt: "Airtel Africa integrated multi-market brand platform",
    client: "Airtel Africa · Publicis Alliance",
    format: "Multi-Market ATL · BTL · Digital",
    summary:
      "A unified brand architecture connecting Airtel’s telecom and mobile-money story across East Africa—combining agile Nairobi creative direction with Publicis Groupe Africa’s continental production scale.",
  },
  {
    id: "kcb-go-ahead",
    title: "KCB BANK · GO AHEAD",
    color: "var(--bronze)",
    crop: "work1:0",
    alt: "KCB Group retail, SME, and mobile banking influence campaign",
    client: "KCB Group · Financial Inclusion",
    format: "Strategy · Film · Digital Influence",
    summary:
      "Turning everyday ambition into cultural momentum for KCB across consumer banking, MSME growth, and mobile lending—driven by sharp insight, community proof points, and through-the-line execution.",
  },
  {
    id: "diageo-tusker-nation",
    title: "DIAGEO · TUSKER NATION",
    color: "var(--ochre)",
    crop: "work1:2",
    alt: "Diageo and Tusker through-the-line celebration and experiential campaign",
    client: "Diageo / KBL · Tusker",
    format: "ATL · Experiential · Trade & Social",
    summary:
      "Seamless through-the-line execution for East Africa’s most iconic beverage brands—uniting broadcast storytelling, live festival culture, and on-trade activation without losing creative edge.",
  },
  {
    id: "isuzu-capwell-coalition",
    title: "WE OVER ME · COALITION",
    color: "var(--umber)",
    crop: "work2:0",
    alt: "Isuzu and Capwell regional brand momentum with The Partnership coalition",
    client: "Isuzu · Capwell · Indahash · TDF",
    format: "Client × Agency × Platform Coalition",
    summary:
      "Partnerships are more than a sum total of individuals—they multiply resources exponentially. Our coalition model links Isuzu, Capwell, Yellow, TDF Group, and P&L Consulting into one high-velocity engine.",
  },
];

export interface TeamPhoto {
  side: "left" | "right";
  sideIndex: number;
  offset: string;
  top: string;
  width: string;
  rotate: number;
  speed: number;
  crop: string;
  alt: string;
  name?: string;
  stickerAngle?: number;
  caption?: string;
}

export const TEAM_PHOTOS: TeamPhoto[] = [
  {
    side: "left",
    sideIndex: 0,
    offset: "2.5vw",
    top: "3%",
    width: "14rem",
    rotate: -4,
    speed: 1,
    crop: "team1:0",
    alt: "Strategy lead reviewing campaign concepts over coffee",
    name: "Strategy",
    stickerAngle: -7,
  },
  {
    side: "left",
    sideIndex: 1,
    offset: "21vw",
    top: "19%",
    width: "11rem",
    rotate: 3,
    speed: 0.6,
    crop: "bts:0",
    alt: "Production unit on location in East Africa",
    caption: "WESTLANDS, NAIROBI",
  },
  {
    side: "left",
    sideIndex: 2,
    offset: "3vw",
    top: "33%",
    width: "13rem",
    rotate: 5,
    speed: 1.3,
    crop: "team1:1",
    alt: "Creative director scouting locations with a camera",
    name: "Idea",
    stickerAngle: 4,
  },
  {
    side: "left",
    sideIndex: 3,
    offset: "23vw",
    top: "49%",
    width: "13.5rem",
    rotate: -3,
    speed: 0.8,
    crop: "team2:3",
    alt: "Insights and data strategist in studio",
    name: "Culture",
    stickerAngle: -5,
  },
  {
    side: "left",
    sideIndex: 4,
    offset: "2vw",
    top: "64%",
    width: "11.5rem",
    rotate: -6,
    speed: 1.15,
    crop: "bts:2",
    alt: "Social-first creator production setup",
    caption: "SOCIAL & CREATORS",
  },
  {
    side: "left",
    sideIndex: 5,
    offset: "20vw",
    top: "79%",
    width: "14rem",
    rotate: 4,
    speed: 0.7,
    crop: "team1:2",
    alt: "Regional execution specialist between shoots",
    name: "Courage",
    stickerAngle: 6,
  },
  {
    side: "right",
    sideIndex: 0,
    offset: "3vw",
    top: "2%",
    width: "13.5rem",
    rotate: 4,
    speed: 0.75,
    crop: "team2:0",
    alt: "Client partnership director outdoors",
    name: "Coalition",
    stickerAngle: 5,
  },
  {
    side: "right",
    sideIndex: 1,
    offset: "22vw",
    top: "17%",
    width: "11rem",
    rotate: -5,
    speed: 1.25,
    crop: "bts:1",
    alt: "Clapperboard before rolling on a brand film",
    caption: "THROUGH THE LINE",
  },
  {
    side: "right",
    sideIndex: 2,
    offset: "2.5vw",
    top: "32%",
    width: "14rem",
    rotate: -3,
    speed: 0.9,
    crop: "team2:1",
    alt: "Account lead smiling against terracotta plaster",
    name: "Instinct",
    stickerAngle: -6,
  },
  {
    side: "right",
    sideIndex: 3,
    offset: "23vw",
    top: "48%",
    width: "13rem",
    rotate: 5,
    speed: 1.4,
    crop: "team1:3",
    alt: "Brand influence specialist in Nairobi",
    name: "Influence",
    stickerAngle: 4,
  },
  {
    side: "right",
    sideIndex: 4,
    offset: "3vw",
    top: "63%",
    width: "11.5rem",
    rotate: 6,
    speed: 0.65,
    crop: "bts:3",
    alt: "Golden hour reflector and sound rig on set",
    caption: "100+ YRS EXPERIENCE",
  },
  {
    side: "right",
    sideIndex: 5,
    offset: "20vw",
    top: "78%",
    width: "14rem",
    rotate: -4,
    speed: 1.05,
    crop: "team2:2",
    alt: "Audio and motion craft lead",
    name: "Multiply",
    stickerAngle: -4,
  },
];

export const AGENCY_CONTACT = {
  email: "info@thepartnership.agency",
  phone: "+254 746 444 333",
  address: "Westlands Square Offices, 3rd Floor, Woodvale Avenue, Westlands, Nairobi, Kenya",
  leadership: "Sandeep Madan (CEO) · Sally Sawe (COO) · Deepesh Jha (CCO)",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/thepartnershipagency/" },
    { label: "X", href: "https://x.com/TPAfrica_" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/the-partnershipafricapublicis/",
    },
    { label: "Facebook", href: "https://www.facebook.com/ThepartnershipAfrica/" },
  ],
};

export const DRAW_LINE_PATHS: string[] = [
  "M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999",
  "M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242",
  "M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014",
  "M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892",
  "M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998",
  "M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025",
];

export const LOAD_WIPE_PATH =
  "M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001";

export const HERO_ARROW_PATH =
  "M12.94 5.7 9.95 8 6.9 10.37l.84 1.86V0h-2.55v12.23l.85-1.86L3 8 0 5.7V9.05l6.47 4.95 6.47-4.95z";
