import { ServiceDefinition, TestimonialItem } from '../types/demo';

export const PRACTICE_INFO = {
  name: 'Georgia Holistic Dentist',
  alternateName: 'Georgia Holistic Dental',
  doctorName: 'Dr. Lorie Miller Stevens, DMD, MAGD',
  doctorShort: 'Dr. Lorie Miller Stevens',
  credentials: 'DMD, MAGD',
  addressLine1: '5129 Cleveland Highway',
  cityStateZip: 'Gainesville, Georgia 30506',
  country: 'United States',
  fullAddress: '5129 Cleveland Highway, Gainesville, Georgia 30506',
  phone: '770-983-0123',
  phoneHref: 'tel:+17709830123',
  officialWebsite: 'https://www.georgiaholisticdentist.com/',
  establishedYear: 1991,
  establishedLocation: "Quillian's Corner in North Hall County",
  educationYear: 1988,
  educationSchool: 'Medical College of Georgia School of Dentistry',
  hoursPolicy: 'Weekday appointments by scheduled reservation',
  hoursDetail:
    'Independent, doctor-led practice operating weekday hours by appointment. Submitted demo requests illustrate preference capture only and require clinic confirmation.',
};

export const PRACTICE_IMAGES = {
  heroCinematic: {
    src: '/src/assets/images/hero_cinematic_clinic_1794919274941.jpg',
    alt: 'Illustrative architectural dental treatment suite with floor-to-ceiling steel windows, natural daylight, and precision navy-and-white dental chair',
    caption: 'Illustrative modern dental suite photography (not an actual clinic photo)',
  },
  heroSuite: {
    src: '/src/assets/images/hero_dental_suite_1794916952802.jpg',
    alt: 'Illustrative sunlit holistic dental suite with natural oak accents and clinical delivery equipment',
    caption: 'Illustrative sunlit dental suite photography',
  },
  holisticConsult: {
    src: '/src/assets/images/holistic_patient_consult_1794920435805.jpg',
    alt: 'Illustrative dentist seated beside a patient in a bright consultation room reviewing a whole-person dental care plan',
    caption: 'Illustrative whole-person dentist-patient consultation photography',
  },
  holisticArch: {
    src: '/src/assets/images/holistic_care_clean_1794919297725.jpg',
    alt: 'Illustrative dentist holding a clear biocompatible dental arch model beside a panoramic radiograph tablet',
    caption: 'Illustrative biocompatible arch model and digital imaging evaluation',
  },
  cosmeticExam: {
    src: '/src/assets/images/cosmetic_dental_exam_1794920433595.jpg',
    alt: 'Illustrative cosmetic dental examination with dentist matching tooth shade guide alongside a smiling patient in a dental chair',
    caption: 'Illustrative cosmetic dental shade-matching examination',
  },
  laserGum: {
    src: '/src/assets/images/laser_gum_treatment_1794920434800.jpg',
    alt: 'Illustrative dentist wearing magnifying surgical loupes performing precision non-surgical dental laser therapy on a patient',
    caption: 'Illustrative non-surgical dental laser periodontal care',
  },
  waterlaseClinical: {
    src: '/src/assets/images/waterlase_clinical_1794920433326.jpg',
    alt: 'Illustrative dental laser workstation and precision handpiece beside an ergonomic treatment chair in a sunlit clinical operatory',
    caption: 'Illustrative dental laser operatory and clinical workstation',
  },
  digitalIntraoral: {
    src: '/src/assets/images/digital_xray_intraoral_1794920435346.jpg',
    alt: 'Illustrative dentist demonstrating a real-time digital tooth scan on a chairside monitor using a wireless intraoral camera wand',
    caption: 'Illustrative intraoral camera and chairside digital imaging',
  },
  myosmileEval: {
    src: '/src/assets/images/myosmile_bite_eval_1794920434810.jpg',
    alt: 'Illustrative dentist gently evaluating jaw alignment and bite balance with an anatomical dental arch model in a bright treatment suite',
    caption: 'Illustrative airway, jaw alignment, and bite harmony evaluation',
  },
  comfortMedia: {
    src: '/src/assets/images/comfort_chair_media_1794919276311.jpg',
    alt: 'Illustrative modern dental operatory featuring ergonomic dental chair, overhead flat-screen monitor, wireless headphones, and low-level cove lighting',
    caption: 'Illustrative patient-comfort dental operatory photography',
  },
  virtualConsult: {
    src: '/src/assets/images/virtual_consult_clean_1794919297724.jpg',
    alt: 'Illustrative holistic dentist at a walnut desk conducting a remote Zoom dental consultation with radiograph imagery',
    caption: 'Illustrative remote dental consultation photography',
  },
  finalCta: {
    src: '/src/assets/images/final_cta_clinic_1794919276923.jpg',
    alt: 'Illustrative twilight architectural dental clinic corridor leading into an illuminated glass-walled treatment room',
    caption: 'Illustrative architectural dental clinic corridor',
  },
} as const;

