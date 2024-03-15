import { PrismaClient } from '@prisma/client';
import { orders, products, users } from './seed.data';

const prisma = new PrismaClient();

async function seedData() {
  console.log('seeding users...');

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        birthDate: new Date(user.birth_date),
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at),
      },
    });
  }

  console.log('users seeded successfully.');

  console.log('seeding products...');

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        createdAt: new Date(product.created_at),
        updatedAt: new Date(product.updated_at),
      },
    });
  }

  console.log('products seeded successfully.');

  console.log('seeding orders...');

  for (const order of orders) {
    await prisma.order.upsert({
      where: {
        id: order.id,
      },
      update: {},
      create: {
        id: order.id,
        user: { connect: { id: order.user_id } },
        product: { connect: { id: order.product_id } },
        status: order.status,
        quantity: order.quantity,
        totalFees: order.total_fees,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        approvedAt: order.approved_at,
        rejectedAt: order.rejected_at,
        deliveredAt: order.delivered_at,
      },
    });
  }

  console.log('orders seeded successfully.');
}

seedData();
