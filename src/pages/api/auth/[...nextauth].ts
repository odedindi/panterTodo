import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismaClient from '../../../../prisma/prismaClient';

import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	AUTH_SECRET,
} from 'config/constants';

export default NextAuth({
	adapter: PrismaAdapter(prismaClient),
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID!,
			clientSecret: GOOGLE_CLIENT_SECRET!,
		}),
		// ...add more providers here
	],
	secret: AUTH_SECRET,
	callbacks: {
		async session({ session, token, user }) {
			// we additionally add user id as this is normally not included
			session.user.id = user.id;
			return session;
		},
	},
});
