import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
			<main className='flex justify-center items-center h-screen'>
				<h1>Welcome to Next.js!</h1>
			</main>
		</>
	);
}
