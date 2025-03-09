const cabinsData = [
  {
    id: 1,
    name: "Cabin 6",
    description: "Lakefront cabin with private dock and fire pit. Features two bedrooms, a loft, and a sleeper sofa. Full kitchen with stove, microwave, and fridge. BBQ included. No bathroom - shower house located directly across from cabin.",
    price: 200,
    sleeps: 5,
    amenities: {
      kitchen: true,
      plumbing: false,
      bathroom: false,
      bedrooms: 2,
      loft: true,
      sofa: true,
      dock: true,
      firePit: true,
      bbq: true
    },
    images: [],
    galleryImages: [
      "/cabin6.jpg", 
      "/cabin6-dock.jpg", 
      "/cabin6-bedroom.jpg",
      "/cabin6-bedroom2.jpg",
      "/cabin6-kitchen.jpg"
    ],
    winterAvailable: true
  },
  {
    id: 2,
    name: "Family Retreat (Deluxe)",
    description: "Our deluxe cabin with full plumbing, private bathroom with stand-up shower, and a complete kitchen. Features two bedrooms, a loft space, and a comfortable sofa. Perfect for families.",
    price: 200,
    sleeps: 6,
    amenities: {
      kitchen: true,
      plumbing: true,
      bathroom: true,
      bedrooms: 2,
      loft: true,
      sofa: true,
      dock: true,
      bbq: true
    },
    images: [],
    galleryImages: [
      "/cabin2bedroom1.jpg",
      "/cabin2bedroom2.jpg",
      "/cabin2couch.jpg",
      "/cabin2kitchen.jpg",
      "/cabin2water.jpg",
      "/cabin2lake.jpg"
    ],
    winterAvailable: false  // Not available in winter
  },
  {
    id: 3,
    name: "Cabin 5",
    description: "Cozy cabin with three bedrooms, a comfortable living area with couch and chair. Includes a fridge and stove. No running water - shower house access included.",
    price: 120,
    sleeps: 6,
    amenities: {
      kitchen: true,
      plumbing: false,
      bathroom: false,
      bedrooms: 3,
      loft: false,
      sofa: true,
      fridge: true,
      stove: true
    },
    images: [],
    galleryImages: [
      "/cabin5bedroom.jpg",
      "/cabin5bed2.jpg",
      "/cabin5bed3.jpg",
      "/cabin5kitchen.jpg",
      "/cabin5chair.jpg",
      "/cabin5couch.jpg",
      "/cabin5kitchen2.jpg",
      "/cabin5deck.jpg"
    ],
    winterAvailable: true
  },
  {
    id: 4,
    name: "Cabin 4",
    description: "Cozy rustic cabin perfect for couples with one bedroom and a comfortable couch. Includes a stove and fridge for basic meal preparation. No running water - shower house access included.",
    price: 150,
    sleeps: 2,
    amenities: {
      kitchen: true,
      plumbing: false,
      bathroom: false,
      bedrooms: 1,
      loft: false,
      sofa: true,
      fridge: true,
      stove: true
    },
    images: [],
    galleryImages: [
      "/cabin4ex.jpg",
      "/cabin4bed.jpg",
      "/cabin4couch.jpg",
      "/cabin4kitchen.jpg",
      "/cabin4kitchen2.jpg",
      "/cabin4view.jpg"
    ],
    winterAvailable: false
  }
];

export default cabinsData;