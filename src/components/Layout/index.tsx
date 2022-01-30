import * as React from 'react';

import { useSession } from 'next-auth/react';

import { AppContainer } from './styles';

import Navbar from './Navbar';
import Footer from './Footer';

import Spinner from 'src/components/Spinner';

const PageLayout: React.FC = ({ children }) => {
	const { status } = useSession();
	return (
		<AppContainer>
			{status === 'loading' ? (
				<Spinner />
			) : (
				<>
					<Navbar />
					{children}
					<Footer />
				</>
			)}
		</AppContainer>
	);
};

export default PageLayout;
