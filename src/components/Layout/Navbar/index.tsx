import * as React from 'react';
import { signIn, signOut } from 'next-auth/react';

import { useMe } from 'hooks/index';

import UserAvatar from '../../Avatar';
import TodoListMenu from './TodoListMenu';

import {
	AppBar,
	Box,
	IconButton,
	Slide,
	Stack,
	Toolbar,
	Tooltip,
	Typography,
	useScrollTrigger,
} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
	const me = useMe().data?.me;

	const triggerHideNavbar = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!triggerHideNavbar}>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						{me ? (
							<Tooltip title="Logout">
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="logout"
									sx={{ mr: 2 }}
									onClick={() => signOut({ redirect: false })}
								>
									<LogoutIcon />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title="Login">
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="login"
									sx={{ mr: 2 }}
									onClick={() => signIn('google')}
								>
									<LoginIcon />
								</IconButton>
							</Tooltip>
						)}
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Panter Todos
						</Typography>
						{me && (
							<Stack direction="row" spacing={2} alignItems="center">
								<TodoListMenu />
								<UserAvatar />
							</Stack>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</Slide>
	);
};
export default Navbar;
