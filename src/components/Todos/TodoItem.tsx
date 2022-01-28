import * as React from 'react';

import { useLayoutEffect } from 'src/hooks';

import { TodoContainer } from './styles';
import { Checkbox, IconButton, ListItemText } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

import gsap from 'gsap';

interface TodoProps {
	handleDelete: (id: Todo['id']) => void;
	handleToggle: (id: Todo['id']) => void;
	todo: Todo;
}

const TodoItem: React.FC<TodoProps> = ({
	handleDelete,
	handleToggle,
	todo: { completed, createdAt, id, title },
}) => {
	const todoRef = React.useRef<HTMLLIElement>(undefined!);

	useLayoutEffect(() => {
		const fadeIn = (target: gsap.DOMTarget) =>
			gsap.from(target, { opacity: 0 });

		const animation = fadeIn(todoRef.current);
		return () => {
			animation.kill();
		};
	}, []);

	return (
		<TodoContainer
			ref={todoRef}
			completed={completed}
			key={id}
			secondaryAction={
				<IconButton
					edge={false}
					aria-label="delete"
					size="large"
					onClick={() => handleDelete(id)}
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<Checkbox
				aria-label="completed checkbox"
				checked={completed}
				color="success"
				sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
				onChange={() => handleToggle(id)}
			/>
			<ListItemText primary={title} secondary={completed ? '' : title} />
		</TodoContainer>
	);
};

export default React.memo(TodoItem);
