import { NextResponse } from "next/server";

const items = [
  {
    id: "1",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Blanchiment Dentaire",
    description: "Traitement de blanchiment professionnel pour un sourire éclatant.",
    price: 100,
    newPrice: 80,
    category: "A"
  },
  {
    id: "2",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Implant Dentaire",
    description: "Solution permanente pour dents manquantes.",
    price: 450,
    newPrice: 399,
    category: "B"
  },
  {
    id: "3",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Orthodontie Invisible",
    description: "Aligne vos dents discrètement avec des gouttières transparentes.",
    price: 600,
    newPrice: 550,
    category: "C"
  },
  {
    id: "4",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Détartrage",
    description: "Élimination du tartre pour une hygiène buccale optimale.",
    price: 70,
    newPrice: 50,
    category: "A"
  },
  {
    id: "5",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Facette Dentaire",
    description: "Améliorez votre sourire avec des facettes esthétiques.",
    price: 800,
    newPrice: 720,
    category: "E"
  },
  {
    id: "6",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Dévitalisation",
    description: "Traitement de canal pour dents endommagées.",
    price: 200,
    newPrice: 180,
    category: "C"
  },
  {
    id: "7",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Bridge Dentaire",
    description: "Remplace les dents manquantes avec un pont fixe.",
    price: 700,
    newPrice: 650,
    category: "B"
  },
  {
    id: "8",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Couronne Céramique",
    description: "Protège et restaure les dents abîmées.",
    price: 500,
    newPrice: 450,
    category: "D"
  },
  {
    id: "9",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Composite Esthétique",
    description: "Restaurations dentaires avec résines modernes.",
    price: 120,
    newPrice: 100,
    category: "D"
  },
  {
    id: "10",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Nettoyage Complet",
    description: "Nettoyage, polissage et fluor pour une bouche saine.",
    price: 90,
    newPrice: 75,
    category: "A"
  },
  {
    id: "11",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Radiographie Dentaire",
    description: "Imagerie numérique pour un diagnostic précis.",
    price: 50,
    newPrice: 40,
    category: "E"
  },
  {
    id: "12",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Extraction Dentaire",
    description: "Extraction rapide et sans douleur des dents.",
    price: 90,
    newPrice: 70,
    category: "C"
  },
  {
    id: "13",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Prothèse Dentaire",
    description: "Appareil amovible pour remplacer plusieurs dents.",
    price: 300,
    newPrice: 280,
    category: "D"
  },
  {
    id: "14",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Inlay / Onlay",
    description: "Alternative aux couronnes pour dents partiellement abîmées.",
    price: 250,
    newPrice: 220,
    category: "C"
  },
  {
    id: "15",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Traitement des gencives",
    description: "Traitement des infections gingivales chroniques.",
    price: 150,
    newPrice: 120,
    category: "B"
  },
  {
    id: "16",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Sceau Fissure",
    description: "Prévention des caries sur les dents permanentes.",
    price: 80,
    newPrice: 60,
    category: "A"
  },
  {
    id: "17",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Urgence Dentaire",
    description: "Prise en charge rapide des douleurs aiguës.",
    price: 100,
    newPrice: 90,
    category: "E"
  },
  {
    id: "18",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Réhabilitation Totale",
    description: "Restauration complète de l'esthétique et fonction dentaire.",
    price: 1500,
    newPrice: 1350,
    category: "E"
  },
  {
    id: "19",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Anesthésie Locale",
    description: "Gestion indolore des traitements dentaires.",
    price: 30,
    newPrice: 25,
    category: "A"
  },
  {
    id: "20",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Consultation",
    description: "Examen initial et conseils personnalisés.",
    price: 60,
    newPrice: 50,
    category: "A"
  },
  {
    id: "21",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Chirurgie Buccale",
    description: "Chirurgies mineures pour problèmes dentaires complexes.",
    price: 400,
    newPrice: 380,
    category: "C"
  },
  {
    id: "22",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Couronne Provisoire",
    description: "Protéger temporairement vos dents après traitement.",
    price: 150,
    newPrice: 130,
    category: "D"
  },
  {
    id: "23",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Blanchiment Laser",
    description: "Blanchiment rapide et efficace avec technologie laser.",
    price: 250,
    newPrice: 200,
    category: "A"
  },
  {
    id: "24",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Gouttières Nocturnes",
    description: "Prévention du bruxisme durant la nuit.",
    price: 120,
    newPrice: 100,
    category: "C"
  },
  {
    id: "25",
    img: "https://img.medicalexpo.fr/images_me/photo-g/301158-18251063.webp",
    name: "Nettoyage Air Flow",
    description: "Élimination douce de la plaque et colorations.",
    price: 110,
    newPrice: 95,
    category: "B"
  }
];


export async function GET() {
  return NextResponse.json(items);
} 