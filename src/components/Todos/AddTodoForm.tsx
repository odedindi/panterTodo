import * as React from 'react';

import { useUser } from 'src/hooks';

import { FormControl, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface AddTodoFormProps {
	handleChange: (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	handleSubmit: () => void;
	value: string;
}

const AddTodoForm = React.forwardRef<HTMLInputElement, AddTodoFormProps>(
	({ handleChange, handleSubmit, value }, ref) => {
		const user = useUser().data?.user;
		const privateName = user?.name?.split(' ')[0];

		return (
			<FormControl sx={{ width: '100%', padding: 5 }}>
				<TextField
					label="Add Todo"
					id="outlined-start-adornment"
					sx={{ p: 0.5, width: '100%' }}
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
						privateName ? `${privateName}, shoot for the stars!` : 'What is up?'
					}
					value={value}
					onChange={handleChange}
					ref={ref}
					onKeyPress={({ key }) => {
						if (key === 'Enter') handleSubmit();
					}}
				/>
			</FormControl>
		);
	},
);

export default React.memo(AddTodoForm);
