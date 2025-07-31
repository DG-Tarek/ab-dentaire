export interface Card {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  mark: string
  status: 'active' | 'inactive' | 'draft'
  createdAt: string
  updatedAt: string
  tags: string[]
  price?: number
  rating?: number
}

export const dummyCards: Card[] = [
  {
    id: "1",
    title: "Blanchiment Dentaire",
    description: "Service de blanchiment professionnel pour un sourire éclatant. Traitement sûr et efficace en cabinet dentaire.",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
    category: "Esthétique",
    mark: "Premium",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    tags: ["blanchiment", "esthétique", "professionnel"],
    price: 150,
    rating: 4.8
  },
  {
    id: "2",
    title: "Implant Dentaire",
    description: "Pose d'implants dentaires de haute qualité. Solution durable pour remplacer les dents manquantes.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    category: "Chirurgie",
    mark: "Expert",
    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    tags: ["implant", "chirurgie", "durable"],
    price: 1200,
    rating: 4.9
  },
  {
    id: "3",
    title: "Détartrage et Nettoyage",
    description: "Nettoyage professionnel et détartrage pour maintenir une excellente santé bucco-dentaire.",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
    category: "Hygiène",
    mark: "Standard",
    status: "active",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
    tags: ["nettoyage", "hygiène", "préventif"],
    price: 80,
    rating: 4.7
  },
  {
    id: "4",
    title: "Orthodontie Invisible",
    description: "Traitement orthodontique avec aligneurs transparents pour un sourire parfait de manière discrète.",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    category: "Orthodontie",
    mark: "Premium",
    status: "active",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
    tags: ["orthodontie", "invisible", "aligneurs"],
    price: 2500,
    rating: 4.6
  },
  {
    id: "5",
    title: "Couronne Céramique",
    description: "Couronnes dentaires en céramique de haute qualité pour restaurer la fonction et l'esthétique.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    category: "Prothèse",
    mark: "Expert",
    status: "active",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
    tags: ["couronne", "céramique", "restauration"],
    price: 600,
    rating: 4.8
  },
  {
    id: "6",
    title: "Extraction de Dents de Sagesse",
    description: "Extraction chirurgicale des dents de sagesse avec anesthésie locale et suivi post-opératoire.",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
    category: "Chirurgie",
    mark: "Standard",
    status: "active",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-12",
    tags: ["extraction", "chirurgie", "sagesse"],
    price: 300,
    rating: 4.5
  }
]

export const getCardById = (id: string): Card | undefined => {
  return dummyCards.find(card => card.id === id)
}

export const getCardsByCategory = (category: string): Card[] => {
  return dummyCards.filter(card => card.category === category)
}

export const getCategories = (): string[] => {
  return [...new Set(dummyCards.map(card => card.category))]
} 