/**
 * Chatbot Q&A Dataset
 * Source of truth for all chatbot responses
 * All data is in English - translations happen at runtime
 */

export interface QAEntry {
  id: string;
  keywords: string[]; // Keywords to match user questions
  question: string;
  answer: string;
  category: 'location' | 'visa' | 'availability' | 'experience' | 'language' | 'role' | 'team' | 'salary';
}

export const qaDataset: QAEntry[] = [
  {
    id: 'location',
    keywords: ['where', 'located', 'location', 'based', 'live', 'city', 'country', 'berlin', 'germany'],
    question: 'Where are you currently located?',
    answer: 'I am currently based in Berlin, Germany.',
    category: 'location',
  },
  {
    id: 'work-permit',
    keywords: ['legal', 'allowed', 'work', 'permit', 'authorization', 'right to work'],
    question: 'Are you legally allowed to work in Germany?',
    answer: 'Yes, I am legally allowed to work in Germany. I hold an Opportunity Card (Chancenkarte) visa.',
    category: 'visa',
  },
  {
    id: 'visa-sponsorship',
    keywords: ['visa', 'sponsorship', 'sponsor', 'require'],
    question: 'Do you require visa sponsorship?',
    answer: 'No, I do not require visa sponsorship.',
    category: 'visa',
  },
  {
    id: 'start-date',
    keywords: ['start', 'date', 'begin', 'available', 'earliest', 'when', 'join'],
    question: 'When is your earliest possible start date?',
    answer: 'My earliest possible start date is March 2, 2026.',
    category: 'availability',
  },
  {
    id: 'work-mode',
    keywords: ['remote', 'hybrid', 'onsite', 'office', 'home', 'work from', 'flexible', 'arrangement'],
    question: 'Are you open to remote, hybrid, or onsite work?',
    answer: 'Yes, I am open to remote, hybrid, and onsite work.',
    category: 'availability',
  },
  {
    id: 'experience-years',
    keywords: ['experience', 'years', 'how long', 'frontend', 'developer', 'expertise'],
    question: 'How many years of experience do you have as a Frontend Developer?',
    answer: 'I have 6 years of experience as a Frontend Developer, with strong expertise in React, TypeScript, and JavaScript.',
    category: 'experience',
  },
  {
    id: 'english-level',
    keywords: ['english', 'proficiency', 'level', 'speak english', 'language english'],
    question: 'What is your English proficiency level?',
    answer: 'My English proficiency level is B2.',
    category: 'language',
  },
  {
    id: 'german-level',
    keywords: ['german', 'deutsch', 'speak german', 'language german'],
    question: 'Do you speak German? If yes, at what level?',
    answer: 'Yes, I speak German at an A2 level. I am actively working on improving it and study and practice German every day.',
    category: 'language',
  },
  {
    id: 'role-level',
    keywords: ['role', 'level', 'junior', 'mid', 'senior', 'position', 'looking for', 'type of role'],
    question: 'What type of role are you looking for (Junior / Mid / Senior)?',
    answer: 'I am primarily focusing on Mid to Senior Frontend Developer roles. However, I am also open to Junior-level positions, as I have recently relocated to Germany.',
    category: 'role',
  },
  {
    id: 'team-expectations',
    keywords: ['team', 'culture', 'environment', 'colleagues', 'looking for in', 'expect', 'ideal team'],
    question: 'What are you looking for in your next team?',
    answer: 'I am looking for a dynamic and collaborative team where people are motivated and supportive. I enjoy working in a goal-oriented environment where the product is continuously improving and reaching more users. Being able to see the real impact of my work is very motivating for me.',
    category: 'team',
  },
  {
    id: 'salary',
    keywords: ['salary', 'compensation', 'money', 'pay', 'expected', 'range', 'gross', 'annual', 'year', 'eur', 'euro'],
    question: 'What is your expected salary range (gross per year in EUR)?',
    answer: 'My salary expectations depend on the scope of the role and level of responsibility. I am generally looking for a range between €50,000 and €70,000 gross per year. That said, I am open to discussion if the role, responsibilities, and growth opportunities are a good overall fit.',
    category: 'salary',
  },
];

