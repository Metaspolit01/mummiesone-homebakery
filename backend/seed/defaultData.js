const Category = require('../models/Category');
const Item = require('../models/Item');

async function seedDatabase() {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('Seeding database with default data...');

    // Seed categories
    const categories = await Category.insertMany([
      {
        name: 'Cakes',
        subcategories: ['Tea time', 'Normal', 'Cup', 'Bento', 'Cool', 'Custom', 'Ice cream', 'Jar cakes'],
      },
      {
        name: 'Chocolates',
        subcategories: ['Homemade', 'Bouquets', 'Hampers'],
      },
      { name: 'Brownies', subcategories: [] },
      { name: 'Cookies', subcategories: [] },
      { name: 'Donuts', subcategories: [] },
    ]);

    console.log(`Seeded ${categories.length} categories`);

    // Seed sample items
    const items = await Item.insertMany([
      {
        name: 'Chocolate Truffle Cake',
        category: 'Cakes',
        subcategory: 'Custom',
        price: 599,
        description: 'Rich chocolate cake with truffle frosting',
        available: true,
      },
      {
        name: 'Dark Chocolate Box',
        category: 'Chocolates',
        subcategory: 'Homemade',
        price: 299,
        description: 'Handcrafted dark chocolates',
        available: true,
      },
      {
        name: 'Fudge Brownies',
        category: 'Brownies',
        price: 199,
        description: 'Chewy fudge brownies, baked fresh',
        available: true,
      },
      {
        name: 'Butter Cookies',
        category: 'Cookies',
        price: 149,
        description: 'Melt-in-mouth butter cookies',
        available: true,
      },
    ]);

    console.log(`Seeded ${items.length} items`);
    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
}

module.exports = { seedDatabase };
