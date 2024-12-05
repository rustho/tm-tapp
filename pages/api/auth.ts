import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }


  // Validate initData here
  // You should verify the hash from Telegram
  // https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app

  try {
    // Add your validation logic here
    return res.status(200).json({ user: 'validated_user' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication' });
  }
}