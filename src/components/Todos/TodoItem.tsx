import * as React from 'react';

import { TodoContainer } from './styles';
import { Checkbox, IconButton, ListItemText } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import moment from 'moment';

interface TodoProps {
	handleDelete: (id: ITodo['id']) => void;
	handleToggle: ({
		completed,
		id,
	}: {
		completed: ITodo['completed'];
		id: ITodo['id'];
	}) => void;
	todo: ITodo;
}

const TodoItem = React.forwardRef<HTMLLIElement, TodoProps>(
	(
		{ handleDelete, handleToggle, todo: { completed, createdAt, id, title } },
		ref,
	) => (
		<TodoContainer ref={ref} completed={completed} key={id}>
			<Checkbox
				aria-label="completed checkbox"
				checked={completed}
				color="success"
				sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
				onChange={() => handleToggle({ completed: !completed, id })}
			/>
			{completed ? (
				<ListItemText primary={title} />
			) : (
				<ListItemText primary={title} secondary={moment(createdAt).fromNow()} />
			)}

			<IconButton
				edge={false}
				aria-label="delete"
				size="large"
				onClick={() => handleDelete(id)}
			>
				<DeleteIcon />
			</IconButton>
		</TodoContainer>
	),
);

export default React.memo(TodoItem);
