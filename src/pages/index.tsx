import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

import { signIn, useSession } from 'next-auth/react';

import * as S from 'src/styles';

import { Button } from '@mui/material';

import PageLayout from 'src/components/Layout';
import Spinner from 'src/components/Spinner';

const Home: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	React.useEffect(() => {
		if (status === 'authenticated' && session && session?.user)
			router.push(`/user/${session.user.id}`);
	}, [router, session, status]);

	if (status === 'unauthenticated')
		return (
			<PageLayout>
				<S.LoginContainer>
					<h1>Please Login to start using the app</h1>
					<Button variant="outlined" onClick={() => signIn('google')}>
						Login with Google
					</Button>
				</S.LoginContainer>
			</PageLayout>
		);

	return <Spinner />;
};

export default Home;
