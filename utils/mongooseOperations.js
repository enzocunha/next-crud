import Author from '@/models/authorModel';
import Book from '@/models/bookModel';

export async function createAuthor({ name, nationality }) {
	let author = await Author.findOne({ name: name });

	// Check if author already exists
	if (author) {
		console.log(author._id);
		return author;
	}

	// Create new author
	author = new Author({ name: name, nationality: nationality });
	return author.save();
}

export async function createBook({ title, description, cover, author }) {
	let book = await Book.findOne({ title: title });

	// Check if book already exists
	if (book) {
		return book;
	}

	// Create new book
	const createdAuthor = await createAuthor(author);

	book = new Book({
		title: title,
		description: description,
		cover: cover,
		author: createdAuthor._id,
	});

	return book.save();
}

export async function getBooks() {
	const books = await Book.find().populate('author');
	return books;
}

export async function getBooksFilteredAndPaginated(query, limit = 5) {
	let filter = {};

	// Check if filter is present
	if (query.filter) {
		const regex = { $regex: query.filter, $options: 'i' };

		// Filter by title or author name
		filter = {
			$or: [
				{ title: regex },
				{
					author: {
						$in: await Author.find({ name: regex }).distinct('_id'),
					},
				},
			],
		};
	}

	const count = await Book.countDocuments(filter);

	const books = await Book.find(filter)
		.populate('author')
		.skip(query.page * limit)
		.limit(limit);

	return { books, count };
}

export async function getTotalBooks() {
	const total = await Book.countDocuments();
	return total;
}
