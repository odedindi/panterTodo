import type { Session } from 'next-auth';
import * as React from 'react';
import NextAuthProvider from './NextAuthSession';
import ApolloClientProvider from './ApolloClient';
import SEOProvider from './SEO';
import StylesProvider from './Styles';
import { TodoStoreProvider } from 'src/store';

interface ProvidersProps {
	session: Session;
}

const Providers: React.FC<ProvidersProps> = ({ children, session }) => (
	<NextAuthProvider session={session}>
		<ApolloClientProvider>
			<SEOProvider />
			<StylesProvider>
				<TodoStoreProvider>{children}</TodoStoreProvider>
			</StylesProvider>
		</ApolloClientProvider>
	</NextAuthProvider>
);

export default Providers;
