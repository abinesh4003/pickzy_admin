import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, context) {
  const { id } = await context.params; 

  try {
    const client = await clientPromise;
    const db = client.db();

    const position = await db.collection('careers').findOne({
      _id: new ObjectId(id)
    });

    if (!position) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 });
    }

    const { _id, ...rest } = position;
    return NextResponse.json({
      id: _id.toString(),
      ...rest,
    });
  } catch (e) {
    console.error('GET Error:', e);
    return NextResponse.json({ error: 'Failed to fetch position' }, { status: 500 });
  }
}

export async function PUT(request, context) {
  const { id } = await context.params;
  

  try {
    if (!id) {
      return NextResponse.json({ error: 'Position ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const updateData = await request.json();

    const result = await db.collection('careers').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      updatedCount: result.modifiedCount,
    });
  } catch (e) {
    console.error('PUT Error:', e);
    return NextResponse.json({ error: 'Failed to update position' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  const { id } = await context.params;

  try {
    if (!id) {
      return NextResponse.json({ error: 'Position ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('careers').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (e) {
    console.error('DELETE Error:', e);
    return NextResponse.json({ error: 'Failed to delete position' }, { status: 500 });
  }
}
