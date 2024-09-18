import { MongoClient } from 'mongodb';
import { serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

if (!process.env.MONGODB_URI) {
  console.log('Please add your MongoDB URI to .env.local');
}

export async function POST(req) {
  const { email, username } = await req.json();

  if (!email || !username) {
    return NextResponse.json({ error: 'Email and username are required' }, { status: 400 });
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('feedbackflowteasers');

    const existingUser = await db.collection('users').findOne({ $or: [{ email }, { username }] });

    let userId;
    if (existingUser) {
      userId = existingUser.userId;
    } else {
      userId = uuidv4();
      await db.collection('users').insertOne({
        email,
        username,
        userId,
        joinDate: new Date()
      });
    }

    await client.close();

    // Set a cookie with the user's ID
    const cookie = serialize('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/',
    });

    const response = NextResponse.json({ 
      message: existingUser ? 'User already exists' : 'Signed up successfully', 
      userId,
      isNewUser: !existingUser
    });
    response.headers.set('Set-Cookie', cookie);
    return response;

  } catch (error) {
    console.error('Error processing user:', error);
    return NextResponse.json({ error: 'Error processing user' }, { status: 500 });
  }
}