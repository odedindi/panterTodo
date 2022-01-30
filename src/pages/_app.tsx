import type { AppProps } from 'next/app';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import Providers from '../providers';

const MyApp = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) => {
	NProgress.configure({ showSpinner: false });
	Router.events.on('routeChangeStart', () => NProgress.start());
	Router.events.on('routeChangeComplete', () => NProgress.done());
	Router.events.on('routeChangeError', () => NProgress.done());

	return (
		<Providers session={session}>
			<Component {...pageProps} />
		</Providers>
	);
};

export default MyApp;