// Greeting messages per language
export const greetings: Record<string, string> = {
  en: "Hello! I'm here to help you learn more about Nguyen. Feel free to ask me any questions about his background, experience, or availability.",
  de: "Hallo! Ich bin hier, um Ihnen mehr über Nguyen zu erzählen. Stellen Sie mir gerne Fragen zu seinem Hintergrund, seiner Erfahrung oder Verfügbarkeit.",
  fr: "Bonjour ! Je suis là pour vous aider à en savoir plus sur Nguyen. N'hésitez pas à me poser des questions sur son parcours, son expérience ou sa disponibilité.",
};

// Unknown question response per language (without email - will show contact button instead)
export const unknownResponses: Record<string, string> = {
  en: "I don't have that information available in this chat. For more details, please contact Nguyen directly:",
  de: "Diese Information ist in diesem Chat leider nicht verfügbar. Für weitere Details kontaktieren Sie Nguyen bitte direkt:",
  fr: "Je n'ai pas cette information disponible dans ce chat. Pour plus de détails, veuillez contacter Nguyen directement :",
};

// Contact button label per language
export const contactButtonLabel: Record<string, string> = {
  en: 'Contact Me',
  de: 'Kontaktieren',
  fr: 'Me contacter',
};

// Suggested questions label per language
export const suggestedQuestionsLabel: Record<string, string> = {
  en: 'Suggested questions:',
  de: 'Vorgeschlagene Fragen:',
  fr: 'Questions suggérées :',
};

// Question translations (German)
export const questionTranslations: Record<string, Record<string, string>> = {
  de: {
    'Where are you currently located?': 'Wo befinden Sie sich derzeit?',
    'Are you legally allowed to work in Germany?': 'Sind Sie berechtigt, in Deutschland zu arbeiten?',
    'Do you require visa sponsorship?': 'Benötigen Sie eine Visumsponsoring?',
    'When is your earliest possible start date?': 'Was ist Ihr frühestmöglicher Starttermin?',
    'Are you open to remote, hybrid, or onsite work?': 'Sind Sie offen für Remote-, Hybrid- oder Vor-Ort-Arbeit?',
    'How many years of experience do you have as a Frontend Developer?': 'Wie viele Jahre Erfahrung haben Sie als Frontend-Entwickler?',
    'What is your English proficiency level?': 'Wie gut sind Ihre Englischkenntnisse?',
    'Do you speak German? If yes, at what level?': 'Sprechen Sie Deutsch? Wenn ja, auf welchem Niveau?',
    'What type of role are you looking for (Junior / Mid / Senior)?': 'Welche Art von Position suchen Sie (Junior / Mid / Senior)?',
    'What are you looking for in your next team?': 'Was erwarten Sie von Ihrem nächsten Team?',
    'What is your expected salary range (gross per year in EUR)?': 'Was ist Ihre Gehaltsvorstellung (brutto pro Jahr in EUR)?',
  },
  fr: {
    'Where are you currently located?': 'Où êtes-vous actuellement situé ?',
    'Are you legally allowed to work in Germany?': 'Êtes-vous légalement autorisé à travailler en Allemagne ?',
    'Do you require visa sponsorship?': 'Avez-vous besoin d\'un parrainage de visa ?',
    'When is your earliest possible start date?': 'Quelle est votre date de début la plus proche possible ?',
    'Are you open to remote, hybrid, or onsite work?': 'Êtes-vous ouvert au travail à distance, hybride ou sur site ?',
    'How many years of experience do you have as a Frontend Developer?': 'Combien d\'années d\'expérience avez-vous en tant que développeur Frontend ?',
    'What is your English proficiency level?': 'Quel est votre niveau d\'anglais ?',
    'Do you speak German? If yes, at what level?': 'Parlez-vous allemand ? Si oui, à quel niveau ?',
    'What type of role are you looking for (Junior / Mid / Senior)?': 'Quel type de poste recherchez-vous (Junior / Mid / Senior) ?',
    'What are you looking for in your next team?': 'Que recherchez-vous dans votre prochaine équipe ?',
    'What is your expected salary range (gross per year in EUR)?': 'Quelle est votre fourchette salariale attendue (brut par an en EUR) ?',
  },
};

