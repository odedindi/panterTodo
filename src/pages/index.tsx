import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

import { signIn, useSession } from 'next-auth/react';

import styled from 'styled-components';
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
				<LoginContainer>
					<h1>Please Login if you have an account</h1>
					<Button onClick={() => signIn('google')}>Login with Google</Button>
				</LoginContainer>
			</PageLayout>
		);

	return <Spinner />;
};

export default Home;

const LoginContainer = styled.section`
	position: absolute;
	top: 40%;
	left: 20%;
	right: 20%;
	width: auto;
	padding: 0 2rem;
	border: 1px solid #eee;
	box-sizing: border-box;
	color: black;
	border-radius: 4px;

	text-align: center;
`;
