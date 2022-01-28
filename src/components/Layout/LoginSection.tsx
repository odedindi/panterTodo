import * as React from 'react';
import { signIn } from 'next-auth/react';

import styled from 'styled-components';

import { Button } from '@mui/material';

const LoginSection: React.FC = () => (
	<LoginContainer>
		<h1>Please Login if you have an account</h1>
		<Button onClick={() => signIn('google')}>Login with Google</Button>
	</LoginContainer>
);

export default LoginSection;

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
