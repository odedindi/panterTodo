import type { NextPage } from 'next';
import * as React from 'react';

import styled from 'styled-components';

import useStore from 'src/store';
import PageLayout from 'src/components/Layout';
import TodoApp from 'src/components/Todos';

const User: NextPage = () => {
	const {
		storeState: { currentList, todoLists },
	} = useStore();

	return (
		<PageLayout>
			{currentList ? (
				<Heading>
					{todoLists.find((list) => list.id === currentList)?.title}
				</Heading>
			) : (
				<Heading>Please choose a todo list from the todo lists menu </Heading>
			)}

			<TodoApp />
		</PageLayout>
	);
};

export default User;

const Heading = styled.h1`
	font-size: 1.5rem;
	text-align: center;
`;
