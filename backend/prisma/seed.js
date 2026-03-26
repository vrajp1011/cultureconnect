const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create users
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