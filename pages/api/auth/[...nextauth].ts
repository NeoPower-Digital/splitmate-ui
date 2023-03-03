import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { signatureVerify } from '@polkadot/util-crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Polkadot',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        address: {
          label: 'Address',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          if (!process.env.NEXTAUTH_URL) {
            throw 'NEXTAUTH_URL is not set';
          }

          if (!credentials) {
            return null;
          }

          const { isValid } = signatureVerify(
            credentials.message,
            credentials.signature,
            credentials.address
          );

          if (isValid) {
            return {
              id: credentials.address,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth?.includes('signin');

  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      // after a user is logged in, we can keep the address in session
      async session({ session, token }) {
        session.user!.name = token.sub;
        return session;
      },
    },
  });
}