// Answer translations (German)
export const answerTranslations: Record<string, Record<string, string>> = {
  de: {
    'I am currently based in Berlin, Germany.': 'Ich lebe derzeit in Berlin, Deutschland.',
    'Yes, I am legally allowed to work in Germany. I hold an Opportunity Card (Chancenkarte) visa.': 'Ja, ich bin berechtigt, in Deutschland zu arbeiten. Ich besitze ein Chancenkarte-Visum.',
    'No, I do not require visa sponsorship.': 'Nein, ich benötige kein Visumsponsoring.',
    'My earliest possible start date is March 2, 2026.': 'Mein frühestmöglicher Starttermin ist der 2. März 2026.',
    'Yes, I am open to remote, hybrid, and onsite work.': 'Ja, ich bin offen für Remote-, Hybrid- und Vor-Ort-Arbeit.',
    'I have 6 years of experience as a Frontend Developer, with strong expertise in React, TypeScript, and JavaScript.': 'Ich habe 6 Jahre Erfahrung als Frontend-Entwickler mit fundierter Expertise in React, TypeScript und JavaScript.',
    'My English proficiency level is B2.': 'Mein Englischniveau ist B2.',
    'Yes, I speak German at an A2 level. I am actively working on improving it and study and practice German every day.': 'Ja, ich spreche Deutsch auf A2-Niveau. Ich arbeite aktiv daran, mich zu verbessern und lerne und übe jeden Tag Deutsch.',
    'I am primarily focusing on Mid to Senior Frontend Developer roles. However, I am also open to Junior-level positions, as I have recently relocated to Germany.': 'Ich konzentriere mich hauptsächlich auf Mid- bis Senior-Frontend-Entwickler-Positionen. Ich bin jedoch auch offen für Junior-Positionen, da ich kürzlich nach Deutschland umgezogen bin.',
    'I am looking for a dynamic and collaborative team where people are motivated and supportive. I enjoy working in a goal-oriented environment where the product is continuously improving and reaching more users. Being able to see the real impact of my work is very motivating for me.': 'Ich suche ein dynamisches und kollaboratives Team, in dem die Menschen motiviert und unterstützend sind. Ich arbeite gerne in einer zielorientierten Umgebung, in der das Produkt kontinuierlich verbessert wird und mehr Nutzer erreicht. Die realen Auswirkungen meiner Arbeit zu sehen, motiviert mich sehr.',
    'My salary expectations depend on the scope of the role and level of responsibility. I am generally looking for a range between €50,000 and €70,000 gross per year. That said, I am open to discussion if the role, responsibilities, and growth opportunities are a good overall fit.': 'Meine Gehaltsvorstellungen hängen vom Umfang der Rolle und dem Verantwortungsniveau ab. Ich suche generell eine Spanne zwischen 50.000 € und 70.000 € brutto pro Jahr. Dennoch bin ich offen für Gespräche, wenn die Rolle, Verantwortlichkeiten und Wachstumsmöglichkeiten insgesamt gut passen.',
  },
  fr: {
    'I am currently based in Berlin, Germany.': 'Je suis actuellement basé à Berlin, en Allemagne.',
    'Yes, I am legally allowed to work in Germany. I hold an Opportunity Card (Chancenkarte) visa.': 'Oui, je suis légalement autorisé à travailler en Allemagne. Je possède un visa Chancenkarte (Carte d\'opportunité).',
    'No, I do not require visa sponsorship.': 'Non, je n\'ai pas besoin de parrainage de visa.',
    'My earliest possible start date is March 2, 2026.': 'Ma date de début la plus proche possible est le 2 mars 2026.',
    'Yes, I am open to remote, hybrid, and onsite work.': 'Oui, je suis ouvert au travail à distance, hybride et sur site.',
    'I have 6 years of experience as a Frontend Developer, with strong expertise in React, TypeScript, and JavaScript.': 'J\'ai 6 ans d\'expérience en tant que développeur Frontend, avec une forte expertise en React, TypeScript et JavaScript.',
    'My English proficiency level is B2.': 'Mon niveau d\'anglais est B2.',
    'Yes, I speak German at an A2 level. I am actively working on improving it and study and practice German every day.': 'Oui, je parle allemand au niveau A2. Je travaille activement à m\'améliorer et j\'étudie et pratique l\'allemand tous les jours.',
    'I am primarily focusing on Mid to Senior Frontend Developer roles. However, I am also open to Junior-level positions, as I have recently relocated to Germany.': 'Je me concentre principalement sur des postes de développeur Frontend Mid à Senior. Cependant, je suis également ouvert aux postes Junior, car j\'ai récemment déménagé en Allemagne.',
    'I am looking for a dynamic and collaborative team where people are motivated and supportive. I enjoy working in a goal-oriented environment where the product is continuously improving and reaching more users. Being able to see the real impact of my work is very motivating for me.': 'Je recherche une équipe dynamique et collaborative où les gens sont motivés et solidaires. J\'aime travailler dans un environnement orienté objectifs où le produit s\'améliore continuellement et atteint plus d\'utilisateurs. Pouvoir voir l\'impact réel de mon travail est très motivant pour moi.',
    'My salary expectations depend on the scope of the role and level of responsibility. I am generally looking for a range between €50,000 and €70,000 gross per year. That said, I am open to discussion if the role, responsibilities, and growth opportunities are a good overall fit.': 'Mes attentes salariales dépendent de l\'étendue du rôle et du niveau de responsabilité. Je recherche généralement une fourchette entre 50 000 € et 70 000 € brut par an. Cela dit, je suis ouvert à la discussion si le rôle, les responsabilités et les opportunités de croissance correspondent bien dans l\'ensemble.',
  },
};