export const DOCTOR_CREDENTIALS = [
  {
    label: 'Degree & Distinction',
    value: 'DMD, MAGD',
    detail: 'Doctor of Dental Medicine & Master in the Academy of General Dentistry',
  },
  {
    label: 'Dental Education',
    value: 'Class of 1988',
    detail: 'Graduated from the Medical College of Georgia School of Dentistry after initial training as a dental hygienist',
  },
  {
    label: 'Gainesville Practice',
    value: 'Est. 1991',
    detail: "Built her independent North Hall County practice at Quillian's Corner in 1991",
  },
  {
    label: 'Professional Leadership',
    value: 'IAOMT & HDA',
    detail: 'Served on the Board of Directors of the IAOMT and as Past President / Board Chair of the Holistic Dental Association',
  },
];

export const VERIFIED_SERVICES: ServiceDefinition[] = [
  {
    slug: 'cosmetic-dentistry',
    number: '01',
    title: 'Cosmetic Dentistry',
    shortTitle: 'Cosmetic Dentistry',
    category: 'Airway & Cosmetic',
    tagline: 'Conservative, metal-free aesthetic care designed with total health in mind.',
    summary:
      'Tooth-colored dental bonding, Lumineers, Snap-On Smile, clear partials, and thoughtful whitening options crafted to respect natural tooth structure.',
    overview:
      'Cosmetic improvements at Georgia Holistic Dentist prioritize conservation and material compatibility alongside natural aesthetics. Every restoration is evaluated for bite balance, shade harmony, and long-term tissue compatibility.',
    holisticPerspective:
      'Rather than aggressive tooth reduction or metal-heavy appliances, care plans explore conservative, biocompatible options such as tooth-colored composite bonding, Lumineers, Snap-On Smile, and clear metal-free partials.',
    highlights: [
      'Tooth-colored composite dental bonding',
      'Conservative Lumineers and aesthetic veneers',
      'Snap-On Smile and metal-free clear partials',
      'Shade-matched crowns and whitening guidance',
    ],
    idealFor: [
      'Patients seeking natural-looking tooth shade and contour matching',
      'Replacing visible dark fillings or mismatched older dental work',
      'Conservative smile enhancement without invasive metal frameworks',
    ],
    supportsVirtual: true,
    imageKey: 'cosmeticExam',
    imageAlt: 'Dentist matching natural tooth shade guide beside a smiling patient in a dental chair',
  },
  {
    slug: 'laser-gum-treatment',
    number: '02',
    title: 'Non-Surgical Laser Gum Treatment',
    shortTitle: 'Laser Gum Treatment',
    category: 'Laser & Technology',
    tagline: 'Targeted periodontal therapy addressing oral inflammation and systemic wellness.',
    summary:
      'A gentle, non-surgical laser periodontal program aimed at reducing harmful oral bacteria and supporting healthy gum attachment.',
    overview:
      'Gum health directly influences cardiovascular, metabolic, and immune balance. Dr. Lorie utilizes focused non-surgical laser gum protocols designed to address periodontal pockets comfortably and conservatively.',
    holisticPerspective:
      'Oral bacteria and chronic periodontal inflammation have well-documented links to systemic wellness. Treating gum tissue gently with laser energy helps calm inflammation and supports natural tissue healing without conventional scalpel surgery.',
    highlights: [
      'Non-surgical laser periodontal bacterial reduction',
      'Designed to preserve healthy gum tissue',
      'Integrated with oral-systemic wellness evaluation',
      'Supports calmer recovery with minimal tissue trauma',
    ],
    idealFor: [
      'Patients experiencing bleeding, tender, or inflamed gums',
      'Individuals prioritizing oral-systemic inflammation management',
      'Patients seeking non-surgical periodontal alternatives',
    ],
    supportsVirtual: false,
    imageKey: 'laserGum',
    imageAlt: 'Dentist wearing magnifying surgical loupes performing precision non-surgical laser periodontal therapy',
  },
  {
    slug: 'waterlase-dentistry',
    number: '03',
    title: 'Waterlase® Dentistry',
    shortTitle: 'Waterlase Technology',
    category: 'Laser & Technology',
    tagline: 'HydroPhotonics™ laser energy and water spray for gentler tooth and gum procedures.',
    summary:
      'Combines YSGG laser energy with a gentle spray of water to treat teeth, gums, and bone with reduced heat, vibration, and drill noise.',
    overview:
      'Waterlase® dentistry replaces much of the heat, vibration, and pressure associated with traditional high-speed dental drills. By energizing a gentle stream of water, procedures are performed with remarkable precision.',
    holisticPerspective:
      'Minimizing mechanical trauma, heat stress, and unnecessary anesthesia aligns directly with holistic patient care—helping anxious patients feel calm while preserving healthy surrounding tooth structure.',
    highlights: [
      'YSGG laser energy paired with HydroPhotonics™ water spray',
      'Eliminates traditional drill vibration and thermal friction',
      'Often reduces the need for shots and local anesthesia',
      'Supports cleaner healing with reduced post-visit swelling',
    ],
    idealFor: [
      'Patients with dental anxiety triggered by drill sound or vibration',
      'Conservative cavity preparation and soft-tissue contouring',
      'Individuals seeking gentle, minimally invasive dental visits',
    ],
    supportsVirtual: false,
    imageKey: 'waterlaseClinical',
    imageAlt: 'Dental laser workstation and precision handpiece beside an ergonomic treatment chair',
  },
  {
    slug: 'digital-dental-technology',
    number: '04',
    title: 'Digital Dental Technology',
    shortTitle: 'Digital Diagnostics',
    category: 'Laser & Technology',
    tagline: 'Low-radiation diagnostics, intraoral visual education, and early oral cancer screening.',
    summary:
      'Lower-radiation digital X-rays, Diagnodent early decay laser detection, intraoral cameras, and thorough oral cancer screenings.',
    overview:
      'Accurate diagnosis allows conservative, early intervention. Our operatory combines low-radiation digital radiography with high-resolution intraoral imaging so you can see exactly what Dr. Lorie sees on screen.',
    holisticPerspective:
      'Reducing radiation exposure with digital sensors and catching microscopic enamel changes early with Diagnodent laser fluorescence prevents small concerns from becoming invasive procedures.',
    highlights: [
      'Lower-radiation digital X-rays and digital photography',
      'Intraoral cameras projecting clear real-time tooth views',
      'Diagnodent laser for early, non-invasive decay detection',
      'Dedicated oral cancer screenings with specialized light evaluation',
    ],
    idealFor: [
      'Patients wanting transparent visual explanations during exams',
      'Radiation-conscious individuals seeking low-dose digital imaging',
      'Comprehensive preventive checkups and annual screenings',
    ],
    supportsVirtual: false,
    imageKey: 'digitalIntraoral',
    imageAlt: 'Dentist sharing a high-resolution intraoral scan on a chairside monitor with a patient',
  },
  {
    slug: 'myo-smile-tmj',
    number: '05',
    title: 'Myo=Smile® / TMJ & Airway Therapy',
    shortTitle: 'Myo=Smile / TMJ',
    category: 'Airway & Cosmetic',
    tagline: 'Developing natural dental arches, balancing jaw posture, and supporting healthy breathing.',
    summary:
      'Developed by Dr. Lorie Miller Stevens integrating Myobrace concepts for arch development, airway support, muscle balance, and TMJ bite harmony.',
    overview:
      'Crowded teeth, jaw tension, and mouth breathing often share structural and muscular roots. The Myo=Smile® program looks beyond cosmetic tooth alignment to support dental arch development, oral posture, and airway space.',
    holisticPerspective:
      'True bite stability and nighttime breathing are foundational to whole-body rest and cellular vitality. By addressing oral muscle habits and arch form rather than forcing teeth into narrow spaces, Myo=Smile® supports jaw comfort and airway function.',
    highlights: [
      'Non-conventional arch development integrating Myobrace principles',
      'Focus on nasal breathing mechanisms and airway space',
      'Myofunctional muscle balance for lips, tongue, and jaw',
      'Thoughtful bite evaluation and TMJ/night-guard support',
    ],
    idealFor: [
      'Adults and families exploring airway-centered orthodontics',
      'Patients experiencing jaw tension, clenching, or bite imbalance',
      'Individuals looking for non-extraction arch development options',
    ],
    supportsVirtual: true,
    imageKey: 'myosmileEval',
    imageAlt: 'Dentist gently evaluating jaw posture and bite harmony with a clear dental arch model',
  },
  {
    slug: 'biocompatible-restorations',
    number: '06',
    title: 'Biocompatible Care & Safe Amalgam Removal',
    shortTitle: 'Biocompatible Care',
    category: 'Holistic & Restorative',
    tagline: 'Non-toxic composite restorations, ozone therapy, and mindful mercury amalgam replacement.',
    summary:
      'Safe mercury amalgam removal protocols, tooth-colored biocompatible composite bonding, ozone therapy, and custom protective bite guards.',
    overview:
      'Conventional silver amalgam fillings contain mercury and metal alloys. When replacing aging fillings or treating new decay, Dr. Lorie follows rigorous protective protocols and uses biocompatible, tooth-colored materials.',
    holisticPerspective:
      'Every material placed in the mouth lives inside a warm, dynamic biological environment. Utilizing ozone therapy for natural antimicrobial support and carefully isolating during amalgam removal protects both patient and clinical team.',
    highlights: [
      'Protective protocols to minimize mercury vapor exposure during removal',
      'Tooth-colored biocompatible composite restorations',
      'Ozone therapy integrated for natural antimicrobial disinfection',
      'Custom night guards and conservative restorative planning',
    ],
    idealFor: [
      'Patients replacing cracked or aging silver amalgam fillings',
      'Individuals sensitive to metals or seeking biocompatible materials',
      'Patients wanting ozone-supported conservative restorations',
    ],
    supportsVirtual: true,
    imageKey: 'holisticArch',
    imageAlt: 'Dentist examining biocompatible clear dental arch model and digital radiograph',
  },
  {
    slug: 'virtual-consultations',
    number: '07',
    title: 'Virtual Consultations (Zoom)',
    shortTitle: 'Virtual Consultations',
    category: 'Virtual Access',
    tagline: 'Direct preliminary holistic guidance with Dr. Lorie before traveling to Gainesville.',
    summary:
      'Convenient Zoom consultations for out-of-town patients or exploratory holistic questions, supported by pre-submitted photos and X-rays.',
    overview:
      'Many patients travel across Georgia and neighboring states to consult with Dr. Lorie. Virtual Zoom appointments let you discuss your goals, review existing radiographs, and explore holistic options from home.',
    holisticPerspective:
      'Informed patients make confident decisions. By sending recent X-rays of problem areas and clear mouth photos ahead of your Zoom call, Dr. Lorie can offer focused, personalized preliminary perspective.',
    highlights: [
      'Structured Zoom consultations (10-minute and 15-minute tiers)',
      'Designed for out-of-town patients and second-opinion guidance',
      'Pre-visit review of patient-submitted X-rays and dental photos',
      'Clear next-step recommendations before scheduling travel',
    ],
    idealFor: [
      'Out-of-state or long-distance prospective patients',
      'Exploratory discussions around amalgam removal or Myo=Smile®',
      'Focused preliminary questions prior to an in-office exam',
    ],
    supportsVirtual: true,
    imageKey: 'virtualConsult',
    imageAlt: 'Dentist conducting a remote Zoom consultation with digital radiograph on screen',
  },
];

