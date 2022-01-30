import type { NextPage } from 'next';
import * as React from 'react';

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
				<h1>{todoLists.find((list) => list.id === currentList)?.title}</h1>
			) : (
				<h1>no current list</h1>
			)}

			<TodoApp />
		</PageLayout>
	);
};

export default User;
