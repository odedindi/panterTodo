import * as React from 'react';

import { useStore } from 'src/store';

import { Avatar, Tooltip } from '@mui/material';

import { stringAvatar } from './helpers';

const UserAvatar: React.FC = () => {
	const {
		storeState: { user },
	} = useStore();
	return !user ? null : !user.image ? (
		<Tooltip title={user.email ?? ''}>
			<Avatar {...stringAvatar(user.email ?? '')} />
		</Tooltip>
	) : (
		<Tooltip title={user.email ?? ''}>
			<Avatar
				alt={user.email ?? ''}
				src={user?.image}
				sx={{ width: 56, height: 56 }}
			/>
		</Tooltip>
	);
};

export default UserAvatar;
