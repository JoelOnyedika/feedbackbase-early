
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract `id` from the URL

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('feedbackflowteasers');

    // Find the user by `userId`
    const user = await db.collection('users').findOne({ userId: id });

    await client.close();

    if (user) {
      return NextResponse.json({
        username: user.username,
        email: user.email,
        joinDate: user.joinDate,
        userId: user.userId
      });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
