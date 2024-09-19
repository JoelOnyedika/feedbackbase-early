import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('feedbackflowteasers');

      const earlyAdopters = await db.collection('users')
        .find({}, { projection: { username: 1, joinDate: 1 } })
        .sort({ joinDate: 1 })
        .toArray();
      console.log(earlyAdopters)
      await client.close();

      return NextResponse.json(earlyAdopters);
    } catch (error) {
      console.error('Error fetching early adopters:', error);
      return NextResponse.json({ error: 'Error fetching early adopters' });
    }
}
