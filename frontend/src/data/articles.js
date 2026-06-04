export const articles = [
  {
    id: 'what-is-medicare',
    category: 'medicare',
    icon: 'ti-id-badge',
    title: 'What is Medicare?',
    summary: 'Australia\'s public health system — who qualifies, and what it covers.',
    sections: [
      {
        heading: 'What it is',
        detail: 'Medicare is Australia\'s public health insurance system. It helps cover the cost of seeing a doctor, getting tests, and some hospital care. The Australian government funds it — so for people who qualify, most GP visits cost nothing.'
      },
      {
        heading: 'Do I qualify?',
        detail: 'Not everyone in Australia can use Medicare. You qualify if you are an Australian citizen or permanent resident, a New Zealand citizen living in Australia, or from a country with a Reciprocal Health Care Agreement with Australia (including the UK, Ireland, Italy, Sweden, the Netherlands, Belgium, Norway, Slovenia, Malta and Finland). You likely do NOT qualify if you are an international student (you have OSHC instead), on a temporary visa not covered above, or a tourist.'
      },
      {
        heading: 'What to actually do',
        detail: 'If you think you qualify, apply for a Medicare card at a Services Australia office or online. Bring your passport and visa. It usually takes 2–4 weeks to arrive. If you\'re not sure whether you qualify, call Medicare on 132 011 — they can check your visa type.'
      }
    ],
    source: { label: 'Services Australia — Who can get Medicare', href: 'https://www.servicesaustralia.gov.au/enrolling-medicare?context=60092#whocan' },
    lastReviewed: 'June 2026'
  },
  {
    id: 'what-is-oshc',
    category: 'medicare',
    icon: 'ti-shield-check',
    title: 'What is OSHC?',
    summary: 'The health insurance international students are required to have — and what it actually covers.',
    sections: [
      {
        heading: 'What it is',
        detail: 'OSHC stands for Overseas Student Health Cover. It\'s a type of health insurance that international students on a student visa are required to have by the Australian government. It\'s not Medicare — it\'s private insurance, and you pay for it yourself (usually as part of your university fees).'
      },
      {
        heading: 'What it covers',
        detail: 'OSHC covers GP visits (you may still pay a gap fee), some hospital stays, limited pharmaceuticals, and some mental health services. It does NOT cover dental, optical, or physiotherapy unless you pay for extras cover.'
      },
      {
        heading: 'What to actually do',
        detail: 'Check who your OSHC provider is — your university or college arranged it when you enrolled. Common providers are Medibank, Bupa, AHM, CBHS, and NIB. Download their app or log in to their website to see your coverage and find covered providers near you.'
      }
    ],
    source: { label: 'Department of Home Affairs — Overseas Student Health Cover', href: 'https://www.studyaustralia.gov.au/en/plan-your-move/overseas-student-health-cover-oshc' },
    lastReviewed: 'June 2026'
  },
  {
    id: 'what-is-a-gp',
    category: 'getting-care',
    icon: 'ti-stethoscope',
    title: 'What is a GP and how do I see one?',
    summary: 'Your first stop for almost any health concern — and how to book an appointment.',
    sections: [
      {
        heading: 'What it is',
        detail: 'A GP (General Practitioner) is a family doctor — your first stop for almost any health concern. Feeling unwell, needing a referral to a specialist, getting a prescription, or just a routine checkup — a GP handles all of this.'
      },
      {
        heading: 'What it means for you',
        detail: 'You don\'t need to go to a hospital for most health issues. A GP clinic is much faster, cheaper, and less stressful. You can usually get an appointment within a few days, sometimes the same day.'
      },
      {
        heading: 'What to actually do',
        detail: 'Search for a GP clinic near you on HotDoc or HealthEngine. Look for clinics that are bulk billing (free if you have Medicare) or that accept your OSHC. You can filter by language spoken if you prefer to see a doctor in your own language. Call ahead to confirm they accept your insurance before you go.'
      }
    ],
    source: { label: 'HealthDirect — General practitioners (GPs)', href: 'https://www.healthdirect.gov.au/gps-and-specialists' },
    lastReviewed: 'June 2026'
  },
  {
    id: 'what-is-bulk-billing',
    category: 'costs',
    icon: 'ti-receipt',
    title: 'What is bulk billing?',
    summary: 'When a GP visit costs you nothing — and how to find clinics that offer it.',
    sections: [
      {
        heading: 'What it is',
        detail: 'Bulk billing means the doctor charges Medicare directly for your visit — so you pay nothing out of pocket. No gap fee, no upfront cost.'
      },
      {
        heading: 'What it means for you',
        detail: 'If you have a Medicare card, always look for bulk billing clinics first. Not all GPs bulk bill — some charge a gap fee on top of the Medicare rebate, which you pay yourself. The gap fee varies but is usually $20–$60. If you have OSHC instead of Medicare, bulk billing doesn\'t apply to you in the same way — your insurer covers part of the cost instead, and you may still have a gap fee.'
      },
      {
        heading: 'What to actually do',
        detail: 'When searching for a GP on HotDoc or HealthEngine, filter by "bulk billing." You can also call the clinic directly and ask: "Do you bulk bill Medicare patients?" It\'s a completely normal question — receptionists hear it every day.'
      }
    ],
    source: { label: 'Services Australia — Bulk billing', href: 'https://www.servicesaustralia.gov.au/bulk-billing' },
    lastReviewed: 'June 2026'
  },
  {
    id: 'how-to-get-medicare-card',
    category: 'medicare',
    icon: 'ti-wallet',
    title: 'How do I get a Medicare card?',
    summary: 'Step-by-step — how to enrol in Medicare and get your card.',
    sections: [
      {
        heading: 'What it is',
        detail: 'A Medicare card is your proof that you\'re enrolled in Medicare. You need it (or your Medicare number) when you visit a GP, pick up subsidised medicine, or claim a rebate.'
      },
      {
        heading: 'What it means for you',
        detail: 'Without a Medicare card, you may be charged full private rates at a GP — which can be $80–$150 or more per visit. Getting your card as soon as you arrive (if you qualify) saves you money immediately.'
      },
      {
        heading: 'What to actually do',
        detail: 'First, check that you\'re eligible (see "What is Medicare?"). Then go to a Services Australia service centre in person — bring your passport and visa grant letter. Or apply online at myGov if you already have an account. Your card arrives by mail in 2–4 weeks. In the meantime, Services Australia can give you a temporary Medicare number to use straight away.'
      }
    ],
    source: { label: 'Services Australia — Enrolling in Medicare', href: 'https://www.servicesaustralia.gov.au/enrolling-medicare' },
    lastReviewed: 'June 2026'
  },

  {
    id: 'what-is-health-care-card',
    category: 'costs',
    icon: 'ti-discount',
    title: 'What is a Health Care Card?',
    summary: 'A concession card that makes medicines and some services cheaper — who can get one.',
    sections: [
      {
        heading: 'What it is',
        detail: 'A Health Care Card is a card issued by Services Australia that gives you access to cheaper medicines and some other concessions. It\'s different from Medicare — it\'s a concession card, not health insurance.'
      },
      {
        heading: 'What it means for you',
        detail: 'With a Health Care Card, medicines on the PBS cost significantly less — around $7.70 instead of $31.60 per prescription. Some state governments and local councils also offer discounts on public transport, utility bills, and council rates to card holders.'
      },
      {
        heading: 'What to actually do',
        detail: 'You may be eligible if you receive certain government payments (like Youth Allowance or Austudy) or if your income is below a certain threshold. Check your eligibility and apply at a Services Australia service centre or online via myGov.'
      }
    ],
    source: { label: 'Services Australia — Health Care Card', href: 'https://www.servicesaustralia.gov.au/health-care-card' },
    lastReviewed: 'June 2026'
  },
 
  {
    id: 'how-to-get-prescription',
    category: 'getting-care',
    icon: 'ti-pill',
    title: 'How do I get a prescription filled?',
    summary: 'What happens after your doctor visit — and how to pick up your medication.',
    sections: [
      {
        heading: 'What it is',
        detail: 'A prescription is a written order from your doctor for medication. In Australia, you take it to a pharmacy (chemist) to get the medicine. You don\'t need to go back to your doctor every time — just the pharmacy.'
      },
      {
        heading: 'What it means for you',
        detail: 'Some medicines are subsidised by the government through the PBS, making them much cheaper. Others are full price. Your out-of-pocket cost depends on whether the medicine is on the PBS and whether you have a concession card.'
      },
      {
        heading: 'What to actually do',
        detail: 'After your GP appointment, you\'ll receive a prescription — either paper or electronic (sent directly to your phone). Take it to any pharmacy. Tell the pharmacist if you have a Medicare card or Health Care Card as this affects your price. If you\'re on OSHC, check your policy — some medicines may be partially covered.'
      }
    ],
    source: { label: 'Services Australia — Prescriptions and the PBS', href: 'https://www.servicesaustralia.gov.au/pharmaceutical-benefits-scheme' },
    lastReviewed: 'June 2026'
  },
 
  {
    id: 'what-is-pbs',
    category: 'costs',
    icon: 'ti-medicine-syrup',
    title: 'What is the PBS?',
    summary: 'How Australia subsidises the cost of medicines — and how to pay less at the pharmacy.',
    sections: [
      {
        heading: 'What it is',
        detail: 'The Pharmaceutical Benefits Scheme (PBS) is the Australian government\'s program that subsidises the cost of many medicines. Without it, some medicines would cost hundreds of dollars. With it, most cost under $32 — and under $8 if you have a concession card.'
      },
      {
        heading: 'What it means for you',
        detail: 'If you have Medicare, you automatically have access to PBS prices. If you\'re on OSHC, you may not get PBS prices — check your policy. Some medicines are not on the PBS at all, meaning you pay the full market price.'
      },
      {
        heading: 'What to actually do',
        detail: 'Ask your pharmacist whether your medicine is on the PBS. You can also search the PBS medicines list at pbs.gov.au to check before your appointment. If cost is a concern, tell your GP — there may be a cheaper PBS-listed alternative.'
      }
    ],
    source: { label: 'Australian Government — PBS', href: 'https://www.pbs.gov.au' },
    lastReviewed: 'June 2026'
  },
 
  {
    id: 'what-is-emergency-department',
    category: 'getting-care',
    icon: 'ti-emergency-bed',
    title: 'What happens at an emergency department?',
    summary: 'When to go to the ED, what to expect, and whether you\'ll get a bill.',
    sections: [
      {
        heading: 'What it is',
        detail: 'An emergency department (ED) is the part of a hospital that handles serious, life-threatening, or urgent conditions. It is open 24/7. In Australia, public hospital EDs are free for Medicare card holders.'
      },
      {
        heading: 'What it means for you',
        detail: 'You will not be turned away from a public ED regardless of your visa status or whether you have insurance. However, if you don\'t have Medicare, you may receive a bill afterwards. If you have OSHC, it covers emergency hospital treatment — check your policy for details. EDs prioritise by urgency, not arrival time, so you may wait a long time for non-urgent issues. A GP or urgent care clinic is much faster for non-emergencies.'
      },
      {
        heading: 'What to actually do',
        detail: 'Go to the ED or call 000 for an ambulance if you have chest pain, difficulty breathing, severe bleeding, loss of consciousness, or signs of stroke. For everything else, call 13SICK (13 74 25) first — a nurse will tell you whether you need the ED or just a GP.'
      }
    ],
    source: { label: 'HealthDirect — Emergency department', href: 'https://www.health.vic.gov.au/patient-care/emergency-care' },
    lastReviewed: 'June 2026'
  },
 
  {
    id: 'mental-health-treatment-plan',
    category: 'mental',
    icon: 'ti-heart-handshake',
    title: 'What is a Mental Health Treatment Plan?',
    summary: 'How to access subsidised psychology sessions through your GP — even if you\'re not in crisis.',
    sections: [
      {
        heading: 'What it is',
        detail: 'A Mental Health Treatment Plan (MHTP) is a document your GP writes if you\'re struggling with your mental health. It allows you to access up to 10 subsidised psychology sessions per year through Medicare — meaning you pay much less per session than the full price.'
      },
      {
        heading: 'What it means for you',
        detail: 'Without a plan, a psychologist session can cost $180-$300. With a plan and Medicare, you get a rebate of around $137 per session — so your gap is much lower, and some psychologists bulk bill entirely. You don\'t need to be in crisis to get one. Stress, anxiety, feeling overwhelmed — these are all valid reasons.'
      },
      {
        heading: 'What to actually do',
        detail: 'Book a longer GP appointment (tell reception it\'s for a mental health plan). Your GP will ask you some questions and write the plan. They\'ll then refer you to a psychologist. You can find bulk billing psychologists at healthdirect.gov.au or ask your GP for a recommendation.'
      }
    ],
    source: { label: 'HealthDirect — Mental Health Treatment Plan', href: 'https://www.healthdirect.gov.au/mental-health-care-plan' },
    lastReviewed: 'June 2026'
  },

  {
    id: 'cervical-screening',
    category: 'womens',
    icon: 'ti-rosette',
    title: 'Cervical screening in Australia',
    summary: 'What it is, when to get it, and how to make the appointment less daunting.',
    sections: [
      {
        heading: 'What it is',
        detail: 'Cervical screening (previously called a Pap smear) is a test that checks for changes in the cells of your cervix that could lead to cancer if untreated. In Australia it\'s recommended every 5 years for people aged 25–74 who have ever been sexually active.'
      },
      {
        heading: 'What it means for you',
        detail: 'The test is free under Medicare. If you\'re on OSHC, check whether it\'s covered. The test is quick, done by a GP or women\'s health nurse, and can feel uncomfortable but is not usually painful. You can request a female doctor — just ask when booking.'
      },
      {
        heading: 'What to actually do',
        detail: 'Book a GP appointment and mention you\'re due for cervical screening. If you\'re unsure when you last had one, or if it\'s your first time in Australia, just tell your GP — they\'ll advise. Don\'t let embarrassment stop you. GPs do this every day and will make you feel comfortable.'
      }
    ],
    source: { label: 'Australian Government — National Cervical Screening Program', href: 'https://www.health.gov.au/our-work/national-cervical-screening-program' },
    lastReviewed: 'June 2026'
  },
 
  {
    id: 'contraception-options',
    category: 'womens',
    icon: 'ti-circle-plus',
    title: 'Contraception options in Australia',
    summary: 'What\'s available, what\'s subsidised, and how to talk to your GP about it.',
    sections: [
      {
        heading: 'What it is',
        detail: 'Australia has a wide range of contraception options available, many of them subsidised through the PBS. Your GP can prescribe and discuss all of them with you — no judgment, no referral needed.'
      },
      {
        heading: 'What it means for you',
        detail: 'The pill is available on the PBS for around $7–$32 per month. The implant (a small rod inserted in your arm) lasts 3 years and is free under Medicare for eligible patients. The IUD (inserted into the uterus) lasts 5–10 years and is also heavily subsidised. Emergency contraception (morning after pill) is available directly from a pharmacy without a prescription.'
      },
      {
        heading: 'What to actually do',
        detail: 'Book a GP appointment and say you want to discuss contraception options. There\'s no need to be embarrassed — this is a routine conversation. If cost is a concern, ask your GP specifically which options are PBS-subsidised for you.'
      }
    ],
    source: { label: 'Family Planning Australia — Contraception', href: 'https://www.fpnsw.org.au/health-information/individuals/contraception' },
    lastReviewed: 'June 2026'
  },
 
  {
    id: 'sexual-health-clinics',
    category: 'womens',
    icon: 'ti-building-hospital',
    title: 'Sexual health clinics in Australia',
    summary: 'Confidential, judgement-free testing and care — often free of charge.',
    sections: [
      {
        heading: 'What it is',
        detail: 'Sexual health clinics are specialist clinics that provide confidential testing and treatment for sexually transmitted infections (STIs), contraception advice, and other sexual health services. They are separate from a regular GP clinic.'
      },
      {
        heading: 'What it means for you',
        detail: 'Many sexual health clinics bulk bill — meaning the visit is free if you have Medicare. Some clinics also offer free or low-cost services regardless of Medicare status, specifically for people who might otherwise not seek care. Everything is completely confidential.'
      },
      {
        heading: 'What to actually do',
        detail: 'Search "sexual health clinic near me" or visit the Family Planning website for your state to find your nearest clinic. You can also ask your GP for a referral or get tested directly at a GP clinic — it\'s your choice.'
      }
    ],
    source: { label: 'HealthDirect — Sexual health services', href: 'https://www.health.vic.gov.au/hospitals-health-services' },
    lastReviewed: 'June 2026'
  },
]