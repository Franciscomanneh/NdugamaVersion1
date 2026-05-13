export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'veg', name: 'Vegetables', icon: '🥕' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'fish', name: 'Fish', icon: '🐟' },
  { id: 'spices', name: 'Spices', icon: '🌶️' },
  { id: 'bread', name: 'Bread', icon: '🍞' },
  { id: 'grains', name: 'Grains', icon: '🌾' },
];

export interface Gardener {
  id: string;
  name: string;
  garden: string;
  location: string;
  featuredProduct: string;
  price: string;
  image: string;
  whatsapp: string;
  about: string;
  isFeatured: boolean;
  bulkProducts: {
    name: string;
    price: number;
    unit: string;
  }[];
}

export const gardeners: Gardener[] = [
  {
    id: 'g1',
    name: 'Fatou Jallow',
    garden: 'Sukuta Women Garden',
    location: 'Sukuta',
    featuredProduct: 'Fresh Tomatoes',
    price: 'D50 / kg',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60705a453d?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000001',
    about: 'Fatou has been gardening for over 15 years and specializes in organic tomatoes and peppers. She is a leader in the Sukuta Women Garden community.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Tomatoes', price: 400, unit: 'crate' },
      { name: 'Onions', price: 350, unit: 'bag' },
      { name: 'Peppers', price: 200, unit: 'basket' },
    ]
  },
  {
    id: 'g2',
    name: 'Musa Camara',
    garden: 'Brikama Eco Garden',
    location: 'Brikama',
    featuredProduct: 'Green Pepper',
    price: 'D45 / kg',
    image: 'https://images.unsplash.com/photo-1566385101042-1a000c1267c4?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000002',
    about: 'Musa focuses on sustainable agriculture and eco-friendly pest control in Brikama.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Green Pepper', price: 300, unit: 'basket' },
      { name: 'Cucumber', price: 250, unit: 'bag' },
    ]
  },
  {
    id: 'g3',
    name: 'Ebrima Sowe',
    garden: 'Lamin Orchard',
    location: 'Lamin',
    featuredProduct: 'Local Oranges',
    price: 'D100 / bag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000003',
    about: 'Ebrima manages a large orchard in Lamin providing the freshest citrus fruits in the region.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Oranges', price: 800, unit: 'large bag' },
      { name: 'Lemons', price: 500, unit: 'bag' },
    ]
  },
  {
    id: 'g4',
    name: 'Isatou Ceesay',
    garden: 'Nema Kunku Garden',
    location: 'Nema Kunku',
    featuredProduct: 'Fresh Onions',
    price: 'D60 / kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000004',
    about: 'Isatou is famous for her long-lasting red onions and community-driven garden project.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Red Onions', price: 450, unit: 'bag' },
      { name: 'Shallots', price: 300, unit: 'basket' },
    ]
  },
  {
    id: 'g5',
    name: 'Binta Bah',
    garden: 'Bakau Women Garden',
    location: 'Bakau',
    featuredProduct: 'Cabbage',
    price: 'D40 / head',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000005',
    about: 'Binta specializes in leafy vegetables and cabbage in the coastal town of Bakau.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Cabbage', price: 300, unit: 'sack' },
      { name: 'Lettuce', price: 150, unit: 'crate' },
    ]
  },
  {
    id: 'g6',
    name: 'Alieu Njie',
    garden: 'Sanyang Farm',
    location: 'Sanyang',
    featuredProduct: 'Sweet Potato',
    price: 'D80 / bag',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000006',
    about: 'Alieu runs a diverse farm in Sanyang focusing on tubers and root vegetables.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Sweet Potato', price: 600, unit: 'large bag' },
      { name: 'Cassava', price: 500, unit: 'sack' },
    ]
  },
  {
    id: 'g7',
    name: 'Kaddy Sanneh',
    garden: 'Gunjur Coastal Garden',
    location: 'Gunjur',
    featuredProduct: 'Carrots',
    price: 'D70 / kg',
    image: 'https://images.unsplash.com/photo-1444858291040-58f756a3bcd6?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000007',
    about: 'Kaddy uses traditional methods to grow some of the sweetest carrots in Gunjur.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Carrots', price: 500, unit: 'bag' },
      { name: 'Beetroot', price: 400, unit: 'basket' },
    ]
  },
  {
    id: 'g8',
    name: 'Modou Touray',
    garden: 'Banjul Urban Garden',
    location: 'Banjul',
    featuredProduct: 'Mint Leaves',
    price: 'D10 / bunch',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000008',
    about: 'Modou manages one of the few urban gardens in Banjul, providing fresh herbs daily.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Mint', price: 100, unit: 'bundle' },
      { name: 'Basil', price: 120, unit: 'bundle' },
    ]
  },
  {
    id: 'g9',
    name: 'Haddy Gaye',
    garden: 'Kartong Green Zone',
    location: 'Kartong',
    featuredProduct: 'Eggplant',
    price: 'D35 / kg',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000009',
    about: 'Haddy is an expert in diverse eggplant varieties and sustainable water management.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Eggplant', price: 250, unit: 'basket' },
      { name: 'Okra', price: 300, unit: 'basket' },
    ]
  },
  {
    id: 'g10',
    name: 'Ousman Diallo',
    garden: 'Kotu Stream Garden',
    location: 'Kotu',
    featuredProduct: 'Watermelon',
    price: 'D150 / large',
    image: 'https://images.unsplash.com/photo-1587049633562-ad3027b6f634?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000010',
    about: 'Ousman is the go-to for seasonal watermelons and cantaloupes in the Kotu area.',
    isFeatured: true,
    bulkProducts: [
      { name: 'Watermelon', price: 1200, unit: 'dozen' },
    ]
  },
  {
    id: 'g11',
    name: 'Mariama Sonko',
    garden: 'Brufut Garden',
    location: 'Brufut',
    featuredProduct: 'Papaya',
    price: 'D80 / each',
    image: 'https://images.unsplash.com/photo-1517282003859-7440b6140030?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000011',
    about: 'Mariama specializes in tropical fruits like papaya and mango.',
    isFeatured: false,
    bulkProducts: [
      { name: 'Papaya', price: 600, unit: 'box' },
    ]
  },
  {
    id: 'g12',
    name: 'Lamin Barrow',
    garden: 'Tanji Garden',
    location: 'Tanji',
    featuredProduct: 'Cassava',
    price: 'D50 / kg',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000012',
    about: 'Lamin provides high-quality root vegetables near the Tanji fishing village.',
    isFeatured: false,
    bulkProducts: [
      { name: 'Cassava', price: 400, unit: 'sack' },
    ]
  },
  {
    id: 'g13',
    name: 'Awa Faye',
    garden: 'Serrekunda Garden',
    location: 'Serrekunda',
    featuredProduct: 'Hot Pepper',
    price: 'D25 / bag',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119f702e?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000013',
    about: 'Awa grows the spiciest peppers in the heart of Serrekunda.',
    isFeatured: false,
    bulkProducts: [
      { name: 'Hot Pepper', price: 200, unit: 'basket' },
    ]
  },
  {
    id: 'g14',
    name: 'Samba Jobe',
    garden: 'Abuko Nature Farm',
    location: 'Abuko',
    featuredProduct: 'Spinach',
    price: 'D30 / bundle',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000014',
    about: 'Samba focuses on leafy greens and traditional medicinal herbs.',
    isFeatured: false,
    bulkProducts: [
      { name: 'Spinach', price: 250, unit: 'crate' },
    ]
  },
  {
    id: 'g15',
    name: ' Jainaba Krubally',
    garden: 'Bijilo Eco Project',
    location: 'Bijilo',
    featuredProduct: 'Ginger',
    price: 'D90 / kg',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=200',
    whatsapp: '+2207000015',
    about: 'Jainaba is a pioneer in ginger and turmeric cultivation in Bijilo.',
    isFeatured: false,
    bulkProducts: [
      { name: 'Ginger', price: 700, unit: 'bag' },
    ]
  },
];

