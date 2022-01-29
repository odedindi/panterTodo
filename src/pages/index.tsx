import type { NextPage } from 'next';
import * as React from 'react';

import PageLayout from 'src/components/Layout';

import TodoApp from 'src/components/Todos';
import { useTodoList } from 'src/hooks/todoList/useTodoList';

const Home: NextPage = () => {
	// const { data } = useTodoList();

	// console.log(data);
	return (
		<PageLayout>
			<TodoApp />
		</PageLayout>
	);
};

export default Home;
