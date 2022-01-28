import * as React from 'react';

import { IconButton, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert';

import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ToastProps {
	show: boolean;
	hide: () => void;
}

const ErrorToast: React.FC<ToastProps> = ({ show, hide }) => {
	const handleClose = React.useCallback(
		(_event?: React.SyntheticEvent | Event, reason?: string) => {
			if (reason === 'clickaway') return;
			hide();
		},
		[hide],
	);
	return (
		<Snackbar
			open={show}
			autoHideDuration={6000}
			onClose={handleClose}
			action={
				<IconButton
					size="small"
					aria-label="close"
					color="inherit"
					onClick={handleClose}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		>
			<Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
				Please first choose a todo list or create a new one
			</Alert>
		</Snackbar>
	);
};

export default ErrorToast;
