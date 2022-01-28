import * as React from 'react';

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

interface SelectTodoListProps {
	deleteTodoList: (id: TodoList['id']) => void;
	handleChange: (e: SelectChangeEvent) => void;
	todoLists: TodoList[];
	value: TodoList['title'];
}
const SelectTodoList: React.FC<SelectTodoListProps> = ({
	deleteTodoList,
	handleChange,
	todoLists,
	value,
}) => {
	return (
		<FormControl sx={{ m: 1, minWidth: 300 }}>
			<InputLabel id="todoListsLabel">Todo Lists</InputLabel>
			<Select
				labelId="todoListsLabel"
				id="todoLists"
				value={value}
				label="Todo lists"
				onChange={handleChange}
			>
				{todoLists.map(({ id, title }) => (
					<MenuItem key={id} value={id}>
						<IconButton
							edge="start"
							aria-label="delete"
							onClick={() => deleteTodoList(id)}
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
