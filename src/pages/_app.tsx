import type { AppProps } from 'next/app';

import Providers from '../providers';

const MyApp = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) => (
	<Providers session={session}>
		<Component {...pageProps} />
	</Providers>
);

export default MyApp;
