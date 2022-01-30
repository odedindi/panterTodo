import * as React from 'react';

import { AppBar, Link, Stack } from '@mui/material';

const Footer = () => (
	<AppBar
		color="secondary"
		sx={{ top: 'auto', bottom: 0, alignItems: 'center' }}
	>
		<Link
			href="https://odedo.dev"
			rel="noopener noreferrer"
			target="_blank"
			color="inherit"
			underline="none"
		>
			© ODEDINDI
		</Link>
	</AppBar>
);

export default Footer;
