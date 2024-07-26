//app/api/image/[imgName]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import utils from '@/utils/utils';

export async function GET(req: NextRequest, { params }: { params: { imgName: string } }) {
  const { imgName } = params;

  console.log(imgName, 'Profile picture')

  try {
    let userImg = await utils.getProfileImageByName(imgName);
    let img: string;

    if (!userImg) {
      img = '/default.jpg';
    } else {
      img = `/${userImg.images_name}`;
    }

    return NextResponse.json({ imagePath: img });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
