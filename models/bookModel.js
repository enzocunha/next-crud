import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema({
	id: String,
	name: { type: String, required: true, unique: true },
	authorId: { type: String, required: true },
});

const Book = models.Book || model('book', bookSchema);

export default Book;
