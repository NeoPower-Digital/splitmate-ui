import prisma from '@/lib/prisma';
import { Group } from '@/model/groups';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Group;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const token = getToken({ req });

  if (!token) {
    return res.status(401);
  }

  const { id, name, members } = req.body;

  const membersMapped = members.map((member) => ({
    create: { userId: member.address, groupId: id },
  }));

  const createGroup = await prisma.group.create({
    data: {
      id: id,
      name: name,
      members: membersMapped,
    },
  });
}
