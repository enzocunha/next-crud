function Title({ title }) {
	return (
		<div className='mx-auto py-12 max-w-2xl text-center'>
			<h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-400'>
				{title}
			</h2>
		</div>
	);
}

export default Title;
