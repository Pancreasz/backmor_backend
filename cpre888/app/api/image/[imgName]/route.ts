//app/api/image/[imgName]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import utils from '@/utils/utils';

export async function GET(req: NextRequest, { params }: { params: { imgName: string } }) {
  const { imgName } = params;
  try {
    let userImg = await utils.getProfileImageByName(imgName);
    let img: string;

    if (!userImg) {
      img = '/profile_pic/default.jpg';
    } else {
      img = `/profile_pic/${userImg.images_name}`;
    }

    return NextResponse.json({ imagePath: img });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
