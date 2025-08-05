import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const positions = await db.collection('positions')
      .find({})
      .sort({ createdAt: -1 }) 
      .toArray();

    // Convert MongoDB _id to string for serialization
    const formattedPositions = positions.map(position => ({
      ...position,
      id: position._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(formattedPositions);
  } catch (e) {
    console.error('GET Error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const positionData = await request.json();
    
    // Add createdAt timestamp
    const positionWithTimestamp = {
      ...positionData,
      createdAt: new Date(),
      applicants: 0, // Initialize applicants count
      status: positionData.status || 'active' // Default to draft if not specified
    };

    const result = await db.collection('positions').insertOne(positionWithTimestamp);

    return NextResponse.json(
      { 
        success: true,
        id: result.insertedId.toString()
      },
      { status: 201 }
    );
  } catch (e) {
    console.error('POST Error:', e);
    return NextResponse.json(
      { success: false, error: 'Failed to add position' },
      { status: 500 }
    );
  }
}