import * as React from 'react';

import { FormControl, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface AddTodoListFormProps {
	value: string;
	handleChange: ({
		currentTarget: { value },
	}: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleSubmit: () => void;
}
const AddTodoListForm = React.forwardRef<
	HTMLInputElement,
	AddTodoListFormProps
>(({ value, handleChange, handleSubmit }, ref) => (
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
			value={value}
			onChange={handleChange}
			ref={ref}
			onKeyPress={({ key }) => {
				if (key === 'Enter') handleSubmit();
			}}
		/>
	</FormControl>
));

export default AddTodoListForm;
