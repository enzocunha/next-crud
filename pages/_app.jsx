import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>CRUD</title>
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

			<Component {...pageProps} />
		</>
	);
}