export const PATIENT_COMFORT_AMENITIES = [
  {
    title: 'Therapeutic Chair Massages',
    detail: 'Built-in gentle chair massage during treatment helps ease physical tension in the neck, shoulders, and back.',
  },
  {
    title: 'Overhead Flat-Screen DVDs',
    detail: 'Watch calming or entertaining films comfortably overhead while reclined during longer restorative visits.',
  },
  {
    title: 'Wireless Music Headphones',
    detail: 'Listen to soothing music wirelessly to quiet clinical sounds and stay grounded in your own calming audio space.',
  },
  {
    title: 'Low-Level Ambient Lighting',
    detail: 'Thoughtfully softened room lighting reduces visual glare and helps transform clinical anxiety into calm rest.',
  },
];

export const VERIFIED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      "I am grateful to have found Georgia Holistic Dentist and Dr. Lorie Stevens. My negative memories of going to a dentist and sitting in a dentist's chair have been changed to a more positive experience. I appreciate and respect her holistic approach to dental practices...",
    attribution: 'Vicki K.',
    context: 'Overcoming Dental Anxiety & Holistic Approach',
    sourceLabel: 'Verified quote from georgiaholisticdentist.com',
  },
  {
    id: 'test-2',
    quote:
      'I broke a crown and called and an appointment was made for the same day with a follow-up the next morning. I was treated like a patient should be treated.',
    attribution: 'Mike Grizzel',
    context: 'Prompt Broken Crown Care & Follow-Up',
    sourceLabel: 'Verified quote from georgiaholisticdentist.com',
  },
  {
    id: 'test-3',
    quote:
      'The dentist spent a great deal of time making sure everything was good with my bite. I truly appreciate that she is interested in your total health and not just your teeth.',
    attribution: 'Practice Patient',
    context: 'Bite Harmony & Total Health Focus',
    sourceLabel: 'Verified quote from georgiaholisticdentist.com',
  },
  {
    id: 'test-4',
    quote:
      'Dr. Miller-Stevens was concerned about my overall health, and not just my teeth. The office staff was very friendly.',
    attribution: 'Practice Patient',
    context: 'Whole-Person Philosophy & Team Warmth',
    sourceLabel: 'Verified quote from georgiaholisticdentist.com',
  },
  {
    id: 'test-5',
    quote:
      'Partial: Very pleased with the quality of service in your office. Great fit on the removable partial the color is a great match. My crown is a great color match to the rest of my teeth also. Thanks so much, you and your team did an amazing job.',
    attribution: 'Practice Patient',
    context: 'Restorative Fit & Natural Shade Matching',
    sourceLabel: 'Verified quote from georgiaholisticdentist.com',
  },
];

