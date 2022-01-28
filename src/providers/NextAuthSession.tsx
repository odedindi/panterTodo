import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface NextAuthSessionProviderProps {
	session: Session;
}

const NextAuthSessionProvider: React.FC<NextAuthSessionProviderProps> = ({
	children,
	session,
}) => <SessionProvider session={session}>{children}</SessionProvider>;

export default NextAuthSessionProvider;
