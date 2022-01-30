import styled from 'styled-components';

import { ListItem } from '@mui/material';

export const Form = styled.form`
	margin: 1rem;
	padding: 0 1rem;
`;

export const TodoContainer = styled.li<{ completed: boolean }>`
	padding: 0 1.5rem;
	border-bottom: solid 0.02rem gray;

	text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};

	display: flex;
	flex-direction: row;

	:nth-child(odd) {
		background-color: rgba(211, 211, 211, 0.25);
	}
	:last-of-type {
		border: none;
	}
`;
