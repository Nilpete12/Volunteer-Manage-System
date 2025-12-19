const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Campaign = require('./models/Campaign'); // Import your Model

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Connected for Seeding...'))
  .catch(err => console.log(err));

// --- THE DATA ---
const campaigns = [
  {
    title: "Clean Water for Rural Villages",
    organizer: "EcoLife Foundation",
    location: "Kalahandi, Odisha",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    raised: 8500,
    goal: 12000,
    volunteersRegistered: 12,
    volunteersNeeded: 20,
    deadline: new Date('2025-12-31'),
    description: "Access to clean water is a fundamental human right. In the remote villages of Kalahandi, families walk over 5km daily to fetch water that is often unsafe. This campaign aims to install 3 solar-powered borewells.",
    budget: [
      { item: "Solar Pumps (3 units)", cost: 4500 },
      { item: "Drilling & Installation", cost: 3000 },
      { item: "Water Storage Tanks", cost: 1500 },
      { item: "Maintenance Fund", cost: 1000 },
    ],
    shifts: [
      { date: "Oct 12, 2025", time: "09:00 AM - 01:00 PM", task: "Site Preparation", slotsAvailable: 5 },
      { date: "Oct 15, 2025", time: "10:00 AM - 04:00 PM", task: "Installation Assistance", slotsAvailable: 3 },
    ]
  },
  {
    title: "Emergency Food Relief",
    organizer: "Global Aid Network",
    location: "Assam, India",
    category: "Disaster Relief",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    raised: 4500,
    goal: 5000,
    volunteersRegistered: 45,
    volunteersNeeded: 50,
    deadline: new Date('2025-11-01'),
    description: "Recent floods have displaced thousands of families. We are setting up community kitchens to provide hot meals and distributing dry ration kits.",
    budget: [
      { item: "Rice & Grains (5000kg)", cost: 2500 },
      { item: "Cooking Oil & Spices", cost: 1000 },
      { item: "Transport Logistics", cost: 1000 }
    ],
    shifts: [
      { date: "Tomorrow", time: "06:00 AM - 10:00 AM", task: "Food Preparation", slotsAvailable: 2 },
      { date: "Tomorrow", time: "10:00 AM - 02:00 PM", task: "Distribution Drive", slotsAvailable: 10 },
    ]
  },
  {
    title: "Community Education Center",
    organizer: "TeachForTomorrow",
    location: "Detroit, Michigan",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    raised: 1200,
    goal: 3000,
    volunteersRegistered: 5,
    volunteersNeeded: 15,
    deadline: new Date('2026-01-20'),
    description: "We are renovating an abandoned warehouse into a safe learning space for underprivileged kids.",
    budget: [
      { item: "Paint & Brushes", cost: 500 },
      { item: "Furniture", cost: 1500 },
      { item: "Books", cost: 500 }
    ],
    shifts: [
      { date: "Nov 5, 2025", time: "10:00 AM - 04:00 PM", task: "Painting & Cleaning", slotsAvailable: 10 }
    ]
  },
  {
    title: "Save the Stray Dogs",
    organizer: "Paw Patrol Rescue",
    location: "Bangalore, India",
    category: "Animal Welfare",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    raised: 800,
    goal: 5000,
    volunteersRegistered: 2,
    volunteersNeeded: 10,
    deadline: new Date('2025-10-30'),
    description: "Our local shelter is overcrowded. This campaign funds vaccinations, sterilization, and food for over 80 stray dogs.",
    budget: [
      { item: "Vaccinations", cost: 2000 },
      { item: "Dog Food", cost: 1500 },
      { item: "Vet Bills", cost: 1000 }
    ],
    shifts: [
      { date: "Sat, Oct 20", time: "08:00 AM - 12:00 PM", task: "Dog Walking", slotsAvailable: 5 }
    ]
  },
  {
    title: "Tech for Teens",
    organizer: "CodeFuture Inc.",
    location: "Online / Remote",
    category: "Education",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    raised: 15000,
    goal: 20000,
    volunteersRegistered: 100,
    volunteersNeeded: 120,
    deadline: new Date('2025-12-15'),
    description: "Bridging the digital divide by providing laptops and coding mentorship to high school students.",
    budget: [
      { item: "Laptops (50)", cost: 15000 },
      { item: "Wi-Fi Dongles", cost: 3000 }
    ],
    shifts: [
      { date: "Every Saturday", time: "06:00 PM - 08:00 PM", task: "Python Mentorship", slotsAvailable: 20 }
    ]
  },
  {
    title: "Beach Cleanup Drive",
    organizer: "OceanBlue Initiative",
    location: "Miami, Florida",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    raised: 500,
    goal: 2000,
    volunteersRegistered: 180,
    volunteersNeeded: 200,
    deadline: new Date('2025-09-10'),
    description: "Join us for a massive cleanup drive at South Beach.",
    budget: [
      { item: "Gloves & Bags", cost: 500 },
      { item: "Refreshments", cost: 500 },
      { item: "Disposal Fees", cost: 500 }
    ],
    shifts: [
      { date: "This Sunday", time: "07:00 AM - 11:00 AM", task: "General Cleanup", slotsAvailable: 50 }
    ]
  }
];

// --- THE SEED LOGIC ---
const seedDB = async () => {
  try {
    // 1. Delete everything first (start fresh)
    await Campaign.deleteMany({});
    console.log("Existing campaigns removed...");

    // 2. Insert new data
    await Campaign.insertMany(campaigns);
    console.log("✅ 6 Campaigns added successfully!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
