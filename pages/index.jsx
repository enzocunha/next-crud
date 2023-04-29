import { Inter } from 'next/font/google';

import BookList from './components/BookList';
import Title from './components/Title';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className='flex flex-col items-center'>
			<Title title='List of books' />
			<BookList />
			<Link
				href='/book'
				className='flex m-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='w-6 h-6'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M12 6v6m0 0v6m0-6h6m-6 0H6'
					/>
				</svg>

				<span className='ml-2'>Add Book</span>
			</Link>
		</main>
	);
}