export const TECHNOLOGY_ITEMS = [
  {
    id: 'waterlase',
    name: 'Waterlase® HydroPhotonics™',
    subtitle: 'YSGG Laser + Water Spray',
    summary:
      'Combines laser energy with a gentle spray of water to prepare teeth and treat soft tissue without traditional drill heat, vibration, or pressure—often reducing the need for anesthesia.',
    imageKey: 'waterlaseClinical' as const,
  },
  {
    id: 'intraoral',
    name: 'High-Resolution Intraoral Camera',
    subtitle: 'Real-Time Visual Co-Discovery',
    summary:
      'Captures crisp full-color views of hard-to-reach areas inside the mouth and displays them chairside so you understand every observation clearly.',
    imageKey: 'digitalIntraoral' as const,
  },
  {
    id: 'digital-xray',
    name: 'Low-Radiation Digital Radiography',
    subtitle: 'Immediate Computerized Imaging',
    summary:
      'Produces high-clarity diagnostic X-rays using substantially less radiation than conventional film, allowing instant chairside review and careful treatment planning.',
    imageKey: 'laserGum' as const,
  },
  {
    id: 'diagnodent',
    name: 'Diagnodent® Laser Detection',
    subtitle: 'Early Sub-Surface Caries Scanning',
    summary:
      'Uses gentle laser fluorescence to detect subtle early tooth structure changes long before they become larger cavities requiring extensive repair.',
    imageKey: 'cosmeticExam' as const,
  },
  {
    id: 'oral-cancer',
    name: 'Enhanced Oral Cancer Screening',
    subtitle: 'Preventive Tissue Evaluation',
    summary:
      'Uses specialized diagnostic illumination to detect subtle mucosal and tissue changes earlier than standard visual examination alone.',
    imageKey: 'holisticArch' as const,
  },
];

