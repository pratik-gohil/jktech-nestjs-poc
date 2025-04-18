const bcrypt = require("bcrypt");
const { PrismaClient } = require("../generated/prisma")

const prisma = new PrismaClient();

async function main() {
 const roles = ['ADMIN', 'EDITOR', 'VIEWER'];

 // Seed roles
 for (const roleName of roles) {
  await prisma.role.upsert({
   where: { name: roleName },
   update: {},
   create: { name: roleName },
  });
 }

 // Get the ADMIN role
 const adminRole = await prisma.role.findUnique({
  where: { name: 'ADMIN' },
 });

 if (!adminRole) {
  throw new Error('ADMIN role not found');
 }

 // Check if admin user already exists
 const existingAdmin = await prisma.user.findUnique({
  where: { email: 'admin@example.com' },
 });

 if (!existingAdmin) {
  const hashedPassword = await bcrypt.hash('admin', 10);

  await prisma.user.create({
   data: {
    email: 'admin@example.com',
    password: hashedPassword,
    name: 'Super Admin',
    roleId: adminRole.id,
   },
  });

  console.log('Admin user created');
 } else {
  console.log('Admin user already exists');
 }

 console.log('Seeding complete');
}

main()
 .catch((e) => {
  console.error('Error seeding database:', e);
  process.exit(1);
 })
 .finally(() => prisma.$disconnect());
