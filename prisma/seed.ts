import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

const prisma = new PrismaClient();

const roles = ['Admin', 'Engineer', 'Project Manager'];

export async function createEngineer() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number({ style: 'national' });
  const KRAPin = faker.string.alphanumeric({ length: 10 });
  const password = await argon.hash('password');

  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      phonenumber: phoneNumber,
      role: 'Engineer',
      KRAPin,
    },
  });
}

export async function createAdmin() {
  const firstName: string = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number({ style: 'national' });
  const KRAPin = faker.string.alphanumeric({ length: 10 });
  const password = await argon.hash('password');

  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phonenumber: phoneNumber,
      role: 'Admin',
      KRAPin,
      password,
    },
  });
}

export async function createFakeProject() {
  const statuses = ['ongoing', 'paused', 'completed'];
  const projectName = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const clientName = faker.company.name();
  const startDate = faker.date.past();
  const endDate = faker.datatype.boolean() ? faker.date.future() : null;
  const status = faker.helpers.arrayElement(statuses);

  return prisma.project.create({
    data: {
      projectName,
      description,
      clientName,
      isAssigned: false,
      status,
      startDate,
      endDate,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
  });
}

async function main() {
  // Drop all existing data from the database for migrations
  await prisma.$transaction([
    prisma.project.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create an Admin
  await createAdmin();
  console.log('Admin created.');

  // Create 10 Engineers
  const engineers = Array.from({ length: 10 }).map(() => createEngineer());
  await Promise.all(engineers);
  console.log('10 Engineers created.');

  // Create 5 Projects
  const projects = Array.from({ length: 5 }).map(() => createFakeProject());
  await Promise.all(projects);
  console.log('5 Projects created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
