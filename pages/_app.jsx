import '@/styles/globals.css';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeProvider from './components/ThemeProvider';
import Themebutton from './components/ThemeButton';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Next 13 CRUD Application</title>
				<meta
					name='description'
					content='Full stack CRUD application'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<ThemeProvider>
				<Component {...pageProps} />
				{/* ToastContainer is a component from react-toastify to show notifications on the screen */}
				<ToastContainer />
				<Themebutton />
			</ThemeProvider>
		</>
	);
}
