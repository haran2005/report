// backend/src/utils/seedAdmin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is missing in .env');
  process.exit(1);
}

const ADMIN = {
  email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  password: process.env.ADMIN_PASSWORD ?? 'admin123',
  role: 'admin' as const,
};

const EMPLOYEES = [
  {
    username: process.env.USER_1_USERNAME ?? 'DF_001',
    email: process.env.USER_1_EMAIL ?? 'df001@example.com',
    password: process.env.USER_1_PASSWORD ?? 'user@001',
    role: 'user' as const,
  },
  {
    username: process.env.USER_2_USERNAME ?? 'DF_002',
    email: process.env.USER_2_EMAIL ?? 'df002@example.com',
    password: process.env.USER_2_PASSWORD ?? 'user@002',
    role: 'user' as const,
  },
  {
    username: process.env.USER_3_USERNAME ?? 'DF_003',
    email: process.env.USER_3_EMAIL ?? 'df003@example.com',
    password: process.env.USER_3_PASSWORD ?? 'user@003',
    role: 'user' as const,
  },
];

// ──────────────────────────────────────────────────────────────
//  MAIN SEEDER
// ──────────────────────────────────────────────────────────────
const seed = async () => {
  let conn: typeof mongoose | null = null;

  try {
    console.log('Connecting to MongoDB...');
    conn = await mongoose.connect(MONGO_URI);
    console.log('Connected');

    // Optional: skip if any user already exists (idempotent)
    // const existing = await User.countDocuments();
    // if (existing > 0 && !process.argv.includes('--force')) {
    //   console.log(`Found ${existing} users – skipping seed. Use --force to overwrite.`);
    //   return;
    // }

    if (process.argv.includes('--force')) {
      console.log('Force mode → deleting all users...');
      await User.deleteMany({});
    }

    const salt = await bcrypt.genSalt(12); // stronger than 10

    // Helper – create or skip
    const createIfNotExists = async (data: {
      email?: string;
      username?: string;
      password: string;
      role: 'admin' | 'user';
    }) => {
      const filter: any = {};
      if (data.email) filter.email = data.email;
      if (data.username) filter.username = data.username;

      const exists = await User.findOne(filter);
      if (exists) {
        console.log(`User ${data.email ?? data.username} already exists – skipping`);
        return exists;
      }

      const hashed = await bcrypt.hash(data.password, salt);
      const user = await User.create({ ...data, password: hashed });
      console.log(`Created ${data.role}: ${user.email}`);
      return user;
    };

    // ── Admin ──
    const admin = await createIfNotExists({
      email: ADMIN.email,
      password: ADMIN.password,
      role: ADMIN.role,
    });

    // ── Employees ──
    const users = await Promise.all(
      EMPLOYEES.map((e) => createIfNotExists(e))
    );

    // ── Summary ──
    console.log('\nSeeding completed!');
    console.log('Login credentials (change in production!):');
    console.log(`Admin → ${admin.email} / ${ADMIN.password}`);
    EMPLOYEES.forEach((e, i) => {
      console.log(`${e.username} → ${e.email} / ${e.password}`);
    });

  } catch (err: any) {
    console.error('Seed error:', err.message ?? err);
    process.exit(1);
  } finally {
    if (conn) {
      await conn.disconnect();
      console.log('MongoDB disconnected');
    }
    process.exit(0);
  }
};

seed();