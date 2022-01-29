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
			<title>{`Panter - Todo App`}</title>
			<meta charSet="utf-8" />
			<meta name="theme-color" content="#fff" />
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<meta name="description" content="Panter Todos exercise" />
			<meta name="keywords" content="Panter Todos exercise" />
			<meta name="application-name" content="Panter Todos exercise" />
			<link data-react-helmet="true" rel="icon" href="/favicon.ico" />
		</Head>
	</>
);

export default SEOProvider;
