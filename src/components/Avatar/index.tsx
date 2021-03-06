import * as React from 'react';

import { useMe } from 'src/hooks';

import { Avatar, Tooltip } from '@mui/material';

import { stringAvatar } from './helpers';

const MyAvatar: React.FC = () => {
	const me = useMe().data?.me;

	return !me ? null : !me.image ? (
		<Tooltip title={me.email ?? ''}>
			<Avatar {...stringAvatar(me.email ?? '')} />
		</Tooltip>
	) : (
		<Tooltip title={me.email ?? ''}>
			<Avatar
				alt={me.email ?? ''}
				src={me.image}
				sx={{ width: 56, height: 56 }}
			/>
		</Tooltip>
	);
};

export default MyAvatar;
