import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

function Themebutton() {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	const currentTheme = theme === 'system' ? systemTheme : theme;

	return (
		<div className='fixed bottom-10 right-10'>
			{currentTheme === 'dark' ? (
				<SunIcon setTheme={setTheme} />
			) : (
				<MoonIcon setTheme={setTheme} />
			)}
		</div>
	);
}

export default Themebutton;