/**
 * Get translated question
 */
export function getTranslatedQuestion(question: string, locale: string): string {
  if (locale === 'en') return question;
  return questionTranslations[locale]?.[question] || question;
}

/**
 * Get translated answer
 */
export function getTranslatedAnswer(answer: string, locale: string): string {
  if (locale === 'en') return answer;
  return answerTranslations[locale]?.[answer] || answer;
}

/**
 * Find matching Q&A entry based on user input
 */
export function findMatchingQA(userInput: string): QAEntry | null {
  const normalizedInput = userInput.toLowerCase().trim();
  
  // Calculate match score for each entry
  let bestMatch: QAEntry | null = null;
  let bestScore = 0;
  
  for (const entry of qaDataset) {
    let score = 0;
    
    // Check keyword matches
    for (const keyword of entry.keywords) {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }
    
    // Check if question words appear in input
    const questionWords = entry.question.toLowerCase().split(/\s+/);
    for (const word of questionWords) {
      if (word.length > 3 && normalizedInput.includes(word)) {
        score += 1;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  
  // Require minimum score threshold
  return bestScore >= 2 ? bestMatch : null;
}

/**
 * Find Q&A entry by ID
 */
export function findQAById(id: string): QAEntry | null {
  return qaDataset.find(e => e.id === id) || null;
}

/**
 * Suggestion item with both display text and ID
 */
export interface SuggestionItem {
  id: string;
  text: string;
}

/**
 * Get suggested follow-up questions (excluding already asked)
 * Returns both the translated text and the original ID
 */
export function getSuggestedQuestions(
  currentEntryId: string | null,
  askedQuestionIds: string[],
  locale: string,
  count: number = 3
): SuggestionItem[] {
  const suggestions: SuggestionItem[] = [];
  
  // Get related questions first (same or adjacent categories)
  const currentEntry = currentEntryId 
    ? qaDataset.find(e => e.id === currentEntryId) 
    : null;
  
  const relatedCategories: Record<string, string[]> = {
    location: ['visa', 'availability'],
    visa: ['location', 'availability'],
    availability: ['visa', 'role', 'salary'],
    experience: ['role', 'language'],
    language: ['experience', 'location'],
    role: ['experience', 'salary', 'team'],
    team: ['role', 'availability'],
    salary: ['role', 'availability'],
  };
  
  const priorityCategories = currentEntry 
    ? relatedCategories[currentEntry.category] || []
    : [];
  
  // Sort by priority (related categories first)
  const sortedEntries = [...qaDataset].sort((a, b) => {
    const aIsPriority = priorityCategories.includes(a.category) ? 1 : 0;
    const bIsPriority = priorityCategories.includes(b.category) ? 1 : 0;
    return bIsPriority - aIsPriority;
  });
  
  for (const entry of sortedEntries) {
    // Skip current question and already asked questions
    if (entry.id === currentEntryId || askedQuestionIds.includes(entry.id)) {
      continue;
    }
    
    suggestions.push({
      id: entry.id,
      text: getTranslatedQuestion(entry.question, locale),
    });
    
    if (suggestions.length >= count) {
      break;
    }
  }
  
  return suggestions;
}
