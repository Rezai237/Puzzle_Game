import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  avatar: text('avatar').notNull(),
  tokens: integer('tokens').notNull().default(0),
  referralTokens: integer('referral_tokens').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const tokenTransactions = sqliteTable('token_transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  amount: integer('amount').notNull(),
  type: text('type', { enum: ['earned', 'spent', 'transferred', 'referral'] }).notNull(),
  description: text('description').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const tokenTransfers = sqliteTable('token_transfers', {
  id: text('id').primaryKey(),
  fromUserId: text('from_user_id').notNull().references(() => users.id),
  toUserId: text('to_user_id').notNull().references(() => users.id),
  amount: integer('amount').notNull(),
  status: text('status', { enum: ['pending', 'completed', 'failed'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
});

export const referralCodes = sqliteTable('referral_codes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  code: text('code').notNull().unique(),
  totalEarnings: integer('total_earnings').notNull().default(0),
  pendingEarnings: integer('pending_earnings').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const referralUsers = sqliteTable('referral_users', {
  id: text('id').primaryKey(),
  referralCodeId: text('referral_code_id').notNull().references(() => referralCodes.id),
  userId: text('user_id').notNull().references(() => users.id),
  status: text('status', { enum: ['pending', 'verified', 'rejected'] }).notNull(),
  earnings: integer('earnings').notNull().default(0),
  pendingEarnings: integer('pending_earnings').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  verifiedAt: integer('verified_at', { mode: 'timestamp' }),
});

export const userStats = sqliteTable('user_stats', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  gamesPlayed: text('games_played').notNull(), // JSON string
  bestTimes: text('best_times').notNull(), // JSON string
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});