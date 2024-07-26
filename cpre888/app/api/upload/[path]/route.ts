// app/api/upload/[path]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest, { params }: { params: { path: string } }) {
  const { path: uploadPath } = params;
  const formData = await req.formData();
  const file = formData.get('file') as File;

  console.log('Posting image to:', uploadPath);

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), 'public', uploadPath, fileName);

  try {
    await fs.writeFile(filePath, Buffer.from(buffer));

    return NextResponse.json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
