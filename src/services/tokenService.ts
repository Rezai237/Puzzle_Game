import { db, executeTransaction } from '../db';
import { tokenTransactions, tokenTransfers, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function addTokens(
  userId: string,
  amount: number,
  type: 'earned' | 'referral',
  description: string
) {
  return executeTransaction(async () => {
    // Update user tokens
    await db
      .update(users)
      .set({
        tokens: db.raw`tokens + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // Record transaction
    await db.insert(tokenTransactions).values({
      id: nanoid(),
      userId,
      amount,
      type,
      description,
      createdAt: new Date(),
    });
  });
}

export async function transferTokens(
  fromUserId: string,
  toUserId: string,
  amount: number
) {
  return executeTransaction(async () => {
    // Create transfer record
    const transferId = nanoid();
    await db.insert(tokenTransfers).values({
      id: transferId,
      fromUserId,
      toUserId,
      amount,
      status: 'pending',
      createdAt: new Date(),
    });

    // Check sender balance
    const sender = await db
      .select({ tokens: users.tokens })
      .from(users)
      .where(eq(users.id, fromUserId))
      .get();

    if (!sender || sender.tokens < amount) {
      await db
        .update(tokenTransfers)
        .set({ status: 'failed' })
        .where(eq(tokenTransfers.id, transferId));
      throw new Error('Insufficient tokens');
    }

    // Update sender balance
    await db
      .update(users)
      .set({
        tokens: db.raw`tokens - ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, fromUserId));

    // Update recipient balance
    await db
      .update(users)
      .set({
        tokens: db.raw`tokens + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, toUserId));

    // Complete transfer
    await db
      .update(tokenTransfers)
      .set({
        status: 'completed',
        completedAt: new Date(),
      })
      .where(eq(tokenTransfers.id, transferId));

    // Record transactions
    await db.insert(tokenTransactions).values([
      {
        id: nanoid(),
        userId: fromUserId,
        amount: -amount,
        type: 'transferred',
        description: `Transfer to user ${toUserId}`,
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        userId: toUserId,
        amount: amount,
        type: 'transferred',
        description: `Transfer from user ${fromUserId}`,
        createdAt: new Date(),
      },
    ]);
  });
}