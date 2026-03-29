export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
  brand?: string;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "The Prairie Midi Dress",
    price: 168,
    category: "dresses",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1583&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436990144-7bb006b5b1ae?q=80&w=1481&auto=format&fit=crop"
    ],
    colors: ["#F5F1EB", "#B55A44"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    brand: "Free the Roses"
  },
  {
    id: "p2",
    name: "Linen Blend Wide Leg Pants",
    price: 120,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1587&auto=format&fit=crop"
    ],
    colors: ["#2F2E2C", "#F8F6F4"],
    sizes: ["0", "2", "4", "6", "8", "10", "12"],
    brand: "Grey Lab"
  },
  {
    id: "p3",
    name: "Oversized Cashmere Sweater",
    price: 245,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1372&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550614000-4b95d8822d1a?q=80&w=1364&auto=format&fit=crop"
    ],
    colors: ["#A8B4A5"],
    sizes: ["S", "M", "L"],
    brand: "Endless Rose"
  },
  {
    id: "p4",
    name: "Woven Leather Tote",
    price: 298,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1315&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1476&auto=format&fit=crop"
    ],
    isNew: true,
    brand: "English Factory"
  },
  {
    id: "p5",
    name: "Silk Slip Skirt",
    price: 148,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1587&auto=format&fit=crop"
    ],
    colors: ["#B55A44", "#2F2E2C"],
    sizes: ["XS", "S", "M", "L"],
    brand: "Endless Rose"
  },
  {
    id: "p6",
    name: "Tiered Cotton Maxi Dress",
    price: 188,
    category: "dresses",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1583&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1527&auto=format&fit=crop"
    ],
    brand: "English Factory"
  },
  {
    id: "p7",
    name: "Strappy Leather Sandals",
    price: 135,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593010964115-4682ea387340?q=80&w=1470&auto=format&fit=crop"
    ],
    sizes: ["6", "7", "8", "9", "10"],
    brand: "Grey Lab"
  },
  {
    id: "p8",
    name: "Gold Hoops Set",
    price: 48,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?q=80&w=1527&auto=format&fit=crop"
    ],
    brand: "Endless Rose"
  }
];
