import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { address } = req.query;
  console.log(address);

  let DBAddress = await prisma.user.findUnique({
    where: {
      publicAddress: address as string,
    },
    select: {
      nonce: true,
    },
  });

  console.log(DBAddress?.nonce);

  if (!DBAddress?.nonce) {
    const nonce = randomUUID();

    await prisma.user.create({
      data: {
        publicAddress: address as string,
        nonce: nonce,
      },
    });
    console.log('Created new one');
  }

  return res.json(DBAddress?.nonce as string);
}
