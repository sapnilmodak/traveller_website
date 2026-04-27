const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Package = require('./models/Package');
const Activity = require('./models/Activity');
const Cab = require('./models/Cab');
const Rental = require('./models/Rental');
const Hotel = require('./models/Hotel');
const Blog = require('./models/Blog');
const Team = require('./models/Team');
const Admin = require('./models/Admin');

/**
 * Upsert helper: inserts a document only if no document with the
 * given unique field value exists. Skips silently if it already exists.
 */
const upsertByTitle = async (Model, doc, uniqueField = 'title') => {
  const filter = { [uniqueField]: doc[uniqueField] };
  const exists = await Model.findOne(filter);
  if (!exists) {
    await Model.create(doc);
    return true; // inserted
  }
  return false; // skipped
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Running auto-seed (skip duplicates)...');

    let inserted = 0;
    let skipped = 0;

    const track = (wasInserted) => {
      if (wasInserted) inserted++;
      else skipped++;
    };

    // --- Admin (unique by email) ---
    const adminExists = await Admin.findOne({ email: 'admin@traveler.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@traveler.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('   ✅ Admin user created: admin@traveler.com / admin123');
      inserted++;
    } else {
      skipped++;
    }

    // --- Packages ---
    const packages = [
      {
        title: "Magical Ladakh",
        thumbSrc: "https://images.unsplash.com/photo-1544735745-b89b182ae4b6?auto=format&fit=crop&q=80&w=800",
        nights: 5,
        days: 6,
        price: 25000,
        isFeatured: true,
        description: "A magical journey through the heart of Ladakh.",
        highlights: ["Leh Palace", "Pangong Lake", "Nubra Valley"]
      },
      {
        title: "Ladakh Adventure",
        thumbSrc: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800",
        nights: 7,
        days: 8,
        price: 35000,
        isFeatured: true,
        description: "For those who seek thrill in the high altitudes.",
        highlights: ["Khardung La Pass", "Magnetic Hill", "Zanskar Rafting"]
      }
    ];
    for (const doc of packages) track(await upsertByTitle(Package, doc));

    // --- Activities ---
    const activities = [
      {
        title: "River Rafting",
        thumbSrc: "https://images.unsplash.com/photo-1530866495547-084969ef31e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        src: "https://images.unsplash.com/photo-1530866495547-084969ef31e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        price: 2500,
        description: "Thrilling rafting in the Zanskar river."
      },
      {
        title: "Camel Safari",
        thumbSrc: "https://images.unsplash.com/photo-1524491991492-e31996457db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        src: "https://images.unsplash.com/photo-1524491991492-e31996457db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        price: 1500,
        description: "Double humped camel ride in Nubra Valley."
      }
    ];
    for (const doc of activities) track(await upsertByTitle(Activity, doc));

    // --- Cabs ---
    const cabs = [
      {
        title: "Innova Crysta",
        seats: "6+1",
        price: 5000,
        thumbSrc: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      }
    ];
    for (const doc of cabs) track(await upsertByTitle(Cab, doc));

    // --- Rentals ---
    const rentals = [
      {
        title: "Royal Enfield Himalayan",
        type: "Adventure",
        engine: "411cc",
        price: 2000,
        thumbSrc: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      }
    ];
    for (const doc of rentals) track(await upsertByTitle(Rental, doc));

    // --- Hotels ---
    const hotels = [
      {
        title: "The Grand Dragon Ladakh",
        location: "Leh",
        price: 12000,
        rating: 5,
        thumbSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      }
    ];
    for (const doc of hotels) track(await upsertByTitle(Hotel, doc));

    // --- Blogs ---
    const blogs = [
      {
        title: "Best Time to Visit Ladakh",
        category: "Information",
        thumbSrc: "https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        src: "https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        excerpt: "Ladakh is a year-round destination, but the best time depends on what you want to experience.",
        content: "Ladakh is a year-round destination, but the best time depends on what you want to experience. Summers are great for treks, while winters offer the famous Chadar Trek.",
        date: "2024-10-24"
      }
    ];
    for (const doc of blogs) track(await upsertByTitle(Blog, doc));

    // --- Team ---
    const teams = [
      {
        title: "Dorjay Namgyal",
        designation: "Founder & CEO",
        sub_title: "Managing Director",
        teamSrc: "https://www.overlandescape.com/storage/teammanagements/5caef924874e0110_dorjay-namgyal12.jpg"
      }
    ];
    for (const doc of teams) track(await upsertByTitle(Team, doc));

    console.log(`🌱 Seed complete — ${inserted} inserted, ${skipped} skipped (already exist).`);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    // Don't crash the server if seeding fails
  }
};

module.exports = seedDatabase;