export interface BundleIngredient {
  name: string;
  amount: number;
  unit: string;
  pricePerUnit: number;
}

export interface Bundle {
  id: string;
  name: string;
  image: string;
  price: number;
  ingredients: BundleIngredient[];
  cookingDescription: string;
}

export const bundles: Bundle[] = [
  {
    id: 'b1',
    name: 'Domoda Bundle',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
    price: 450,
    ingredients: [
      { name: 'Peanut paste', amount: 1, unit: 'jar', pricePerUnit: 50 },
      { name: 'Beef/Chicken', amount: 1, unit: 'kg', pricePerUnit: 250 },
      { name: 'Tomatoes', amount: 0.5, unit: 'kg', pricePerUnit: 25 },
      { name: 'Onions', amount: 0.5, unit: 'kg', pricePerUnit: 30 },
      { name: 'Sweet Potato', amount: 1, unit: 'kg', pricePerUnit: 60 },
      { name: 'Pumpkin', amount: 0.5, unit: 'kg', pricePerUnit: 35 },
    ],
    cookingDescription: 'Domoda is a classic Gambian peanut stew. Sauté onions and meat, add tomatoes and water. Once simmering, stir in peanut paste and vegetables until tender and sauce thickens.'
  },
  {
    id: 'b2',
    name: 'Benachin Bundle',
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=400',
    price: 550,
    ingredients: [
      { name: 'Broken Rice', amount: 2, unit: 'kg', pricePerUnit: 80 },
      { name: 'White Fish', amount: 1, unit: 'kg', pricePerUnit: 200 },
      { name: 'Tomatoes', amount: 0.5, unit: 'kg', pricePerUnit: 25 },
      { name: 'Carrots', amount: 0.5, unit: 'kg', pricePerUnit: 35 },
      { name: 'Eggplant', amount: 0.5, unit: 'kg', pricePerUnit: 20 },
      { name: 'Cabbage', amount: 1, unit: 'head', pricePerUnit: 40 },
      { name: 'Oil', amount: 0.5, unit: 'L', pricePerUnit: 50 },
    ],
    cookingDescription: 'Benachin (One Pot) is the Gambian Jollof rice. Fry fish and vegetables, then remove. Fry tomato paste, add water and rice. Simmer until rice is cooked and serve with the fried fish and veggies on top.'
  },
  {
    id: 'b3',
    name: 'Supakanja Bundle',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    price: 400,
    ingredients: [
      { name: 'Okra', amount: 1, unit: 'kg', pricePerUnit: 100 },
      { name: 'Dry Fish', amount: 0.5, unit: 'kg', pricePerUnit: 120 },
      { name: 'Palm Oil', amount: 0.25, unit: 'L', pricePerUnit: 60 },
      { name: 'Onions', amount: 0.5, unit: 'kg', pricePerUnit: 30 },
      { name: 'Hot Pepper', amount: 1, unit: 'bag', pricePerUnit: 30 },
      { name: 'Netetou', amount: 1, unit: 'pack', pricePerUnit: 60 },
    ],
    cookingDescription: 'Supakanja is a delicious okra stew. Boil finely chopped okra with dry fish and palm oil until it reaches a sticky consistency. Add aromatics and serve with white rice.'
  },
  {
    id: 'b4',
    name: 'Yassa Bundle',
    image: 'https://images.unsplash.com/photo-1594998813208-65744aa9924f?auto=format&fit=crop&q=80&w=400',
    price: 350,
    ingredients: [
      { name: 'Chicken', amount: 1, unit: 'kg', pricePerUnit: 220 },
      { name: 'Onions', amount: 1, unit: 'kg', pricePerUnit: 60 },
      { name: 'Lemon', amount: 4, unit: 'pcs', pricePerUnit: 20 },
      { name: 'Mustard', amount: 1, unit: 'jar', pricePerUnit: 30 },
      { name: 'Garlic', amount: 2, unit: 'bulbs', pricePerUnit: 10 },
      { name: 'Olives', amount: 1, unit: 'small jar', pricePerUnit: 10 },
    ],
    cookingDescription: 'Yassa is a tangy chicken and onion stew. Marinate chicken in lemon, mustard, and garlic. Caramelize lots of onions, add marinated chicken and simmer until tender.'
  },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  freshnessDescription: string;
  storageInstructions: string;
  relatedProductIds: string[];
  isFavorite: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Red Tomatoes',
    price: 50,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetables',
    freshnessDescription: 'Picked this morning from Sukuta gardens. Firm, ripe, and bursting with flavor.',
    storageInstructions: 'Store at room temperature away from direct sunlight for up to 5 days. For longer storage, refrigerate.',
    relatedProductIds: ['p3', 'p5', 'p6'],
    isFavorite: false,
  },
  {
    id: 'p2',
    name: 'Fresh Ladyfish',
    price: 150,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400',
    category: 'Fish',
    freshnessDescription: 'Caught at dawn today in Bakau. Clear eyes and bright red gills.',
    storageInstructions: 'Keep on ice or refrigerate immediately. Best consumed within 24 hours of delivery.',
    relatedProductIds: ['p8', 'p6'],
    isFavorite: false,
  },
  {
    id: 'p3',
    name: 'Red Onions (Large)',
    price: 60,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetables',
    freshnessDescription: 'Well-cured red onions with tight, papery skins.',
    storageInstructions: 'Store in a cool, dry, dark place with good ventilation. Do not store with potatoes.',
    relatedProductIds: ['p1', 'p5', 'p6'],
    isFavorite: false,
  },
  {
    id: 'p4',
    name: 'Local Tapalapa Bread',
    price: 15,
    unit: 'loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    category: 'Bread',
    freshnessDescription: 'Baked in traditional wood-fired ovens. Crispy crust and soft inside.',
    storageInstructions: 'Best eaten fresh. If storing, keep in a paper bag at room temperature for up to 2 days.',
    relatedProductIds: ['p1', 'p7'],
    isFavorite: false,
  },
  {
    id: 'p5',
    name: 'Green Bell Pepper',
    price: 80,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1566385101042-1a000c1267c4?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetables',
    freshnessDescription: 'Crunchy, thick-walled peppers from Brikama.',
    storageInstructions: 'Store in the crisper drawer of your refrigerator for up to 1 week.',
    relatedProductIds: ['p1', 'p3', 'p6'],
    isFavorite: false,
  },
  {
    id: 'p6',
    name: 'Hot Chili Peppers',
    price: 30,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119f702e?auto=format&fit=crop&q=80&w=400',
    category: 'Spices',
    freshnessDescription: 'Very spicy local scotch bonnet variety. Bright colors and firm texture.',
    storageInstructions: 'Refrigerate in a plastic bag or dry and store at room temperature.',
    relatedProductIds: ['p1', 'p3', 'p2'],
    isFavorite: false,
  },
  {
    id: 'p7',
    name: 'Fresh Oranges',
    price: 120,
    unit: 'basket',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=400',
    category: 'Fruits',
    freshnessDescription: 'Sweet and juicy local oranges from Lamin orchards.',
    storageInstructions: 'Store at room temperature for up to 1 week or refrigerate for longer shelf life.',
    relatedProductIds: ['p4'],
    isFavorite: false,
  },
  {
    id: 'p8',
    name: 'Smoked Bonga Fish',
    price: 100,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1604543519952-12f844779304?auto=format&fit=crop&q=80&w=400',
    category: 'Fish',
    freshnessDescription: 'Traditionally smoked using local hardwoods. Deep smoky aroma.',
    storageInstructions: 'Store in a cool, dry place. Best kept in the refrigerator.',
    relatedProductIds: ['p2', 'p6', 'p3'],
    isFavorite: false,
  },
];
