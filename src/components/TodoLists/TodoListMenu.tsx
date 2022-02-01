import * as React from 'react';

import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';

import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import SelectTodoList from './SelectTodoList';
import AddTodoListForm from './AddTodoListForm';

const TodoListMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = {
		open: ({ currentTarget }: React.MouseEvent<HTMLElement>) =>
			setAnchorEl(currentTarget),
		close: () => setAnchorEl(null),
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
					<SelectTodoList />
				</MenuItem>
				<MenuItem disableRipple={true}>
					<ListItemIcon>
						<PlaylistAddIcon />
					</ListItemIcon>
					<AddTodoListForm />
				</MenuItem>
			</Menu>
		</>
	);
};

export default TodoListMenu;
