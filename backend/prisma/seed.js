const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  // Create default users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: await bcrypt.hash('password123', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: await bcrypt.hash('password123', 10),
    },
  });

  // Optional admin user from environment variable
  if (process.env.ADMIN_EMAIL) {
    const adminExists = await prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL } });
    if (!adminExists) {
      await prisma.user.create({
        data: {
          name: process.env.ADMIN_NAME || 'Admin',
          email: process.env.ADMIN_EMAIL,
          password: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10),
          isAdmin: true,
        },
      });
    }
  }

  // Create posts
  const post1 = await prisma.culturalPost.create({
    data: {
      title: 'Exploring Italian Cuisine',
      category: 'Food',
      country: 'Italy',
      content: 'Italian cuisine is renowned worldwide for its simplicity and quality of ingredients. From pasta to pizza, every dish tells a story.',
      userId: user1.id,
    },
  });

  const post2 = await prisma.culturalPost.create({
    data: {
      title: 'The Art of Japanese Tea Ceremony',
      category: 'Tradition',
      country: 'Japan',
      content: 'The Japanese tea ceremony, or Chanoyu, is a cultural activity involving the ceremonial preparation and presentation of matcha.',
      userId: user2.id,
    },
  });

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Great post! I love Italian food.',
      postId: post1.id,
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Very informative. Thanks for sharing.',
      postId: post2.id,
      userId: user1.id,
    },
  });

  console.log('Test data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });