import * as React from 'react';

import { Form } from './styles';
import { useMe } from 'hooks/index';

import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface EditTodoProps {
	todo: Todo;
}
const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
	const [value, setValue] = React.useState<string>('');
	const textFieldRef = React.useRef<HTMLInputElement>(undefined!);
	const handleChange = React.useCallback(
		({
			currentTarget: { value },
		}: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setValue(value),
		[],
	);

	const editTodo = React.useCallback(() => {}, []);
	const handleSubmit = React.useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			if (!value.trim()) textFieldRef.current.focus();
			else {
				editTodo();
				setValue(''); // init value

				e.preventDefault(); // block submit's reload event
			}
		},
		[editTodo, value],
	);
	return (
		<Form onSubmit={handleSubmit}>
			<TextField
				label="Add Todo"
				id="outlined-start-adornment"
				sx={{ width: '100%' }}
				InputProps={{
					endAdornment: (
						<IconButton
							size="large"
							edge="end"
							color="inherit"
							aria-label="submit"
						>
							<SendIcon />
						</IconButton>
					),
				}}
				placeholder={todo.title}
				value={value}
				onChange={handleChange}
				ref={textFieldRef}
			/>
		</Form>
	);
};

export default EditTodo;
