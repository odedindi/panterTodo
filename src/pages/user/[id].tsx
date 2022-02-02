import type { NextPage } from 'next';
import * as React from 'react';

import styled from 'styled-components';

import { useSelectedTodoList } from 'src/hooks';

import type {
	MyTodoLists_myTodoLists,
	MyTodoLists,
} from 'src/hooks/useQueries/__generated__/MyTodoLists';

import PageLayout from 'src/components/Layout';
import TodoApp from 'src/components/Todos';

import TodoListsMenu, {
	SelectTodoList,
	AddTodoListForm,
} from 'src/components/TodoLists';

const User: NextPage = () => {
	const { selectedTodoList } = useSelectedTodoList();

	return (
		<PageLayout>
			<TodoListsMenu />
			{selectedTodoList ? (
				<Heading>{selectedTodoList.title}</Heading>
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
