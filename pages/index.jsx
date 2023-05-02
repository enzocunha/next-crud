'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Title from './components/Title';
import BookList from './components/BookList';
import NavPages from './components/NavPages';
import SearchBar from './components/SearchBar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [books, setBooks] = useState([]);
	const [countBooks, setCountBooks] = useState(0);
	const [filter, setFilter] = useState('');

	// Used by BookList and NavPages
	const router = useRouter();

	// Load the books from the database with pagination
	const searchParams = useSearchParams();
	const page = searchParams.get('page') || 0;

	useEffect(() => {
		fetch(`api/book/page/${page}${filter ? `?filter=${filter}` : ''}`)
			.then((response) => response.json())
			.then((data) => {
				setBooks(data.data);
				setCountBooks(data.count);
			});
	}, [page, filter]);

	return (
		<main className='flex flex-col items-center'>
			<Title title='List of books' />
			<SearchBar setFilter={setFilter} router={router} />
			<BookList books={books} setBooks={setBooks} router={router} />
			<NavPages
				countBooks={countBooks}
				currentPage={page}
				router={router}
			/>
			<Link
				href='/form'
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
