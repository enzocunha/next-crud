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

export async function getBooksPaginated(page, limit = 5) {
	const books = await Book.find()
		.populate('author')
		.skip(page * limit)
		.limit(limit);

	return books;
}

export async function getTotalBooks() {
	const total = await Book.countDocuments();
	return total;
}
