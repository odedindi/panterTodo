import * as React from 'react';

import { action, useStore } from 'src/store';

import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import SelectTodoList from './SelectTodoList';
import AddTodoListForm from './AddTodoListForm';

const TodoListMenu = () => {
	const {
		storeState: { todoLists, currentList },

		dispatch,
	} = useStore();

	// menu
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = {
		open: ({ currentTarget }: React.MouseEvent<HTMLElement>) =>
			setAnchorEl(currentTarget),
		close: () => setAnchorEl(null),
	};

	// select todolist
	const handleSelectedTodoListChange = ({
		target: { value },
	}: SelectChangeEvent & { target: { value: TodoList['id'] } }) =>
		dispatch(action.selectTodoList({ id: value }));
	// delete todolist
	const handleDeleteTodoList = (id: TodoList['id']) =>
		dispatch(action.deleteTodoList({ id }));

	// new todolist form
	const [newTodoListTitle, setNewTodoListTitle] = React.useState<string>('');
	const textFieldRef = React.useRef<HTMLInputElement>(undefined!);

	const handleTextField = {
		change: React.useCallback(
			({
				currentTarget: { value },
			}: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
				setNewTodoListTitle(value),
			[],
		),
		submit: React.useCallback(() => {
			if (!newTodoListTitle.trim())
				return (
					textFieldRef.current.children['1'].children['0'] as HTMLInputElement
				).focus();

			dispatch(action.createTodoList({ title: newTodoListTitle }));
			setNewTodoListTitle(''); // init newTodoListTitle
		}, [dispatch, newTodoListTitle]),
	};

	return (
		<>
			<Tooltip title="Todo Lists Menu">
				<IconButton
					size="large"
					aria-label="todolists of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu.open}
					color="inherit"
				>
					<ListIcon />
				</IconButton>
			</Tooltip>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleMenu.close}
			>
				<MenuItem disableRipple={true} onClick={handleMenu.close}>
					<ListItemIcon>
						<ListAltIcon />
					</ListItemIcon>
					<SelectTodoList
						deleteTodoList={handleDeleteTodoList}
						handleChange={handleSelectedTodoListChange}
						todoLists={todoLists}
						value={currentList ?? ''}
					/>
				</MenuItem>
				<MenuItem disableRipple={true}>
					<ListItemIcon>
						<PlaylistAddIcon />
					</ListItemIcon>
					<AddTodoListForm
						handleChange={handleTextField.change}
						handleSubmit={handleTextField.submit}
						ref={textFieldRef}
						value={newTodoListTitle}
					/>
				</MenuItem>
			</Menu>
		</>
	);
};

export default TodoListMenu;
