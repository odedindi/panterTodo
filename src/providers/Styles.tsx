import * as React from 'react';

import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'src/styles/theme';
import CssBaseline from '@mui/material/CssBaseline';

import useDarkMode from 'use-dark-mode';

const StylesProvider: React.FC = ({ children }) => {
	const { value: isDarkMode } = useDarkMode(false);

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default StylesProvider;
