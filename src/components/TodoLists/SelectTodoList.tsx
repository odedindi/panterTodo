import * as React from 'react';

import {
	useDeleteTodoList,
	useMyTodoLists,
	useSelectedTodoList,
} from 'src/hooks';
import type { MyTodoLists_myTodoLists } from 'src/hooks/useQueries/__generated__/MyTodoLists';

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
	const myTodoLists = useMyTodoLists().data?.myTodoLists;
	const [deleteTodoList, _deleteData] = useDeleteTodoList();
	const { selectedTodoList, setSelectedTodoList } = useSelectedTodoList();

	const handleChangeSelectedTodoList = React.useCallback(
		({
			target: { value },
		}: SelectChangeEvent & {
			target: { value: MyTodoLists_myTodoLists['id'] };
		}) => setSelectedTodoList(myTodoLists?.find((list) => list.id === value)),
		[myTodoLists, setSelectedTodoList],
	);

	const handleDeleteTodoList = React.useCallback(
		(id: MyTodoLists_myTodoLists['id']) =>
			deleteTodoList({ variables: { id } }),
		[deleteTodoList],
	);

	return (
		<FormControl sx={{ m: 1, minWidth: 300 }}>
			<InputLabel id="todoListsLabel">Todo Lists</InputLabel>
			<Select
				labelId="todoListsLabel"
				id="todoLists"
				value={selectedTodoList?.title ?? ''}
				label="Todo lists"
				onChange={handleChangeSelectedTodoList}
			>
				{(myTodoLists ?? []).map(({ id, title }) => (
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
