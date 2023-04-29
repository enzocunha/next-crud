function Button({ children, color }) {
	return (
		<button
			className={`flex gap-1 w-24 m-1 w-18 bg-${color}-500 hover:bg-${color}-600 text-white font-bold py-2 px-4 rounded inline-flex items-center`}>
			{children}
		</button>
	);
}

export default Button;
