// src/data/situations.js
// Each situation maps to a card on the /guide page.
// Edit content here without touching the component.

export const situations = [
  {
    id: 'unwell',
    icon: 'ti-thermometer',
    emoji: '🤒',
    title: 'I feel unwell',
    subtitle: 'Where do I go?',
    resultTitle: 'Here\'s where to get help',
    steps: [
      {
        heading: 'Start with a GP (general practitioner)',
        detail: 'A GP is your first stop for most health problems — not the emergency room. Look for "bulk billing" clinics near you — these are completely free if you have Medicare.'
      },
      {
        heading: 'No Medicare yet?',
        detail: 'Check your university health centre first — most are free for enrolled students. Some private GPs also bulk bill international students.'
      },
      {
        heading: 'Is it an emergency?',
        detail: 'If you\'re having chest pain, trouble breathing, or feel seriously unsafe — go to the nearest emergency department (ED) or call 000. EDs can\'t turn you away.'
      }
    ],
    tags: ['Find a bulk billing clinic', 'What is Medicare?', 'When to go to ED'],
    aiPrompt: 'I feel unwell and need help figuring out where to go in Australia.'
  },
  {
    id: 'cost',
    icon: 'ti-coin',
    emoji: '💸',
    title: 'Worried about cost',
    subtitle: 'What\'s free or cheap?',
    resultTitle: 'Understanding what you\'ll pay',
    steps: [
      {
        heading: 'Bulk billing = free with Medicare',
        detail: 'If a clinic says "bulk billing", your visit costs you nothing — Medicare pays the doctor directly. Always ask "do you bulk bill?" before booking.'
      },
      {
        heading: 'Don\'t have Medicare?',
        detail: 'As an international student or temporary resident, you may not have Medicare. Your Overseas Student Health Cover (OSHC) insurance should cover most GP visits — check your policy first.'
      },
      {
        heading: 'Out-of-pocket costs',
        detail: 'If a clinic doesn\'t bulk bill, they\'ll charge a "gap fee" on top of what Medicare covers. Always ask the total cost upfront — you have every right to know.'
      }
    ],
    tags: ['Bulk billing explained', 'What is OSHC?', 'Find free clinics near me'],
    aiPrompt: 'I\'m worried about the cost of healthcare in Australia. Can you help me understand what I\'ll need to pay?'
  },
  {
    id: 'bill',
    icon: 'ti-file-invoice',
    emoji: '📄',
    title: 'Got a confusing bill',
    subtitle: 'What do I actually owe?',
    resultTitle: 'Breaking down your bill',
    steps: [
      {
        heading: 'Check for a Medicare Benefit',
        detail: 'Most bills show a "Medicare benefit" — this is what the government pays. You only owe the difference (the "gap"). If you\'ve already paid the full amount, Medicare may owe you a rebate.'
      },
      {
        heading: 'Claim your Medicare rebate',
        detail: 'If you paid upfront, you can get some money back. Log in to Medicare via MyGov, or visit a Medicare service centre. You usually have 2 years to claim.'
      },
      {
        heading: 'Something doesn\'t look right?',
        detail: 'You can call the clinic and ask them to explain every line. You can also call Medicare on 132 011 — they\'re used to explaining bills and won\'t judge you for asking.'
      }
    ],
    tags: ['How to claim Medicare', 'What is a gap fee?', 'Contact Medicare'],
    aiPrompt: 'I received a medical bill in Australia and I\'m confused about what I owe. Can you help me understand it?'
  },
  {
    id: 'checkup',
    icon: 'ti-clipboard-check',
    emoji: '✅',
    title: 'Routine checkup',
    subtitle: 'How do I book one?',
    resultTitle: 'Getting a routine checkup',
    steps: [
      {
        heading: 'Book a standard GP appointment',
        detail: 'Tell the receptionist you want a "general health check" or "routine checkup". Most GPs can see you within a few days — no emergency needed.'
      },
      {
        heading: 'What\'s usually included',
        detail: 'Blood pressure, basic blood tests, and a general conversation about your health. If you need anything specific (e.g. cervical screening, mental health check), mention it when you book.'
      },
      {
        heading: 'Women\'s health checks',
        detail: 'Australia has free screening programs for cervical cancer (Pap smear equivalent) and breast cancer. Ask your GP what you\'re due for based on your age.'
      }
    ],
    tags: ['Find a GP near me', 'Women\'s health checks', 'Free screening programs'],
    aiPrompt: 'I want to get a routine health checkup in Australia. What should I know before I go?'
  }
]

export const guideQuestions = [
  {
    id: 'q1',
    text: 'What\'s going on for you today?',
    options: [
      { label: 'I feel sick or unwell', situationId: 'unwell' },
      { label: 'I\'m worried about money / costs', situationId: 'cost' },
      { label: 'I got a bill I don\'t understand', situationId: 'bill' },
      { label: 'I just want a routine checkup', situationId: 'checkup' }
    ]
  }
]