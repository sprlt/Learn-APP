import { Subject } from '../types'

export const subjects: Subject[] = [
  {
    id: 'greek',
    name: 'Grec moderne',
    description: 'Apprenez le grec moderne avec du vocabulaire essentiel',
    icon: 'Greek',
    color: '#2563eb',
    categories: [
      {
        id: 'greek-verbs',
        name: 'Verbes (present)',
        description: 'Les verbes les plus courants au present de l indicatif',
        cardCount: 150,
        seriesCount: 10
      },
      {
        id: 'greek-adjectives',
        name: 'Adjectifs',
        description: 'Adjectifs courants pour decrire et qualifier',
        cardCount: 150,
        seriesCount: 10
      },
      {
        id: 'greek-nouns',
        name: 'Noms communs',
        description: 'Vocabulaire de base : objets, lieux, personnes',
        cardCount: 150,
        seriesCount: 10
      }
    ]
  },
  {
    id: 'geography',
    name: 'Geographie',
    description: 'Pays, capitales, drapeaux et cartes du monde',
    icon: 'Globe',
    color: '#059669',
    categories: [
      {
        id: 'geo-flags',
        name: 'Drapeaux',
        description: 'Identifiez les drapeaux des pays du monde',
        cardCount: 50
      },
      {
        id: 'geo-capitals',
        name: 'Capitales',
        description: 'Trouvez la capitale de chaque pays',
        cardCount: 50
      },
      {
        id: 'geo-map',
        name: 'Carte interactive',
        description: 'Localisez les pays sur la carte du monde',
        cardCount: 50
      }
    ]
  },
  {
    id: 'history',
    name: 'Histoire',
    description: 'Les grandes periodes et evenements historiques',
    icon: 'Clock',
    color: '#dc2626',
    categories: []
  },
  {
    id: 'politics',
    name: 'Politique',
    description: 'Theorie politique et geopolitique',
    icon: 'Scale',
    color: '#7c3aed',
    categories: []
  },
  {
    id: 'psychology',
    name: 'Psychologie',
    description: 'Biais cognitifs, psychologie sociale et fonctionnement humain',
    icon: 'Brain',
    color: '#db2777',
    categories: []
  },
  {
    id: 'finance',
    name: 'Argent & Finance',
    description: 'Investissement, patrimoine et entrepreneuriat',
    icon: 'TrendingUp',
    color: '#d97706',
    categories: []
  },
  {
    id: 'general',
    name: 'Culture generale',
    description: 'Sciences, philosophie et grandes decouvertes',
    icon: 'BookOpen',
    color: '#0891b2',
    categories: []
  }
]
