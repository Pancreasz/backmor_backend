// pages/api/user/[username].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import utils from '@/utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;
    try {
        const userData = await utils.getCustomerDataByUsername(username as string);
        console.log(userData, 'asdf')
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
};
