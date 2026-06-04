// src/data/situations.js
export const situations = [
  {
    id: 'unwell',
    icon: 'ti-thermometer',
    category: 'care',
    title: 'I feel unwell',
    subtitle: 'Where do I go?',
    resultTitle: 'Here\'s where to get help',
    steps: [
      {
        heading: 'Start with a GP (general practitioner)',
        detail: 'A GP is your first stop for most health problems — not the emergency room. Search for "bulk billing" clinics near you. Bulk billing means the clinic charges Medicare directly, so you pay nothing. If you\'re on a student or temporary visa, check what your health insurance (OSHC or OVHC) covers first.'
      },
      {
        heading: 'Not sure how serious it is? Call a nurse.',
        detail: 'Call 13SICK (13 74 25) — a free nurse-on-call service available 24/7. A real nurse will listen and tell you exactly where to go — GP, urgent care, or emergency. No judgment, no cost. Available in most states.'
      },
      {
        heading: 'If it feels like an emergency',
        detail: 'Call 000 for an ambulance, or go directly to your nearest emergency department (ED). You cannot be turned away from an ED regardless of your visa status or insurance. If you\'re unsure whether to call 000 or drive yourself, call 13SICK first — they\'ll advise you.'
      }
    ],
    tags: [{ label: 'Find a bulk billing clinic', type: 'internal', href: '/care' },
            { label: 'What is Medicare?', type: 'internal', href: '/learn?article=what-is-medicare' },
            { label: 'Call 13SICK', type: 'phone', href: 'tel:137425' },
            { label: 'When to go to ED', type: 'internal', href: '/learn?article=what-is-emergency-department' }],
    aiPrompt: 'I feel unwell and need help figuring out where to go in Australia.'
  },
  {
    id: 'minor',
    icon: 'ti-pill',
    category: 'care',
    title: 'Minor symptoms & home remedies',
    subtitle: 'When you don\'t need a GP',
    resultTitle: 'What you can manage at home',
    steps: [
      {
        heading: 'Period pain',
        detail: 'Ibuprofen (e.g. Nurofen) or naproxen — both available at any chemist without a prescription. Take with food. A heat pack also helps. See a GP if the pain is severe enough to stop your daily life, or if it\'s getting worse each cycle — this could be endometriosis.'
      },
      {
        heading: 'Fever or cold',
        detail: 'Rest, fluids, and paracetamol (e.g. Panadol) are your first line — it brings down fever and eases aches. Don\'t take ibuprofen on an empty stomach. See a GP if your fever is above 39°C for more than 2 days, or if you have trouble breathing, chest pain, or a stiff neck.'
      },
      {
        heading: 'Sore throat',
        detail: 'Throat lozenges and warm drinks help. A scratchy throat with a cold usually clears in a week. See a GP if you have white patches on your tonsils, a very high fever, or can\'t swallow — it may be a bacterial infection needing antibiotics.'
      },
      {
        heading: 'Headache',
        detail: 'Drink water first — dehydration is a very common cause. Paracetamol or ibuprofen works for most headaches. See a GP if headaches are frequent, very severe, or come with vision changes or nausea.'
      },
      {
        heading: 'Skin concerns',
        detail: 'Australia has very high UV levels — wear SPF 50+ sunscreen every day, even when cloudy. For a new or changing mole, rash, eczema or skin concern, see a GP. Many clinics offer bulk billed skin checks. Don\'t wait — early detection matters.'
      }
    ],
    tags: [
          { label: 'Find a chemist near me', type: 'external', href: 'https://www.google.com/maps/search/pharmacy' },
          { label: 'Panadol vs Nurofen', type: 'external', href: 'https://www.nps.org.au' },
          { label: 'SPF 50+ sunscreen', type: 'external', href: 'https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety' },
        ],
    aiPrompt: 'I have minor symptoms and want to know if I can manage them at home or if I need to see a GP.'
  },
  {
    id: 'checkup',
    icon: 'ti-clipboard-check',
    category: 'care',
    title: 'Routine checkup',
    subtitle: 'How do I book one?',
    resultTitle: 'Getting a routine checkup',
    steps: [
      {
        heading: 'Book a standard GP appointment',
        detail: 'Tell the receptionist you want a "general health check" or "routine checkup". Most GPs can see you within a few days — no emergency needed. Look for bulk billing clinics so the visit is free with Medicare.'
      },
      {
        heading: 'What\'s usually included',
        detail: 'Blood pressure, basic blood tests, and a general conversation about your health. If you need anything specific — cervical screening, mental health check, skin check — mention it when you book so the GP allows enough time.'
      },
      {
        heading: 'Women\'s health screens',
        detail: 'Australia has free screening programs for cervical cancer (Cervical Screening Test) and breast cancer (BreastScreen). Ask your GP what you\'re due for based on your age. These are free and highly recommended.'
      }
    ],
    tags: [
          { label: 'Find a GP near me', type: 'internal', href: '/care' },
          { label: 'Cervical screening explained', type: 'external', href: 'https://www.health.gov.au/topics/cervical-screening' },
          { label: 'Free screening programs', type: 'external', href: 'https://www.health.gov.au/topics/cancer/screening' },
        ],
    aiPrompt: 'I want to get a routine health checkup in Australia. What should I know before I go?'
  },
  {
    id: 'cost',
    icon: 'ti-coin',
    category: 'cost',
    title: 'Worried about cost',
    subtitle: 'What\'s free or cheap?',
    resultTitle: 'Understanding what you\'ll pay',
    steps: [
      {
        heading: 'Bulk billing = free with Medicare',
        detail: 'If a clinic says "bulk billing", your visit costs you nothing — Medicare pays the doctor directly. Always ask "do you bulk bill?" before booking. Not every clinic bulk bills, so it\'s worth checking first.'
      },
      {
        heading: 'On a student or temporary visa?',
        detail: 'You may not have Medicare. Your Overseas Student Health Cover (OSHC) or Overseas Visitor Health Cover (OVHC) should cover most GP visits — check your policy. Some clinics also offer reduced fees for visa holders, so always ask.'
      },
      {
        heading: 'Out-of-pocket costs',
        detail: 'If a clinic doesn\'t bulk bill, they\'ll charge a "gap fee" on top of what Medicare covers. Always ask the total cost upfront before your appointment — you have every right to know, and no clinic should refuse to tell you.'
      }
    ],
    tags: [
          { label: 'Bulk billing explained', type: 'internal', href: '/learn?article=what-is-bulk-billing' },
          { label: 'What is OSHC?', type: 'external', href: 'https://www.servicesaustralia.gov.au/overseas-student-health-cover' },
          { label: 'What is OVHC?', type: 'external', href: 'https://www.servicesaustralia.gov.au/overseas-visitors-health-cover' },
          { label: 'Find free clinics near me', type: 'internal', href: '/care' },
        ],
    aiPrompt: 'I\'m worried about the cost of healthcare in Australia. Can you help me understand what I\'ll need to pay?'
  },
  {
    id: 'bill',
    icon: 'ti-file-invoice',
    category: 'cost',
    title: 'Got a confusing bill',
    subtitle: 'What do I actually owe?',
    resultTitle: 'Breaking down your bill',
    steps: [
      {
        heading: 'Check for a Medicare benefit',
        detail: 'Most bills show a "Medicare benefit" — this is what the government pays. You only owe the difference (the "gap"). If you\'ve already paid the full amount upfront, Medicare may owe you a rebate.'
      },
      {
        heading: 'Claim your Medicare rebate',
        detail: 'If you paid upfront, you can get some money back. Log into Medicare via MyGov, or visit a Medicare service centre. You usually have 2 years to claim — don\'t leave it too long.'
      },
      {
        heading: 'Something doesn\'t look right?',
        detail: 'Call the clinic and ask them to explain every line item — you have the right to an itemised bill. You can also call Medicare on 132 011. They\'re used to explaining bills and won\'t judge you for asking.'
      }
    ],
    tags: [
          { label: 'How to claim Medicare rebate', type: 'external', href: 'https://www.servicesaustralia.gov.au/how-to-claim-medicare-benefit' },
          { label: 'What is a gap fee?', type: 'internal', href: '/learn' },
          { label: 'Contact Medicare', type: 'phone', href: 'tel:132011' },
        ],
    aiPrompt: 'I received a medical bill in Australia and I\'m confused about what I owe. Can you help me understand it?'
  },
  {
    id: 'mental',
    icon: 'ti-heart',
    category: 'wellbeing',
    title: 'Mental health & feeling overwhelmed',
    subtitle: 'You don\'t have to cope alone',
    resultTitle: 'Getting mental health support',
    steps: [
      {
        heading: 'It\'s okay to not be okay',
        detail: 'Moving to a new country is hard. Feeling anxious, lonely, or low is very common and does not mean something is wrong with you. You deserve support just as much as anyone else — and help is available.'
      },
      {
        heading: 'Free and low-cost options',
        detail: 'Beyond Blue (1300 22 4636) offers free 24/7 phone and chat support. Headspace offers free mental health support for under 25s. Your GP can also give you a Mental Health Treatment Plan, which covers up to 10 free psychology sessions per year through Medicare.'
      },
      {
        heading: 'If you\'re in crisis',
        detail: 'Call Lifeline on 13 11 14 any time, day or night — they\'re there for any kind of emotional distress, not just extreme crisis. If you feel unsafe, go to your nearest ED or call 000.'
      }
    ],
    tags: [
          { label: 'Beyond Blue', type: 'phone', href: 'tel:1300224636' },
          { label: 'Lifeline', type: 'phone', href: 'tel:131114' },
          { label: 'Headspace', type: 'external', href: 'https://headspace.org.au' },
          { label: 'Mental Health Treatment Plan', type: 'internal', href: '/learn' },
        ],
    aiPrompt: 'I\'ve been feeling overwhelmed and anxious since moving to Australia. What mental health support is available to me?'
  },
  {
    id: 'sexual',
    icon: 'ti-gender-female',
    category: 'womens',
    title: 'Sexual & reproductive health',
    subtitle: 'Private, judgement-free care',
    resultTitle: 'Sexual & reproductive health in Australia',
    steps: [
      {
        heading: 'Sexual health checks',
        detail: 'Regular STI checks are normal and recommended — nothing to be embarrassed about. Many sexual health clinics bulk bill and are completely confidential. You don\'t need a referral, and your results are private.'
      },
      {
        heading: 'Contraception',
        detail: 'The pill, implant, IUD and other options are available in Australia. Some are free or low cost with Medicare. Talk to a GP or visit a Family Planning clinic — they\'re experienced, non-judgmental, and confidential. You can ask for a female doctor.'
      },
      {
        heading: 'If something doesn\'t feel right',
        detail: 'Unusual discharge, pain, or bleeding should always be checked by a GP. You can ask for a female doctor when you book — you always have that right. Whatever you share is confidential.'
      }
    ],
    tags: [
          { label: 'Find a sexual health clinic', type: 'external', href: 'https://www.google.com/maps/search/sexual+health+clinic+australia' },
          { label: 'Family Planning Australia', type: 'external', href: 'https://www.fpnsw.org.au' },
          { label: 'Contraception options', type: 'internal', href: '/learn' },
        ],
    aiPrompt: 'I have questions about sexual and reproductive health in Australia. Can you help me understand my options?'
  },
  {
    id: 'dental',
    icon: 'ti-dental',
    category: 'care',
    title: 'Dental care in Australia',
    subtitle: 'What\'s covered and what\'s not',
    resultTitle: 'Understanding dental care',
    steps: [
      {
        heading: 'Dental is mostly not covered by Medicare',
        detail: 'Unlike GP visits, most dental care in Australia is not free or bulk billed. You\'ll need private health insurance with extras cover, or pay out of pocket. Always ask for a cost estimate before treatment.'
      },
      {
        heading: 'Lower cost options',
        detail: 'Community dental clinics offer low-cost or free care — search "community dental clinic [your suburb]". University dental schools also offer treatment at reduced rates, with students supervised by qualified dentists. Some states have public dental waitlists for eligible residents.'
      },
      {
        heading: 'When to go urgently',
        detail: 'Severe toothache, swelling in your jaw or face, or a dental abscess needs urgent attention. If you can\'t see a dentist quickly, go to a hospital ED — dental infections can become serious and spread quickly.'
      }
    ],
    tags: [
          { label: 'Find a community dental clinic', type: 'external', href: 'https://www.google.com/maps/search/community+dental+clinic' },
          { label: 'University dental schools', type: 'external', href: 'https://www.ada.org.au/find-a-dentist' },
          { label: 'Dental health insurance', type: 'internal', href: '/learn' },
        ],
    aiPrompt: 'I need dental care in Australia. What are my options and what will it cost?'
  },
  {
    id: 'rights',
    icon: 'ti-shield',
    category: 'rights',
    title: 'Your rights as a patient',
    subtitle: 'What you can always ask for',
    resultTitle: 'Know your rights',
    steps: [
      {
        heading: 'You can always ask for a female doctor',
        detail: 'When booking any appointment, you can request a female GP, specialist, or nurse. You don\'t need to explain why. If a clinic says they can\'t accommodate this, you can find another clinic — it\'s your right.'
      },
      {
        heading: 'You can bring someone with you',
        detail: 'You\'re always allowed to bring a friend, partner, or support person to any appointment. They can help you understand what\'s being said, translate, or just be there for support. Tell the clinic when you book.'
      },
      {
        heading: 'You have the right to an interpreter',
        detail: 'If English isn\'t your first language, you can request a free medical interpreter for any appointment. Call the Translating and Interpreting Service (TIS National) on 131 450 — available 24/7, free for most healthcare appointments.'
      },
      {
        heading: 'Your health information is confidential',
        detail: 'Everything you share with a doctor is private. They cannot share your information with family members, employers, or visa authorities without your consent (except in very rare safety situations). You can ask your doctor to explain their privacy policy.'
      }
    ],
    tags: [
          { label: 'TIS National interpreter', type: 'phone', href: 'tel:131450' },
          { label: 'Australian Charter of Healthcare Rights', type: 'external', href: 'https://www.safetyandquality.gov.au/australian-charter-healthcare-rights' },
          { label: 'Find a female GP', type: 'internal', href: '/care' },
        ],
    aiPrompt: 'What are my rights as a patient in Australia? I want to know what I can ask for.'
  },
  {
    id: 'prescriptions',
    icon: 'ti-prescription',
    category: 'rights',
    title: 'Medication & prescriptions',
    subtitle: 'Getting medicine in Australia',
    resultTitle: 'How prescriptions work here',
    steps: [
      {
        heading: 'Most medicines need a prescription',
        detail: 'If you take regular medication from your home country, you\'ll need an Australian prescription to get it here. Book a GP appointment and bring your original packaging or a letter from your doctor back home — this helps the GP prescribe the right equivalent.'
      },
      {
        heading: 'The Pharmaceutical Benefits Scheme (PBS)',
        detail: 'Many prescription medicines are subsidised by the Australian government under the PBS, making them much cheaper. With a valid prescription, most medications cost around $30 or less. If you have Medicare, you may pay even less. Ask your pharmacist if your medicine is PBS listed.'
      },
      {
        heading: 'Over-the-counter medicines',
        detail: 'Common medicines like paracetamol, ibuprofen, antihistamines, and some contraceptives are available without a prescription at any pharmacy (chemist). Pharmacists are highly trained — don\'t hesitate to ask them questions, it\'s part of their job.'
      }
    ],
    tags: [
  { label: 'Find a pharmacy near me', type: 'external', href: 'https://www.google.com/maps/search/pharmacy' },
  { label: 'PBS medicines list', type: 'external', href: 'https://www.pbs.gov.au' },
  { label: 'Bringing medicine into Australia', type: 'external', href: 'https://www.abf.gov.au/entering-and-leaving-australia/what-you-can-bring-in/categories/medicines-and-substances' },
],
    aiPrompt: 'I need to get my regular medication in Australia. How do prescriptions work here?'
  },
  {
    id: 'eyes',
    icon: 'ti-eye',
    category: 'rights',
    title: 'Eye care',
    subtitle: 'Glasses, contacts & eye health',
    resultTitle: 'Eye care in Australia',
    steps: [
      {
        heading: 'Optometrist visits are free with Medicare',
        detail: 'Seeing an optometrist (eye check) is covered by Medicare — you pay nothing for a standard eye test. You don\'t need a referral. You can book directly with any optometrist. Tests are recommended every 2 years, or sooner if you notice changes.'
      },
      {
        heading: 'Glasses and contact lenses are not covered',
        detail: 'Medicare covers the eye test, but not the cost of glasses or contact lenses. These are out-of-pocket costs unless you have private health insurance with extras cover. Budget options like Specsavers or Bailey Nelson offer more affordable frames.'
      },
      {
        heading: 'Eye problems that need urgent attention',
        detail: 'Sudden vision changes, eye pain, redness, or flashes of light should be seen urgently — same day if possible. Call an optometrist or go to an ED. Don\'t wait for a routine appointment if something feels sudden or serious.'
      }
    ],
    tags: [
  { label: 'Find an optometrist near me', type: 'external', href: 'https://www.google.com/maps/search/optometrist' },
  { label: 'Medicare eye test', type: 'internal', href: '/learn' },
  { label: 'Affordable glasses in Australia', type: 'external', href: 'https://www.specsavers.com.au' },
],
    aiPrompt: 'I need an eye check or new glasses in Australia. What does Medicare cover and what will I pay?'
  },
  {
    id: 'emergency-contacts',
    icon: 'ti-phone',
    category: 'rights',
    title: 'Emergency contacts & helplines',
    subtitle: 'Quick reference — save this',
    resultTitle: 'Important numbers to save',
    steps: [
      {
        heading: '000 — Emergency (ambulance, police, fire)',
        detail: 'Call 000 for life-threatening emergencies only. Ambulances can be expensive without insurance — if it\'s not life-threatening, consider other options below first.'
      },
      {
        heading: '13SICK (13 74 25) — Nurse on call, free, 24/7',
        detail: 'Not sure if you need emergency care? Call 13SICK first. A registered nurse will assess your situation and tell you exactly what to do. Free, available most states, no appointment needed.'
      },
      {
        heading: 'Lifeline 13 11 14 — Mental health crisis, 24/7',
        detail: 'Call or text Lifeline any time for emotional distress, anxiety, or crisis support. Free, confidential, available 24/7. You don\'t have to be in extreme crisis to call — they\'re there for any level of distress.'
      },
      {
        heading: 'Other important numbers',
        detail: 'Beyond Blue: 1300 22 4636 (mental health support). TIS National: 131 450 (free interpreter service). Medicare: 132 011 (billing and claims questions). 1800RESPECT: 1800 737 732 (domestic violence support, 24/7).'
      }
    ],
    tags: [
  { label: 'Call 000', type: 'phone', href: 'tel:000' },
  { label: 'Call 13SICK', type: 'phone', href: 'tel:137425' },
  { label: 'Lifeline', type: 'phone', href: 'tel:131114' },
  { label: 'Beyond Blue', type: 'phone', href: 'tel:1300224636' },
  { label: 'TIS National', type: 'phone', href: 'tel:131450' },
],
    aiPrompt: 'What are the important health and emergency phone numbers I should know in Australia?'
  }
]

export const guideQuestions = [
  {
    id: 'q1',
    text: 'What\'s going on for you today?',
    options: [
      { label: 'I feel sick or unwell', situationId: 'unwell' },
      { label: 'I have minor symptoms — not sure if I need a GP', situationId: 'minor' },
      { label: 'I\'m worried about money or costs', situationId: 'cost' },
      { label: 'I got a bill I don\'t understand', situationId: 'bill' },
      { label: 'I\'m feeling overwhelmed or anxious', situationId: 'mental' },
      { label: 'I just want a routine checkup', situationId: 'checkup' }
    ]
  }
]