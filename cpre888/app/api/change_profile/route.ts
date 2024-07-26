// import { NextRequest, NextResponse } from 'next/server';
// import utils from '../../../utils/utils';

// export async function POST(req: NextRequest) {
//   try {
//     const userData = await req.json(); // Parse the JSON body

//     const userinfo = await utils.getUserdata(userData.username);
//     const id = userinfo.id;
//     await utils.uploadProfileImage(userData.fileName, id);

//     return NextResponse.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
//   }
// }
