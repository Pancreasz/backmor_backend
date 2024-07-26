import { NextRequest, NextResponse } from 'next/server';
import utils from '@/utils/utils';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;

  console.log(username, 'Profile data')

  try {
    const userData = await utils.getCustomerDataByUsername(username);
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
