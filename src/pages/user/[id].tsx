import type { NextPage } from 'next';
import * as React from 'react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import * as S from 'src/styles';

import { useSelectedTodoList } from 'src/hooks';

import PageLayout from 'src/components/Layout';
import TodoApp from 'src/components/Todos';

import TodoListsMenu from 'src/components/TodoLists';

const User: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === 'unauthenticated') router.push('/');

	const { selectedTodoList } = useSelectedTodoList();

	return (
		<PageLayout>
			<TodoListsMenu />
			{selectedTodoList ? (
				<S.Heading>{selectedTodoList.title}</S.Heading>
			) : (
				<S.Heading>
					Please choose a todo list from the todo lists menu{' '}
				</S.Heading>
			)}

			<TodoApp />
		</PageLayout>
	);
};

export default User;
