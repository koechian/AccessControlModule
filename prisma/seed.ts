import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

const prisma = new PrismaClient();

const roles = ['Admin', 'Engineer', 'Project Manager'];

export async function createEngineer() {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const username = faker.internet.displayName({
    firstName: firstname,
    lastName: lastname,
  });
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number({ style: 'national' });
  const KRAPin = faker.string.alphanumeric({ length: 10 });
  const password = await argon.hash('password', { type: argon.argon2id });

  return prisma.user.create({
    data: {
      firstname,
      lastname,
      username,
      email,
      password,
      phonenumber: phoneNumber,
      role: 'Engineer',
      KRAPin,
    },
  });
}

export async function createPM() {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const username = faker.internet.displayName({
    firstName: firstname,
    lastName: lastname,
  });
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number({ style: 'national' });
  const KRAPin = faker.string.alphanumeric({ length: 10 });
  const password = await argon.hash('password', { type: argon.argon2id });

  return prisma.user.create({
    data: {
      firstname,
      lastname,
      username,
      email,
      password,
      phonenumber: phoneNumber,
      role: 'Project Manager',
      KRAPin,
    },
  });
}

export async function createAdmin() {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const username = faker.internet.displayName({
    firstName: firstname,
    lastName: lastname,
  });
  const email = faker.internet.email();
  const phoneNumber = faker.phone.number({ style: 'national' });
  const KRAPin = faker.string.alphanumeric({ length: 10 });
  const password = await argon.hash('password');

  return prisma.user.create({
    data: {
      firstname,
      lastname,
      username,
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
  const projectedCost = faker.number.int({ min: 120000, max: 10000000 });
  const startDate = faker.date.past();
  const endDate = faker.datatype.boolean() ? faker.date.future() : null;
  const status = faker.helpers.arrayElement(statuses);

  return prisma.project.create({
    data: {
      projectName,
      description,
      clientName,
      projectedCost,
      isAssigned: false,
      status,
      startDate,
      endDate,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
  });
}

// Mock up data for CRM module as well

export async function createFakeCustomer() {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const phone = faker.phone.number({ style: 'national' });
  const companyName = faker.company.name();
  const address = faker.location.streetAddress();

  return prisma.customer.create({
    data: {
      name,
      email,
      phone,
      companyName,
      address,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
  });
}

export async function createFakeLead(customerId: number) {
  const statuses = ['PENDING', 'CONTACTED', 'QUALIFIED', 'CONVERTED'];
  const status = faker.helpers.arrayElement(statuses);

  return prisma.lead.create({
    data: {
      customerId,
      status,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    },
  });
}

export async function createFakeInteraction(leadId: number) {
  const types = [
    'PHONE_CALL',
    'EMAIL',
    'IN_PERSON_MEETING',
    'OTHER',
    'WHATS_APP',
    'INSTAGRAM',
  ];
  const type = faker.helpers.arrayElement(types);
  const details = faker.lorem.sentence();

  return prisma.interaction.create({
    data: {
      leadId,
      type,
      details,
      createdAt: faker.date.past(),
    },
  });
}

async function main() {
  // Drop all existing data from the database for migrations
  await prisma.$transaction([
    prisma.project.deleteMany(),
    prisma.user.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.lead.deleteMany(),
    prisma.interaction.deleteMany(),
  ]);

  // Create an Admin
  await createAdmin();
  console.log('Admin created.');

  // Create 10 Engineers
  const engineers = Array.from({ length: 10 }).map(() => createEngineer());
  await Promise.all(engineers);
  console.log('10 Engineers created.');

  // Create 10 Project  Managers
  const projectmanagers = Array.from({ length: 10 }).map(() => createPM());
  await Promise.all(projectmanagers);
  console.log('10 Project Managers created.');

  // Create 15 Projects
  const projects = Array.from({ length: 15 }).map(() => createFakeProject());
  await Promise.all(projects);
  console.log('5 Projects created.');

  // Create 25 Customers, each with multiple leads and interactions
  const customers = await Promise.all(
    Array.from({ length: 25 }).map(() => createFakeCustomer()),
  );
  console.log('25 Customers created.');

  for (const customer of customers) {
    // Create 3 leads per customer
    const leads = await Promise.all(
      Array.from({ length: 3 }).map(() => createFakeLead(customer.id)),
    );
    console.log(`3 Leads created for Customer ID ${customer.id}`);

    for (const lead of leads) {
      // Create 2 interactions per lead
      await Promise.all(
        Array.from({ length: 2 }).map(() => createFakeInteraction(lead.id)),
      );
      console.log(`2 Interactions created for Lead ID ${lead.id}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
