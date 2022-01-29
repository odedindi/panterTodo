import * as React from 'react';

import { AppContainer } from './styles';
import { useMe } from 'src/hooks';

import Navbar from './Navbar';
import LoginSection from './LoginSection';
import Footer from './Footer';

const PageLayout: React.FC = ({ children }) => {
	const me = useMe().data?.me;

	return (
		<AppContainer>
			<Navbar />
			{me ? children : <LoginSection />}
			<Footer />
		</AppContainer>
	);
};

export default PageLayout;
