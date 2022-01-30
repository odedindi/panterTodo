import * as React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useSession } from 'next-auth/react';

const apolloClient = new ApolloClient({
	uri: '/api/graphql',
	ssrMode: false,
	cache: new InMemoryCache(),
});

const ClearClientCache: React.FC<{
	apolloClient: ApolloClient<unknown>;
}> = ({ apolloClient }) => {
	const { data: session } = useSession();
	// clear apollo cache on logout
	React.useEffect(() => {
		if (!session?.user) apolloClient.resetStore();
	}, [session?.user, apolloClient]);
	return null;
};

const ApolloClientProvider: React.FC = ({ children }) => (
	<ApolloProvider client={apolloClient}>
		<ClearClientCache apolloClient={apolloClient} />
		{children}
	</ApolloProvider>
);

export default ApolloClientProvider;
