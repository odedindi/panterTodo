import * as React from 'react';

import { Stack } from '@mui/material';

import SelectTodoList from './SelectTodoList';
import AddTodoListForm from './AddTodoListForm';

const TodoListMenu = () => (
	<>
		<Stack>
			<SelectTodoList />
			<AddTodoListForm />
		</Stack>
	</>
);

export default TodoListMenu;
