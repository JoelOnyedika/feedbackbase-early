import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  let client;

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI is not defined in the environment variables');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    client = await MongoClient.connect(uri);
    const db = client.db('feedbackflowteasers');

    const earlyAdopters = await db.collection('users')
      .find({}, { projection: { username: 1, joinDate: 1 } })
      .sort({ joinDate: 1 })
      .toArray();

    console.log(earlyAdopters);

    return NextResponse.json(earlyAdopters);
  } catch (error) {
    console.error('Error fetching early adopters:', error);
    return NextResponse.json({ error: 'Error fetching early adopters' }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}