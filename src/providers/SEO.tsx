import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const defaultSEO = {
	title: 'Panter Todos',
	description: 'Panter Todos exercise',
};

interface SEOProps {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
}

const extendSEO = (options: SEOProps) => ({
	...defaultSEO,
	...options,
});

const SEOProvider: React.FC<SEOProps> = ({
	title,
	description,
	image,
	url,
}) => (
	<>
		<DefaultSeo {...extendSEO({ title, description, image, url })} />
		<Head>
			<meta charSet="utf-8" />
			<meta name="theme-color" content="#fff" />
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<meta name="description" content="Panter Todos exercise" />
			<meta name="keywords" content="Panter Todos exercise" />
			<meta name="application-name" content="Panter Todos exercise" />
			<meta name="apple-mobile-web-app-title" content="Panter Todos exercise" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			<meta name="format-detection" content="telephone=no" />
			<meta name="mobile-web-app-capable" content="yes" />
			<link rel="shortcut icon" type="image/png" href="/favicon.png" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/assets/icons/apple/apple-touch-icon-180x180.png"
			/>
			<link
				data-react-helmet="true"
				rel="icon"
				type="image/png"
				href="/favicon.png"
			/>
		</Head>
	</>
);

export default SEOProvider;
