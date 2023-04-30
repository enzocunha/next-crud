'use client';

import { ThemeProvider } from 'next-themes';

function MyThemeProvider({ children }) {
	return (
		<ThemeProvider enableSystem={true} attribute='class'>
			{children}
		</ThemeProvider>
	);
}

export default MyThemeProvider;
