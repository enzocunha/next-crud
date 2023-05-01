import Link from 'next/link';

function NavPages({ countBooks, currentPage }) {
	const numberPages = Math.ceil(countBooks / 5);
	const pages = Array.from({ length: numberPages }, (_, i) => i + 1);
	const lastPage = numberPages - 1;

	return (
		<nav
			className='flex items-center justify-between pt-4'
			aria-label='Table navigation'>
			<ul className='inline-flex items-center -space-x-px'>
				{/* First item */}
				<li>
					<Link
						href='/?page=0'
						className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
						<span className='sr-only'>Previous</span>
						<svg
							className='w-5 h-5'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
								clipRule='evenodd'></path>
						</svg>
					</Link>
				</li>

				{/* Middle items */}
				{pages.map((page) => (
					<li key={page}>
						<Link
							href={`/?page=${page - 1}`}
							className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
							{page - 1}
						</Link>
					</li>
				))}

				{/* Last item */}
				<li>
					<Link
						href={`/?page=${lastPage}`}
						className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
						<span className='sr-only'>Next</span>
						<svg
							className='w-5 h-5'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
								clipRule='evenodd'></path>
						</svg>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavPages;
