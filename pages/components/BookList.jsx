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
						key={book._id}
						className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 dark:text-white flex justify-center'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className='h-28'
								// If the book has no cover, use a placeholder image
								src={
									book.cover ||
									'data:image/png;base64,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'
								}
								alt='Book cover'
							/>
						</td>
						<td
							scope='row'
							className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
							{book.title}
						</td>
						<td className='px-6 py-4'>{book.author.name}</td>
						<td className='px-6 py-4'>
							<button
								className={`flex gap-1 w-24 m-1 w-18 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded items-center`}>
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
										d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
									/>
								</svg>
								Edit
							</button>
							<button
								className={`flex gap-1 w-24 m-1 w-18 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded items-center`}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
									/>
								</svg>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
