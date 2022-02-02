import * as React from 'react';

import { useCreateTodoList } from 'src/hooks/useQueries/TodoList';

import { FormControl, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddTodoListForm = () => {
	const [createTodoList, _createData] = useCreateTodoList();
	const [newTodoListTitle, setNewTodoListTitle] = React.useState<string>('');
	const textFieldRef = React.useRef<HTMLInputElement>(undefined!);

	const handleChange = React.useCallback(
		({
			currentTarget: { value },
		}: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setNewTodoListTitle(value),
		[],
	);
	const handleSubmit = React.useCallback(() => {
		if (!newTodoListTitle.trim())
			return (
				textFieldRef.current.children['1'].children['0'] as HTMLInputElement
			).focus();
		createTodoList({ variables: { title: newTodoListTitle } });
		setNewTodoListTitle(''); // init newTodoListTitle
	}, [createTodoList, newTodoListTitle]);

	return (
		<FormControl>
			<TextField
				label="New Todo List"
				id="outlined-start-adornment"
				sx={{ m: 1, minWidth: 300 }}
				InputProps={{
					endAdornment: (
						<IconButton
							size="large"
							edge="end"
							color="inherit"
							aria-label="submit"
							onClick={handleSubmit}
						>
							<SendIcon />
						</IconButton>
					),
				}}
				placeholder="How would you like to name the new list?"
				value={newTodoListTitle}
				onChange={handleChange}
				ref={textFieldRef}
				onKeyPress={({ key }) => {
					if (key === 'Enter') handleSubmit();
				}}
			/>
		</FormControl>
	);
};

export default AddTodoListForm;
