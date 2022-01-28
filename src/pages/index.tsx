import type { NextPage } from 'next';
import React from 'react';

import PageLayout from 'components/Layout';

import TodoApp from 'components/Todos';

const Home: NextPage = () => (
	<PageLayout>
		<TodoApp />
	</PageLayout>
);

export default Home;
