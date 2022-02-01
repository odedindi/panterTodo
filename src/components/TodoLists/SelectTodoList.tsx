import * as React from 'react';

import { action, useStore } from 'src/store';
import { useDeleteTodoList } from 'src/hooks/useQueries/TodoList';

import {
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import DeleteIcon from '@mui/icons-material/Delete';

const SelectTodoList = () => {
	const {
		storeState: { todoLists, currentList },
		dispatch,
	} = useStore();
	const [deleteTodoList, deleteData] = useDeleteTodoList();

	const handleChangeSelectedTodoList = ({
		target: { value },
	}: SelectChangeEvent & { target: { value: ITodoList['id'] } }) =>
		dispatch(action.selectTodoList({ id: value }));

	const handleDeleteTodoList = (id: ITodoList['id']) =>
		deleteTodoList({ variables: { id } });

	return (
		<FormControl sx={{ m: 1, minWidth: 300 }}>
			<InputLabel id="todoListsLabel">Todo Lists</InputLabel>
			<Select
				labelId="todoListsLabel"
				id="todoLists"
				value={currentList ?? ''}
				label="Todo lists"
				onChange={handleChangeSelectedTodoList}
			>
				{todoLists.map(({ id, title }) => (
					<MenuItem key={id} value={id}>
						<IconButton
							edge="start"
							aria-label="delete"
							onClick={() => handleDeleteTodoList(id)}
						>
							<DeleteIcon />
						</IconButton>
						{title}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>Please choose a Todo List</FormHelperText>
		</FormControl>
	);
};

export default SelectTodoList;