export const VERIFICATION_REPORT = [
  {
    category: 'Practice Identity & Address',
    status: 'Verified Official Fact',
    source: 'georgiaholisticdentist.com',
    notes: 'Dr. Lorie Miller Stevens, DMD, MAGD · 5129 Cleveland Highway, Gainesville, GA 30506 · 770-983-0123 · Established 1991.',
  },
  {
    category: 'Doctor Education & Leadership',
    status: 'Verified Official Fact',
    source: 'georgiaholisticdentist.com',
    notes: 'Dental hygienist background; 1988 Medical College of Georgia School of Dentistry graduate; MAGD; IAOMT Board of Directors; Past President/Chair of Holistic Dental Association.',
  },
  {
    category: 'Logo & Brand Mark',
    status: 'Temporary Wordmark',
    source: 'Proposal Placeholder',
    notes: 'Official vector logo file could not be downloaded from georgiaholisticdentist.com in this environment; a clearly identified bespoke editorial wordmark is used until the clinic logo file is supplied.',
  },
  {
    category: 'Dr. Lorie Portrait Slot',
    status: 'Reserved Authentic Asset Slot',
    source: 'Pending Official Clinic Headshot',
    notes: 'No stock or generated clinician portrait is substituted for Dr. Lorie Miller Stevens. Her profile section presents verified practice photography alongside a reserved slot for her official portrait.',
  },
  {
    category: 'Clinical Photography Assets',
    status: 'Curated Dental Photography',
    source: 'Illustrative Clinical Imagery',
    notes: 'All 12 clinical, diagnostic, operatory, consultation, and architectural photographs depict dental-specific scenes in cohesive natural lighting and are never misrepresented as physical Gainesville office photos.',
  },
  {
    category: 'Testimonials & Reviews',
    status: 'Verified Practice Quotes Only',
    source: 'georgiaholisticdentist.com',
    notes: 'All 5 displayed quotes come directly from verified clinic pages with zero fictional patient portraits, invented star ratings, or synthetic review totals.',
  },
  {
    category: 'Appointment Calendar & Staff Demo',
    status: 'Interactive Pre-Sales Demo',
    source: 'Simulated Client-Side State',
    notes: 'Fictional sample patients, simulated weekday appointment slots, and browser-stored workflow logs demonstrate practice management without any real backend or PHI.',
  },
];
