'use client';

import { useEffect, useState } from 'react';
import Button from './Button';

export default function BookList() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		fetch('/api/book')
			.then((response) => response.json())
			.then((data) => setBooks(data.data));
	}, []);

	if (books.length === 0) {
		return <div>Books loading or no books registered yet.</div>;
	}

	return (
		<table className='w-9/12 text-sm text-gray-500 dark:text-gray-400 text-center'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
				<tr>
					<th scope='col' className='px-6 py-3'>
						Cover
					</th>
					<th scope='col' className='px-6 py-3'>
						Title
					</th>
					<th scope='col' className='px-6 py-3'>
						Author
					</th>
					<th scope='col' className='px-6 py-3'>
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				{books.map((book) => (
					<tr
						key={book.id}
						class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className='h-28'
								src={book.cover}
								alt='Book cover'
							/>
						</td>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
							{book.title}
						</td>
						<td className='px-6 py-4'>{book.author.name}</td>
						<td className='px-6 py-4'>
							<Button type='edit' />
							<Button type='delete' />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
