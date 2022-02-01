import * as React from 'react';

import { useCreateTodo, useMe } from 'src/hooks';

import { FormControl, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import ErrorToast from 'src/components/ErrorToast';

type AddTodoFormProps = {
	currentList?: ITodoList['id'];
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ currentList }) => {
	const myFirstName = useMe().data?.me?.name?.split(' ')[0];

	const [createTodo, createTodoData] = useCreateTodo();

	const [showToastError, setShowToastError] = React.useState(false);
	const setShowToastErrorFalse = () => setShowToastError(false);
	const [newTodoTitle, setNewTodoTitle] = React.useState<string>('');
	const textFieldRef = React.useRef<HTMLInputElement>(undefined!);

	const handleChange = React.useCallback(
		({
			currentTarget: { value },
		}: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setNewTodoTitle(value),
		[],
	);
	const handleSubmit = React.useCallback(() => {
		if (!newTodoTitle.trim())
			return (
				textFieldRef.current.children['1'].children['0'] as HTMLInputElement
			).focus();

		if (!currentList) return setShowToastError(true);
		createTodo({
			variables: {
				title: newTodoTitle,
				todoListId: currentList,
			},
		});
		setNewTodoTitle(''); // init value
	}, [createTodo, currentList, newTodoTitle]);

	return (
		<>
			<FormControl sx={{ width: '100%', padding: 5 }}>
				<TextField
					label="Add Todo"
					id="outlined-start-adornment"
					// sx={{  width: '100%' }}
					autoComplete="off"
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
					placeholder={
						myFirstName ? `${myFirstName}, shoot for the stars!` : 'What is up?'
					}
					value={newTodoTitle}
					onChange={handleChange}
					ref={textFieldRef}
					onKeyPress={({ key }) => {
						if (key === 'Enter') handleSubmit();
					}}
				/>
			</FormControl>
			<ErrorToast show={showToastError} hide={setShowToastErrorFalse} />
		</>
	);
};

export default React.memo(AddTodoForm);
